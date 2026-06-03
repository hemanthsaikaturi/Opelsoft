# Design: Groq-first shared LLM + Playwright custom-page scraper

**Date:** 2026-06-04
**Status:** Approved
**Author:** Claude Code (pairing with Sai)

## Context

Opelsoft is a Next.js 16 / React 19 AI recruiting platform. The AI agent
([src/lib/agentRunner.js](../../../src/lib/agentRunner.js)) crawls candidate-supplied
career-page URLs, discovers jobs, scores them against the candidate profile with an
LLM, and stores matches.

Two problems motivate this work:

1. **Custom career pages are faked.** Greenhouse and Lever are scraped via their public
   JSON APIs (works well). Every *other* URL ("custom" ATS) falls into a branch that
   fabricates a single mock job, and the error path fabricates more. Results are
   therefore polluted with fake listings, and real custom pages are never actually read.
2. **LLM provider sprawl.** The Gemini→Claude→OpenAI fallback chain is copy-pasted in
   two places (resume parsing and match scoring), each ~50 lines. The user wants
   **Groq** as the primary provider everywhere feasible.

## Goals

- Make Groq the primary LLM for all three LLM touchpoints, via a single shared helper.
- Replace the mock "custom" scraper with real Playwright rendering + extraction.
- Stop fabricating jobs entirely; results become trustworthy.

## Non-goals

- No changes to the working Greenhouse/Lever JSON-API paths.
- No embeddings, no web-search/"salary intelligence" (Groq chat API can't do these;
  noted for the future roadmap only).
- No Vercel/serverless support — target is a **local / long-running Node** process
  (`next dev` / `next start`), where in-process headless Chromium works without extra
  infrastructure.

## Feasibility note on Groq

Groq is an OpenAI-compatible chat-completions provider (`https://api.groq.com/openai/v1`).
It serves text models (e.g. `llama-3.3-70b-versatile`) and supports JSON mode
(`response_format: { type: 'json_object' }`). All three call sites are text-in/JSON-out,
so Groq fits. **Not** available on Groq and therefore out of scope: native PDF/vision
document parsing (already removed — we extract text with `pdf-parse` first), embeddings,
and built-in web search.

## Architecture

### New module: `src/lib/llm.js`
Single shared LLM helper. No DB or browser dependencies.

```
callLLMForJson(prompt, { system?, maxTokens = 1024, temperature = 0.2 }) => Promise<object|null>
```

- Tries providers in order, each only if its env key is set:
  **Groq → Gemini → Claude → OpenAI**.
- Groq branch: `POST https://api.groq.com/openai/v1/chat/completions`,
  model `process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'`,
  `response_format: { type: 'json_object' }`.
- Tolerant JSON parsing: strip ``` fences, regex-extract the first `{…}` block, `JSON.parse`.
- Returns the parsed object, or `null` if every configured provider fails/produces no JSON.
- Each caller supplies its own non-LLM fallback when it receives `null`.
- All network calls use `AbortSignal.timeout(...)` (12s) as the existing code does.

### New module: `src/lib/scraper.js`
Owns Playwright. Browser concern fully isolated from orchestration.

```
scrapeCustomCareerPage(url, { preferredRoles = [], addLog }) => Promise<Job[]>
closeScraperBrowser() => Promise<void>
```

- `Job` shape matches what agentRunner stores:
  `{ company_name, job_title, url, ats_type: 'custom', job_type, location, description, raw_content }`.
- Lazily launches a **cached** headless Chromium (module-level singleton; reused across all
  sources in one pipeline run). Uses a lazy `require('playwright')` *inside* the function to
  avoid Turbopack ESM issues (mirrors the pdf-parse fix, commit `5be011b`).
- Per call: new browser context + page, `goto(url, { waitUntil: 'domcontentloaded', timeout: SCRAPER_TIMEOUT_MS })`,
  short settle wait, then build a condensed representation: list of `{ href, text }` anchors +
  visible body text, truncated to a token budget (~12k chars).
- **Primary extraction:** `callLLMForJson(extractionPrompt)` returns a structured list of jobs.
- **Fallback extraction** (LLM returns `null`, i.e. no key or no JSON): heuristic — anchors
  whose text/href look job-like (`job`, `career`, `position`, role keywords from `preferredRoles`).
- Resolve relative URLs against the page origin; dedup by URL; **cap at `SCRAPER_MAX_JOBS`
  (default 25) and `addLog` a line if truncated** (no silent caps).
- Returns `[]` on render failure, timeout, or zero results. **Never throws to the caller;
  never fabricates jobs.**
- `closeScraperBrowser()` closes the cached browser; safe to call when none is open.

### Changes to `src/lib/agentRunner.js`
- The `custom` branch (currently mock generation) calls `scrapeCustomCareerPage(...)`.
  - jobs found → set source status `active`, use them.
  - zero jobs → set source status `unreachable`, contribute nothing.
- The `catch` around a source no longer fabricates mock jobs — it logs, marks the source
  `unreachable`, and continues. (Greenhouse/Lever non-OK responses thus also stop faking.)
- Match scoring's inline 3-provider chain is replaced by `callLLMForJson(scoringPrompt)`;
  the deterministic heuristic scorer remains the `null` fallback (unchanged).
- After the sources loop, `closeScraperBrowser()` is called in a `finally` to release Chromium.

### Changes to `src/app/api/resume/upload/route.js`
- The inline Gemini/Claude/OpenAI blocks are replaced by `callLLMForJson(parsePrompt)`.
- The existing mock-profile fallback remains when the helper returns `null`.

### Changes to agent route handlers
- Add `export const runtime = 'nodejs'` (and keep dynamic) to
  [api/ai-agent/run/route.js](../../../src/app/api/ai-agent/run/route.js) and
  [api/ai-agent/cron/route.js](../../../src/app/api/ai-agent/cron/route.js) so the
  Playwright-bearing pipeline always runs in the Node runtime. (`nodejs` is the default,
  but we pin it explicitly since the pipeline now requires Node-only APIs.)

## Data flow (custom source, end to end)

```
agentRunner: for each source URL
  ├─ greenhouse/lever token?  → existing JSON API path (unchanged)
  └─ else (custom)            → scraper.scrapeCustomCareerPage(url)
        ├─ Chromium render → condensed page text
        ├─ callLLMForJson(extractionPrompt)  ──► jobs[]   (Groq → … fallback chain)
        │      └─ null → heuristic anchor parse → jobs[]
        ├─ resolve/dedup/cap → jobs[]
        └─ return jobs[] (or [] on failure; never mock)
  → dedup+store into new_ai_discovered_jobs
  → score each via callLLMForJson(scoringPrompt) (heuristic fallback)
  → store matches ≥ threshold; dispatch Slack/Discord/Telegram
finally: closeScraperBrowser()
```

## Config (env, all optional with defaults)

| Var | Default | Purpose |
|-----|---------|---------|
| `GROQ_API_KEY` | — | enables Groq (primary) |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Groq model id |
| `SCRAPER_TIMEOUT_MS` | `20000` | Playwright navigation timeout |
| `SCRAPER_MAX_JOBS` | `25` | per-source job cap (logged if hit) |

Existing `GEMINI_API_KEY` / `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` continue to work as
fallbacks.

## Dependencies

- Add `playwright` to `package.json`; provision the browser binary with
  `npx playwright install chromium`.

## Error handling

- Per-source failures are isolated; one dead source never aborts the run.
- The cached browser is always closed in a `finally`.
- `callLLMForJson` swallows per-provider errors and advances to the next provider; a total
  failure returns `null`, which every caller handles with a concrete fallback.

## Testing / verification

- No unit-test framework exists. Add `scripts/test_scraper.js` (same style as existing
  `scripts/test_*.js`) that takes a URL argument, runs `scrapeCustomCareerPage`, and prints
  the extracted jobs — real verification against a live career page.
- `next build` must pass; ESLint must stay clean on all new/changed files.
- Manually re-exercise resume parsing and match scoring after the refactor (same prompts,
  same fallbacks; only provider order changed).

## Risks

- **Refactoring working code** (resume + scoring): mitigated by preserving prompts and
  fallbacks, and re-verifying both paths.
- **Playwright resource use**: a single cached browser per run, always closed; bounded job
  cap keeps LLM/DB work in check.
- **Arbitrary custom pages**: LLM extraction is best-effort; heuristic fallback and the
  honest `[]` (no mock) ensure failures are visible rather than masked.

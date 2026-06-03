// End-to-end test of the AI agent pipeline over HTTP against a running dev server.
//
//   node scripts/test_agent_e2e.mjs [careerPageUrl]
//
// Registers a fresh candidate, adds a career source, runs the agent (real
// Playwright render + Groq extraction + Groq scoring), and prints discovered
// matches. Requires `npm run dev` to be running on :3000.

const BASE = 'http://localhost:3000';
const sourceUrl = process.argv[2] || 'https://jobs.ashbyhq.com/Ashby';

let cookie = '';

async function call(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const setCookie = res.headers.getSetCookie ? res.headers.getSetCookie() : [res.headers.get('set-cookie')];
  const sc = (setCookie || []).find((c) => c && c.startsWith('opelsoft_session='));
  if (sc) cookie = sc.split(';')[0];
  let data;
  try { data = await res.json(); } catch { data = null; }
  return { status: res.status, data };
}

async function run() {
  console.log('--- AI AGENT END-TO-END TEST ---');
  const uname = `agent_e2e_${Math.floor(Math.random() * 1000000)}`;

  console.log(`\n1. Registering candidate ${uname}...`);
  const reg = await call('POST', '/api/auth/register', {
    username: uname, email: `${uname}@opelsoft.com`, password: 'TestPassword123!', role: 'candidate',
  });
  if (!reg.data?.success) throw new Error(`register failed: ${reg.status} ${JSON.stringify(reg.data)}`);
  console.log('   ✓ registered and authenticated');

  console.log(`\n2. Adding career source: ${sourceUrl}`);
  const src = await call('POST', '/api/ai-agent/sources', { url: sourceUrl });
  if (!src.data?.success) throw new Error(`add source failed: ${src.status} ${JSON.stringify(src.data)}`);
  console.log(`   ✓ source added (type: ${src.data.source?.source_type})`);

  console.log('\n3. Running the AI agent pipeline (Playwright + Groq)... this can take a minute.');
  const runRes = await call('POST', '/api/ai-agent/run', {});
  if (!runRes.data?.success) throw new Error(`agent run failed: ${runRes.status} ${JSON.stringify(runRes.data)}`);
  const logs = runRes.data.logs || [];
  console.log(`   ✓ pipeline finished with ${logs.length} log lines. Tail:`);
  logs.slice(-12).forEach((l) => console.log(`     [${l.type}] ${l.message}`));
  console.log(`   → ${runRes.data.matches?.length || 0} matches above threshold`);

  console.log('\n4. Fetching stored matches (/api/ai-agent/matches)...');
  const matches = await call('GET', '/api/ai-agent/matches');
  const list = matches.data?.matches || [];
  console.log(`   ✓ ${list.length} matches stored`);
  list.slice(0, 8).forEach((m, i) =>
    console.log(`     ${i + 1}. ${m.match_score}% ${m.recommendation_level} — ${m.job_title} @ ${m.company_name} (${m.location})`)
  );

  console.log('\n✓ AGENT END-TO-END TEST COMPLETED.');
}

run().catch((err) => {
  console.error('\n✕ AGENT E2E FAILED:', err.message);
  process.exit(1);
});

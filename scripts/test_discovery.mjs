// Smoke test for auto-discovery: node scripts/test_discovery.mjs
// Loads .env.local, queries Groq compound (and SerpApi if SERPAPI_API_KEY set),
// prints discovered career-page URLs.

import fs from 'fs';

if (fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach((line) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return;
    const i = t.indexOf('=');
    if (i === -1) return;
    process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  });
}

const { discoverCareerPages } = await import('../src/lib/discovery.js');
const addLog = (m, t = 'info') => console.log(`[${t.toUpperCase()}] ${m}`);

console.log('--- DISCOVERY SMOKE TEST ---');
console.log(`Groq key: ${process.env.GROQ_API_KEY ? 'set' : 'MISSING'} | SerpApi key: ${process.env.SERPAPI_API_KEY ? 'set' : 'not set'}\n`);

const urls = await discoverCareerPages({
  preferredRoles: ['Frontend Engineer', 'React Developer'],
  targetLocations: ['Remote', 'London'],
  addLog,
});

console.log(`\n--- ${urls.length} career page(s) discovered ---`);
urls.forEach((u, i) => console.log(`${i + 1}. ${u.company || '(unknown)'} -> ${u.url}`));

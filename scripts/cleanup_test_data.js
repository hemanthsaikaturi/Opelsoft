// Removes test data created during QA/UI testing (test users + their jobs).
//   node scripts/cleanup_test_data.js
const fs = require('fs');
const mysql = require('mysql2/promise');

if (fs.existsSync('.env.local')) {
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    const t = line.trim(); if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('='); if (i === -1) continue;
    process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
}
const host = process.env.DB_HOST || 'localhost';

(async () => {
  const conn = await mysql.createConnection({
    host, port: parseInt(process.env.DB_PORT || '4000', 10), user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE,
    ssl: host !== 'localhost' ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
  });
  try {
    const userPatterns = ['qa\\_%', 'ui\\_%', 'agent_e2e_%', 'rdiag_%', 'diag%', 'testuser_%'];
    let users = 0;
    for (const pat of userPatterns) {
      const [r] = await conn.query('DELETE FROM new_users WHERE username LIKE ?', [pat]); // cascades to jobs/apps
      users += r.affectedRows;
    }
    const jobPatterns = ['UI Test Role%', 'QA Engineer%', 'Automated Test%'];
    let jobs = 0;
    for (const pat of jobPatterns) {
      const [r] = await conn.query('DELETE FROM new_jobs WHERE title LIKE ?', [pat]);
      jobs += r.affectedRows;
    }
    console.log(`Removed ${users} test users and ${jobs} test jobs.`);
  } finally {
    await conn.end();
  }
})().catch((e) => { console.error(e.message); process.exit(1); });

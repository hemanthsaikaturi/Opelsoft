// Creates the Opelsoft relational schema on the configured database (TiDB/MySQL).
// Idempotent: schema.sql uses CREATE TABLE IF NOT EXISTS, so re-running is safe.
//
//   node scripts/setup_tidb.js
//
// Reads DB_* from .env.local. Enables TLS automatically for non-localhost hosts
// (required by TiDB Serverless).

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Load .env.local
if (fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    process.env[key] = value;
  });
}

const host = process.env.DB_HOST || 'localhost';
const dbConfig = {
  host,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'opelsoft',
  ssl: host !== 'localhost' ? { minVersion: 'TLSv1.2', rejectUnauthorized: true } : undefined,
  multipleStatements: true,
};

async function run() {
  console.log(`Connecting to ${dbConfig.host}:${dbConfig.port} (db: ${dbConfig.database})...`);
  const conn = await mysql.createConnection(dbConfig);
  console.log('Connected.');

  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    console.log('Applying schema.sql (CREATE TABLE IF NOT EXISTS)...');
    await conn.query(schemaSql);

    // Idempotent migrations for databases created before these columns existed.
    // TiDB supports ADD COLUMN IF NOT EXISTS.
    const migrations = [
      "ALTER TABLE new_ai_agent_configs ADD COLUMN IF NOT EXISTS auto_discover TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE new_ai_matches ADD COLUMN IF NOT EXISTS evaluation JSON NULL",
    ];
    for (const sql of migrations) {
      try {
        await conn.query(sql);
      } catch (e) {
        console.warn(`  (migration skipped: ${e.message})`);
      }
    }

    const [tables] = await conn.query(
      "SELECT table_name AS t FROM information_schema.tables WHERE table_schema = ? AND table_name LIKE 'new_%' ORDER BY table_name",
      [dbConfig.database]
    );
    console.log(`\nSchema ready. ${tables.length} Opelsoft tables present:`);
    tables.forEach((row) => console.log(`  - ${row.t}`));
    console.log('\nDone.');
  } catch (err) {
    console.error('Schema setup failed:', err.message);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
}

run();

// Runs migrations/schema.sql against DATABASE_URL (from .env). Written to
// avoid needing psql installed locally — this project already depends on
// `pg` and `dotenv` for the server itself, so this just reuses those.
// Safe to re-run: schema.sql uses IF NOT EXISTS / DO $$ ... EXCEPTION guards
// throughout, so running it twice is a no-op the second time.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Check that .env exists in kss-backend/ and has a DATABASE_URL line.');
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, '..', 'migrations', 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Neon requires TLS; this matches how server.js/db.js connect elsewhere in this project
  });

  console.log(`Connecting to database...`);
  await client.connect();

  try {
    console.log(`Running migrations/schema.sql (${sql.length} bytes)...`);
    // The file is one multi-statement script (including DO $$ ... $$ blocks),
    // so it's sent as a single query rather than split on ';' — splitting
    // naively would break the DO blocks, which contain their own semicolons.
    await client.query(sql);
    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();

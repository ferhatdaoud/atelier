/**
 * Applies every SQL file in backend/migrations that hasn't been applied yet.
 * Creates the target database first if it doesn't exist.
 *
 *   npm run db:migrate
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { config } from '../config.js';

// Resolves to backend/migrations from both src/db (tsx) and dist/db (compiled).
const MIGRATIONS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../migrations');

async function ensureDatabaseExists() {
  const target = new URL(config.DATABASE_URL);
  const dbName = decodeURIComponent(target.pathname.replace(/^\//, ''));
  if (!dbName) throw new Error('DATABASE_URL must include a database name.');

  const maintenance = new URL(config.DATABASE_URL);
  maintenance.pathname = '/postgres';

  const client = new pg.Client({ connectionString: maintenance.toString() });
  try {
    await client.connect();
  } catch {
    // No access to the maintenance DB (common on hosted Postgres) — assume the
    // target database was provisioned already and let the main connection report errors.
    return;
  }
  try {
    const { rowCount } = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (!rowCount) {
      await client.query(`CREATE DATABASE ${client.escapeIdentifier(dbName)}`);
      console.log(`Created database "${dbName}".`);
    }
  } finally {
    await client.end();
  }
}

async function migrate() {
  await ensureDatabaseExists();

  const client = new pg.Client({ connectionString: config.DATABASE_URL });
  await client.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name       text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    const { rows } = await client.query<{ name: string }>('SELECT name FROM schema_migrations');
    const applied = new Set(rows.map((row) => row.name));

    const files = (await fs.readdir(MIGRATIONS_DIR)).filter((file) => file.endsWith('.sql')).sort();
    let count = 0;

    for (const file of files) {
      if (applied.has(file)) continue;
      const sql = await fs.readFile(path.join(MIGRATIONS_DIR, file), 'utf8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Migration ${file} failed: ${(err as Error).message}`);
      }
      console.log(`Applied ${file}`);
      count++;
    }

    console.log(count ? `Done — ${count} migration(s) applied.` : 'Database is already up to date.');
  } finally {
    await client.end();
  }
}

migrate().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

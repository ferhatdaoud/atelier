import { attachDatabasePool } from '@vercel/functions';
import pg from 'pg';
import { config } from '../config.js';

export const pool = new pg.Pool({
  connectionString: config.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 10_000,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

// On Vercel, closes idle connections before the function is suspended so they
// don't leak. Does nothing anywhere else.
attachDatabasePool(pool);

export function query<T extends pg.QueryResultRow = pg.QueryResultRow>(text: string, params?: unknown[]) {
  return pool.query<T>(text, params);
}

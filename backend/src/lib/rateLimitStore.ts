import type { IncrementResponse, Options, Store } from 'express-rate-limit';
import { query } from '../db/pool.js';

/**
 * express-rate-limit store backed by the rate_limits table, so every serverless
 * instance shares the same counters. Each hit is one atomic upsert.
 */
export class PostgresStore implements Store {
  readonly prefix: string;
  readonly localKeys = false;
  private windowMs = 60_000;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  init(options: Options) {
    this.windowMs = options.windowMs;
  }

  private key(key: string) {
    return `${this.prefix}:${key}`;
  }

  async increment(key: string): Promise<IncrementResponse> {
    // Occasionally sweep expired counters so the table stays small.
    if (Math.random() < 0.01) {
      await query('DELETE FROM rate_limits WHERE reset_at < now()');
    }

    const { rows } = await query<{ hits: number; resetAt: Date }>(
      `INSERT INTO rate_limits (key, hits, reset_at)
       VALUES ($1, 1, now() + $2::int * interval '1 millisecond')
       ON CONFLICT (key) DO UPDATE SET
         hits     = CASE WHEN rate_limits.reset_at <= now() THEN 1 ELSE rate_limits.hits + 1 END,
         reset_at = CASE WHEN rate_limits.reset_at <= now() THEN EXCLUDED.reset_at ELSE rate_limits.reset_at END
       RETURNING hits, reset_at AS "resetAt"`,
      [this.key(key), this.windowMs],
    );
    const row = rows[0]!;
    return { totalHits: row.hits, resetTime: row.resetAt };
  }

  async decrement(key: string) {
    await query('UPDATE rate_limits SET hits = greatest(hits - 1, 0) WHERE key = $1 AND reset_at > now()', [this.key(key)]);
  }

  async resetKey(key: string) {
    await query('DELETE FROM rate_limits WHERE key = $1', [this.key(key)]);
  }
}

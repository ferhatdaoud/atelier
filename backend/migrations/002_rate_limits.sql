-- Request counters for rate limiting. Kept in the database rather than in memory
-- so the limits hold across serverless instances (e.g. on Vercel).
CREATE TABLE rate_limits (
  key      text PRIMARY KEY,
  hits     integer NOT NULL,
  reset_at timestamptz NOT NULL
);
CREATE INDEX rate_limits_reset_at_idx ON rate_limits (reset_at);

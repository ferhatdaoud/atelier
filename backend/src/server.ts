// Standalone Node server (local dev, or hosting on a VPS/Render/Railway).
// On Vercel this file isn't used: api/index.ts serves the same app.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { app } from './app.js';
import { config } from './config.js';
import { pool } from './db/pool.js';
import { verifyMailer } from './lib/mailer.js';

// The Vite build output (../../dist from both src/ and dist/).
const FRONTEND_DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');

// In production, also serve the built React app from the same origin so the
// session cookie works without any CORS setup. Run `npm run build` at the repo root first.
if (config.isProduction && fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST, { index: false }));
  app.get('/{*path}', (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
  });
}

const server = app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT} (${config.NODE_ENV})`);
});

pool
  .query('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL.'))
  .catch((err: Error) => console.error(`Cannot connect to PostgreSQL: ${err.message}. Check DATABASE_URL in backend/.env.`));

void verifyMailer();

function shutdown() {
  server.close(() => {
    void pool.end().then(() => process.exit(0));
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

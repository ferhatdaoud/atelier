import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config.js';
import { query } from './db/pool.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requireAdmin } from './middleware/requireAdmin.js';
import { adminRouter } from './routes/admin.js';
import { authRouter } from './routes/auth.js';
import { publicRouter } from './routes/public.js';

// The Vite build output (../../dist from both src/ and dist/).
const FRONTEND_DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');

export const app = express();

app.set('trust proxy', config.TRUST_PROXY);

// CSP is left off because the site pulls fonts/images from several CDNs;
// the other helmet headers still apply.
app.use(helmet({ contentSecurityPolicy: false }));

if (config.corsOrigins.length) {
  app.use(cors({ origin: config.corsOrigins, credentials: true }));
}

app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

app.get('/api/health', async (_req, res) => {
  await query('SELECT 1');
  res.json({ ok: true });
});

app.use('/api', publicRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', requireAdmin, adminRouter);

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// In production, serve the built React app from the same origin so the
// session cookie works without any CORS setup. Run `npm run build` at the repo root first.
if (config.isProduction && fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST, { index: false }));
  app.get('/{*path}', (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
  });
}

app.use(errorHandler);

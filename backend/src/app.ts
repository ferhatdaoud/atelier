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

/** The API. Used by server.ts (standalone Node) and api/index.ts (Vercel). */
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

app.use(errorHandler);

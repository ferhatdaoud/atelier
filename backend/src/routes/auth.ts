import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { HttpError } from '../lib/httpError.js';
import { fakePasswordCheck, verifyPassword } from '../lib/password.js';
import { SESSION_COOKIE, createSession, deleteSession, sessionCookieOptions } from '../lib/session.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { loginLimiter } from '../middleware/rateLimits.js';

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string({ error: 'Email is required.' }).trim().min(1, 'Email is required.').max(254),
  password: z.string({ error: 'Password is required.' }).min(1, 'Password is required.').max(200),
});

authRouter.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const { rows } = await query<{ id: number; email: string; name: string; passwordHash: string }>(
    `SELECT id, email, name, password_hash AS "passwordHash" FROM admins WHERE lower(email) = lower($1)`,
    [email],
  );
  const admin = rows[0];
  const valid = admin ? await verifyPassword(password, admin.passwordHash) : await fakePasswordCheck(password);

  if (!admin || !valid) {
    throw new HttpError(401, 'Invalid email or password.');
  }

  const { token, expiresAt } = await createSession(admin.id);
  await query('UPDATE admins SET last_login_at = now() WHERE id = $1', [admin.id]);

  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(expiresAt));
  res.json({ admin: { id: admin.id, email: admin.email, name: admin.name } });
});

authRouter.post('/logout', async (req, res) => {
  const token: unknown = req.cookies?.[SESSION_COOKIE];
  if (typeof token === 'string' && token) {
    await deleteSession(token);
  }
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions());
  res.status(204).end();
});

authRouter.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

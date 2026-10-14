import { createHash, randomBytes } from 'node:crypto';
import type { CookieOptions } from 'express';
import { config } from '../config.js';
import { query } from '../db/pool.js';

export const SESSION_COOKIE = 'kzfr_admin_session';

export interface AdminUser {
  id: number;
  email: string;
  name: string;
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function sessionCookieOptions(expiresAt?: Date): CookieOptions {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: 'strict',
    path: '/api',
    ...(expiresAt ? { expires: expiresAt } : {}),
  };
}

export async function createSession(adminId: number) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + config.SESSION_TTL_HOURS * 60 * 60 * 1000);

  await query('DELETE FROM admin_sessions WHERE expires_at < now()');
  await query('INSERT INTO admin_sessions (token_hash, admin_id, expires_at) VALUES ($1, $2, $3)', [
    hashToken(token),
    adminId,
    expiresAt,
  ]);

  return { token, expiresAt };
}

export async function findAdminBySession(token: string): Promise<AdminUser | null> {
  const { rows } = await query<AdminUser>(
    `SELECT a.id, a.email, a.name
       FROM admin_sessions s
       JOIN admins a ON a.id = s.admin_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [hashToken(token)],
  );
  return rows[0] ?? null;
}

export async function deleteSession(token: string) {
  await query('DELETE FROM admin_sessions WHERE token_hash = $1', [hashToken(token)]);
}

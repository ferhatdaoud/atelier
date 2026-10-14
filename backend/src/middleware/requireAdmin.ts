import type { NextFunction, Request, Response } from 'express';
import { SESSION_COOKIE, findAdminBySession, type AdminUser } from '../lib/session.js';

declare global {
  namespace Express {
    interface Request {
      admin?: AdminUser;
    }
  }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token: unknown = req.cookies?.[SESSION_COOKIE];
  const admin = typeof token === 'string' && token ? await findAdminBySession(token) : null;

  if (!admin) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  req.admin = admin;
  next();
}

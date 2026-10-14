import { rateLimit } from 'express-rate-limit';

const common = {
  standardHeaders: 'draft-8' as const,
  legacyHeaders: false,
};

/** Brute-force protection for the admin login. Successful logins don't count. */
export const loginLimiter = rateLimit({
  ...common,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
});

/** Public forms trigger outgoing emails, so keep them from being used to spam. */
export const publicFormLimiter = rateLimit({
  ...common,
  windowMs: 60 * 60 * 1000,
  limit: 10,
  message: { error: 'Too many submissions. Please try again later.' },
});

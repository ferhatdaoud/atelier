import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const optionalString = z
  .string()
  .optional()
  .transform((value) => (value && value.trim() !== '' ? value.trim() : undefined));

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required (e.g. postgres://user:pass@localhost:5432/kzfr)'),

  // Comma-separated list of allowed browser origins. Leave empty when the API is
  // served from the same origin as the frontend (Vite proxy in dev, Vercel or Express in prod).
  CORS_ORIGIN: optionalString,
  // Number of reverse proxies in front of the app, so rate limiting sees the real
  // client IP. Vercel's edge network is one proxy, so it defaults to 1 there.
  TRUST_PROXY: z.coerce.number().int().min(0).default(process.env.VERCEL ? 1 : 0),

  SESSION_TTL_HOURS: z.coerce.number().positive().default(24 * 7),

  // From resend.com/api-keys. Without it, emails are printed to the console instead of sent.
  RESEND_API_KEY: optionalString,
  // Must use a domain verified in Resend. onboarding@resend.dev works for testing,
  // but then Resend only delivers to the email address of your own Resend account.
  MAIL_FROM: z
    .string()
    .trim()
    .default('KZFR Studio <onboarding@resend.dev>')
    .refine((value) => /^[^<>]*<[^\s@<>]+@[^\s@<>]+>$|^[^\s@<>]+@[^\s@<>]+$/.test(value), {
      message: 'must look like "Name <you@yourdomain.com>" or "you@yourdomain.com"',
    }),
  // Inbox that receives "new contact message / new order" notifications.
  ADMIN_NOTIFY_EMAIL: optionalString,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // Thrown rather than process.exit() so the reason shows up in serverless logs too.
  const details = parsed.error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
  throw new Error(
    `Invalid environment configuration:\n${details}\n` +
      'Locally: copy backend/.env.example to backend/.env. On Vercel: set them in Project Settings → Environment Variables.',
  );
}

export const config = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  corsOrigins: parsed.data.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? [],
};

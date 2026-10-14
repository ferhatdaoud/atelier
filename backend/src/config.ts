import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const booleanFromEnv = z
  .enum(['true', 'false', '1', '0', ''])
  .optional()
  .transform((value) => value === 'true' || value === '1');

const optionalString = z
  .string()
  .optional()
  .transform((value) => (value && value.trim() !== '' ? value.trim() : undefined));

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required (e.g. postgres://user:pass@localhost:5432/kzfr)'),

  // Comma-separated list of allowed browser origins. Leave empty when the API is
  // served from the same origin as the frontend (Vite proxy in dev, or Express in prod).
  CORS_ORIGIN: optionalString,
  // Set to the number of reverse proxies in front of the app (e.g. 1 behind Nginx/Render)
  // so rate limiting sees the real client IP.
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),

  SESSION_TTL_HOURS: z.coerce.number().positive().default(24 * 7),

  SMTP_HOST: optionalString,
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: booleanFromEnv,
  SMTP_USER: optionalString,
  SMTP_PASS: optionalString,
  MAIL_FROM: z.string().default('KZFR Studio <hello@kzfr.studio>'),
  // Inbox that receives "new contact message / new order" notifications.
  ADMIN_NOTIFY_EMAIL: optionalString,
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('Copy backend/.env.example to backend/.env and fill in the values.');
  process.exit(1);
}

export const config = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  corsOrigins: parsed.data.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? [],
  smtpEnabled: Boolean(parsed.data.SMTP_HOST),
};

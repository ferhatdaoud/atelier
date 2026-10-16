import { randomUUID } from 'node:crypto';
import { setTimeout as sleep } from 'node:timers/promises';
import { waitUntil } from '@vercel/functions';
import { Resend, type CreateEmailOptions } from 'resend';
import { config } from '../config.js';
import { query } from '../db/pool.js';

export type EmailKind = 'contact_ack' | 'contact_notify' | 'order_confirmation' | 'order_notify' | 'admin_reply';
export type EmailStatus = 'sent' | 'failed' | 'logged';

export interface EmailContent {
  subject: string;
  text: string;
  html: string;
}

export interface SendEmailInput extends EmailContent {
  kind: EmailKind;
  to: string;
  toName?: string;
  replyTo?: string;
  contactMessageId?: number;
  orderId?: number;
  sentByAdminId?: number;
}

export interface EmailLog {
  id: number;
  kind: EmailKind;
  toEmail: string;
  subject: string;
  body: string;
  status: EmailStatus;
  error: string | null;
  resendId: string | null;
  contactMessageId: number | null;
  orderId: number | null;
  createdAt: Date;
}

export const EMAIL_LOG_COLUMNS = `
  id, kind, to_email AS "toEmail", subject, body, status, error, resend_id AS "resendId",
  contact_message_id AS "contactMessageId", order_id AS "orderId", created_at AS "createdAt"`;

const resend = config.RESEND_API_KEY ? new Resend(config.RESEND_API_KEY) : null;

const SEND_TIMEOUT_MS = 15_000;

type SendResponse = Awaited<ReturnType<Resend['emails']['send']>>;

/** "Name <email>", with the name quoted so commas or brackets in it can't break the address. */
function formatAddress(email: string, name?: string) {
  if (!name) return email;
  return `"${name.replace(/[\r\n]+/g, ' ').replace(/["\\]/g, '\\$&')}" <${email}>`;
}

/** The SDK has no request timeout, so race it against one. */
async function sendWithTimeout(client: Resend, payload: CreateEmailOptions, idempotencyKey: string): Promise<SendResponse> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<SendResponse>((resolve) => {
    timer = setTimeout(
      () =>
        resolve({
          data: null,
          error: { name: 'application_error', statusCode: null, message: `No response from Resend after ${SEND_TIMEOUT_MS / 1000}s.` },
          headers: null,
        }),
      SEND_TIMEOUT_MS,
    );
  });
  try {
    return await Promise.race([client.emails.send(payload, { idempotencyKey }), timeout]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Sends through Resend, retrying once on rate limits, server/network errors and
 * timeouts. The retry reuses the idempotency key, so Resend never sends twice.
 */
async function deliver(client: Resend, input: SendEmailInput): Promise<{ resendId: string | null; error: string | null }> {
  const payload: CreateEmailOptions = {
    from: config.MAIL_FROM,
    to: formatAddress(input.to, input.toName),
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
    tags: [{ name: 'kind', value: input.kind }],
  };
  const idempotencyKey = `${input.kind}-${randomUUID()}`;

  for (let attempt = 1; ; attempt++) {
    const res = await sendWithTimeout(client, payload, idempotencyKey);
    if (res.error === null) return { resendId: res.data.id, error: null };

    const { error } = res;
    const retryable = error.name === 'rate_limit_exceeded' || error.statusCode === null || error.statusCode >= 500;
    if (!retryable || attempt === 2) return { resendId: null, error: error.message };

    const retryAfterSeconds = Number(res.headers?.['retry-after']);
    await sleep(retryAfterSeconds > 0 ? Math.min(retryAfterSeconds * 1000, 5000) : 1000);
  }
}

/** Startup check (standalone server only): is the API key valid and the MAIL_FROM domain verified? */
export async function verifyMailer() {
  if (!resend) {
    console.warn('RESEND_API_KEY is not set: emails will be printed to the console instead of being sent.');
    return;
  }

  const fromDomain = config.MAIL_FROM.match(/@([^\s@>]+)>?$/)?.[1]?.toLowerCase();
  if (fromDomain === 'resend.dev') {
    console.warn(
      'MAIL_FROM uses resend.dev: Resend only delivers to your own account email until you verify a domain at resend.com/domains.',
    );
  }

  // A plain request rather than the SDK: in development the SDK prints every API error,
  // including the expected "restricted key" answer below, which looks like a failure.
  const baseUrl = process.env.RESEND_BASE_URL ?? 'https://api.resend.com';
  const res = await fetch(`${baseUrl}/domains`, {
    headers: { Authorization: `Bearer ${config.RESEND_API_KEY}` },
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!res) {
    console.error('Resend API key check failed: could not reach api.resend.com.');
    return;
  }
  const body = (await res.json().catch(() => ({}))) as {
    name?: string;
    message?: string;
    data?: { name: string; status: string }[];
  };
  if (!res.ok) {
    // A "sending access" key can't list domains, which still proves the key works.
    if (body.name === 'restricted_api_key') console.log('Resend ready (sending-only API key).');
    else console.error(`Resend API key check failed: ${body.message ?? `HTTP ${res.status}`}`);
    return;
  }
  if (fromDomain === 'resend.dev') return;

  const domain = body.data?.find((d) => d.name.toLowerCase() === fromDomain);
  if (domain?.status === 'verified') {
    console.log(`Resend ready (sending from ${fromDomain}).`);
  } else {
    console.warn(
      `Resend: the MAIL_FROM domain "${fromDomain}" is ${domain ? domain.status : 'not added'} in Resend. ` +
        'Emails will fail until it is verified at resend.com/domains.',
    );
  }
}

/**
 * Sends an email (or prints it when RESEND_API_KEY isn't set) and records the
 * attempt in email_logs. Never throws for delivery errors: check `status`.
 */
export async function sendEmail(input: SendEmailInput): Promise<EmailLog> {
  let status: EmailStatus;
  let error: string | null = null;
  let resendId: string | null = null;

  if (!resend) {
    status = 'logged';
    console.log(
      `\n--- Email (not sent: RESEND_API_KEY is not set) ---\nTo: ${input.to}\nSubject: ${input.subject}\n\n${input.text}\n--------------------------------------\n`,
    );
  } else {
    ({ resendId, error } = await deliver(resend, input));
    status = error ? 'failed' : 'sent';
    if (error) console.error(`Failed to send "${input.kind}" email to ${input.to}: ${error}`);
  }

  const { rows } = await query<EmailLog>(
    `INSERT INTO email_logs (kind, to_email, subject, body, status, error, resend_id, contact_message_id, order_id, sent_by_admin_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING ${EMAIL_LOG_COLUMNS}`,
    [
      input.kind,
      input.to,
      input.subject,
      input.text,
      status,
      error,
      resendId,
      input.contactMessageId ?? null,
      input.orderId ?? null,
      input.sentByAdminId ?? null,
    ],
  );
  return rows[0]!;
}

/**
 * Sends after the HTTP response, so the visitor doesn't wait on Resend. On Vercel,
 * waitUntil keeps the function alive until the email is sent; elsewhere it's a no-op.
 */
export function sendEmailInBackground(input: SendEmailInput) {
  waitUntil(sendEmail(input).catch((err) => console.error(`Could not record "${input.kind}" email:`, err)));
}

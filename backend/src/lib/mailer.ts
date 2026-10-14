import nodemailer from 'nodemailer';
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
  contactMessageId: number | null;
  orderId: number | null;
  createdAt: Date;
}

export const EMAIL_LOG_COLUMNS = `
  id, kind, to_email AS "toEmail", subject, body, status, error,
  contact_message_id AS "contactMessageId", order_id AS "orderId", created_at AS "createdAt"`;

const transporter = config.smtpEnabled
  ? nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      auth: config.SMTP_USER ? { user: config.SMTP_USER, pass: config.SMTP_PASS } : undefined,
    })
  : null;

/** Network failures can surface as an AggregateError with an empty message (IPv4 + IPv6 attempts). */
function describeError(err: unknown): string {
  if (!(err instanceof Error)) return String(err);
  if (err.message) return err.message;
  const nested = err instanceof AggregateError ? err.errors.find((e) => e instanceof Error && e.message) : undefined;
  if (nested) return (nested as Error).message;
  const code = (err as NodeJS.ErrnoException).code;
  return code ? `${code} (${config.SMTP_HOST}:${config.SMTP_PORT})` : err.name;
}

export async function verifyMailer() {
  if (!transporter) {
    console.warn('SMTP is not configured — emails will be printed to the console instead of being sent.');
    return;
  }
  try {
    await transporter.verify();
    console.log(`SMTP ready (${config.SMTP_HOST}:${config.SMTP_PORT}).`);
  } catch (err) {
    console.error(`SMTP connection failed: ${describeError(err)}`);
  }
}

/**
 * Sends an email (or prints it when SMTP isn't configured) and records the
 * attempt in email_logs. Never throws for delivery errors — check `status`.
 */
export async function sendEmail(input: SendEmailInput): Promise<EmailLog> {
  let status: EmailStatus;
  let error: string | null = null;

  if (!transporter) {
    status = 'logged';
    console.log(
      `\n--- Email (not sent, SMTP disabled) ---\nTo: ${input.to}\nSubject: ${input.subject}\n\n${input.text}\n--------------------------------------\n`,
    );
  } else {
    try {
      await transporter.sendMail({
        from: config.MAIL_FROM,
        to: input.toName ? { name: input.toName, address: input.to } : input.to,
        replyTo: input.replyTo,
        subject: input.subject,
        text: input.text,
        html: input.html,
      });
      status = 'sent';
    } catch (err) {
      status = 'failed';
      error = describeError(err);
      console.error(`Failed to send "${input.kind}" email to ${input.to}: ${error}`);
    }
  }

  const { rows } = await query<EmailLog>(
    `INSERT INTO email_logs (kind, to_email, subject, body, status, error, contact_message_id, order_id, sent_by_admin_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING ${EMAIL_LOG_COLUMNS}`,
    [
      input.kind,
      input.to,
      input.subject,
      input.text,
      status,
      error,
      input.contactMessageId ?? null,
      input.orderId ?? null,
      input.sentByAdminId ?? null,
    ],
  );
  return rows[0]!;
}

/** Fire-and-forget variant for emails that must not delay or fail an HTTP response. */
export function sendEmailInBackground(input: SendEmailInput) {
  sendEmail(input).catch((err) => console.error(`Could not record "${input.kind}" email:`, err));
}

// Every route in this file is mounted behind requireAdmin (see app.ts).
import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { MESSAGE_STATUSES, ORDER_STATUSES } from '../lib/catalog.js';
import { adminReply } from '../lib/emailTemplates.js';
import { HttpError } from '../lib/httpError.js';
import { EMAIL_LOG_COLUMNS, sendEmail } from '../lib/mailer.js';
import { emailField, idParam, likePattern, pagination, requiredText } from '../lib/validation.js';

export const adminRouter = Router();

/** Runs a filtered, paginated SELECT plus a matching COUNT. `table` and `columns` are trusted constants. */
async function paginate(
  table: string,
  columns: string,
  conditions: string[],
  params: unknown[],
  limit: number,
  offset: number,
) {
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [items, count] = await Promise.all([
    query(`SELECT ${columns} FROM ${table} ${where} ORDER BY created_at DESC, id DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`, [
      ...params,
      limit,
      offset,
    ]),
    query<{ total: number }>(`SELECT count(*)::int AS total FROM ${table} ${where}`, params),
  ]);
  return { items: items.rows, total: count.rows[0]?.total ?? 0 };
}

// ---------------------------------------------------------------------------
// Dashboard stats
// ---------------------------------------------------------------------------

adminRouter.get('/stats', async (_req, res) => {
  const { rows } = await query(`
    SELECT
      (SELECT count(*) FROM contact_messages)::int                          AS "totalMessages",
      (SELECT count(*) FROM contact_messages WHERE status = 'new')::int     AS "newMessages",
      (SELECT count(*) FROM orders)::int                                    AS "totalOrders",
      (SELECT count(*) FROM orders WHERE status = 'in_review')::int         AS "ordersInReview",
      (SELECT coalesce(sum(estimated_price), 0) FROM orders
        WHERE status <> 'cancelled')::bigint                                AS "pipelineValue",
      (SELECT count(*) FROM email_logs WHERE status = 'failed'
        AND created_at > now() - interval '7 days')::int                    AS "failedEmails"
  `);
  const stats = rows[0]!;
  // pg returns bigint as a string.
  res.json({ ...stats, pipelineValue: Number(stats.pipelineValue) });
});

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------

const MESSAGE_COLUMNS = `id, name, email, message, status, created_at AS "createdAt", updated_at AS "updatedAt"`;

const messageListQuery = z.object({
  status: z.enum(MESSAGE_STATUSES).optional(),
  search: z.string().trim().max(200).optional(),
  ...pagination,
});

adminRouter.get('/messages', async (req, res) => {
  const { status, search, limit, offset } = messageListQuery.parse(req.query);
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }
  if (search) {
    params.push(likePattern(search));
    conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length} OR message ILIKE $${params.length})`);
  }

  res.json(await paginate('contact_messages', MESSAGE_COLUMNS, conditions, params, limit, offset));
});

adminRouter.patch('/messages/:id', async (req, res) => {
  const id = idParam.parse(req.params.id);
  const { status } = z.object({ status: z.enum(MESSAGE_STATUSES) }).parse(req.body);

  const { rows } = await query(
    `UPDATE contact_messages SET status = $1, updated_at = now() WHERE id = $2 RETURNING ${MESSAGE_COLUMNS}`,
    [status, id],
  );
  if (!rows[0]) throw new HttpError(404, 'Message not found.');
  res.json(rows[0]);
});

adminRouter.delete('/messages/:id', async (req, res) => {
  const id = idParam.parse(req.params.id);
  const { rowCount } = await query('DELETE FROM contact_messages WHERE id = $1', [id]);
  if (!rowCount) throw new HttpError(404, 'Message not found.');
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

const ORDER_COLUMNS = `
  id, reference, package_type AS "packageType", template_id AS "templateId", template_title AS "templateTitle",
  client_name AS "clientName", client_email AS "clientEmail", company_name AS "companyName", industry,
  has_branding AS "hasBranding", timeline, notes, estimated_price AS "estimatedPrice", status,
  created_at AS "createdAt", updated_at AS "updatedAt"`;

const orderListQuery = z.object({
  status: z.enum(ORDER_STATUSES).optional(),
  search: z.string().trim().max(200).optional(),
  ...pagination,
});

adminRouter.get('/orders', async (req, res) => {
  const { status, search, limit, offset } = orderListQuery.parse(req.query);
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }
  if (search) {
    params.push(likePattern(search));
    const p = `$${params.length}`;
    conditions.push(`(reference ILIKE ${p} OR client_name ILIKE ${p} OR client_email ILIKE ${p} OR company_name ILIKE ${p})`);
  }

  res.json(await paginate('orders', ORDER_COLUMNS, conditions, params, limit, offset));
});

adminRouter.patch('/orders/:id', async (req, res) => {
  const id = idParam.parse(req.params.id);
  const { status } = z.object({ status: z.enum(ORDER_STATUSES) }).parse(req.body);

  const { rows } = await query(
    `UPDATE orders SET status = $1, updated_at = now() WHERE id = $2 RETURNING ${ORDER_COLUMNS}`,
    [status, id],
  );
  if (!rows[0]) throw new HttpError(404, 'Order not found.');
  res.json(rows[0]);
});

adminRouter.delete('/orders/:id', async (req, res) => {
  const id = idParam.parse(req.params.id);
  const { rowCount } = await query('DELETE FROM orders WHERE id = $1', [id]);
  if (!rowCount) throw new HttpError(404, 'Order not found.');
  res.status(204).end();
});

// ---------------------------------------------------------------------------
// Emails
// ---------------------------------------------------------------------------

const emailListQuery = z.object({
  contactMessageId: idParam.optional(),
  orderId: idParam.optional(),
  ...pagination,
});

adminRouter.get('/emails', async (req, res) => {
  const { contactMessageId, orderId, limit, offset } = emailListQuery.parse(req.query);
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (contactMessageId) {
    params.push(contactMessageId);
    conditions.push(`contact_message_id = $${params.length}`);
  }
  if (orderId) {
    params.push(orderId);
    conditions.push(`order_id = $${params.length}`);
  }

  res.json(await paginate('email_logs', EMAIL_LOG_COLUMNS, conditions, params, limit, offset));
});

const sendEmailSchema = z.object({
  to: emailField,
  subject: requiredText('Subject', 200).regex(/^[^\r\n]*$/, 'Subject must be a single line.'),
  body: requiredText('Message', 20000),
  contactMessageId: z.number().int().positive().optional(),
  orderId: z.number().int().positive().optional(),
});

/** Send an email to a client from the dashboard (e.g. a reply to a contact message). */
adminRouter.post('/emails', async (req, res) => {
  const input = sendEmailSchema.parse(req.body);

  if (input.contactMessageId) {
    const { rowCount } = await query('SELECT 1 FROM contact_messages WHERE id = $1', [input.contactMessageId]);
    if (!rowCount) throw new HttpError(404, 'Message not found.');
  }
  if (input.orderId) {
    const { rowCount } = await query('SELECT 1 FROM orders WHERE id = $1', [input.orderId]);
    if (!rowCount) throw new HttpError(404, 'Order not found.');
  }

  const email = await sendEmail({
    kind: 'admin_reply',
    to: input.to,
    contactMessageId: input.contactMessageId,
    orderId: input.orderId,
    sentByAdminId: req.admin!.id,
    ...adminReply(input.subject, input.body),
  });

  if (email.status === 'failed') {
    throw new HttpError(502, `The email could not be sent: ${email.error}`);
  }

  if (input.contactMessageId) {
    await query(`UPDATE contact_messages SET status = 'replied', updated_at = now() WHERE id = $1`, [input.contactMessageId]);
  }

  res.status(201).json(email);
});

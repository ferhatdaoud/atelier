import { randomInt } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { config } from '../config.js';
import { query } from '../db/pool.js';
import { PACKAGES, PACKAGE_TYPES } from '../lib/catalog.js';
import * as templates from '../lib/emailTemplates.js';
import { sendEmailInBackground } from '../lib/mailer.js';
import { emailField, optionalText, requiredText } from '../lib/validation.js';
import { publicFormLimiter } from '../middleware/rateLimits.js';

export const publicRouter = Router();

// Hidden "website" input in the forms. Humans never fill it in; most bots do.
const honeypot = z.string().optional();

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: requiredText('Name', 100),
  email: emailField,
  message: requiredText('Message', 5000),
  website: honeypot,
});

publicRouter.post('/contact', publicFormLimiter, async (req, res) => {
  const input = contactSchema.parse(req.body);

  if (input.website) {
    res.status(201).json({ ok: true });
    return;
  }

  const { rows } = await query<{ id: number }>(
    `INSERT INTO contact_messages (name, email, message, ip_address) VALUES ($1, $2, $3, $4) RETURNING id`,
    [input.name, input.email, input.message, req.ip ?? null],
  );
  const message = { id: rows[0]!.id, name: input.name, email: input.email, message: input.message };

  sendEmailInBackground({
    kind: 'contact_ack',
    to: message.email,
    toName: message.name,
    contactMessageId: message.id,
    ...templates.contactAcknowledgement(message),
  });
  if (config.ADMIN_NOTIFY_EMAIL) {
    sendEmailInBackground({
      kind: 'contact_notify',
      to: config.ADMIN_NOTIFY_EMAIL,
      replyTo: message.email,
      contactMessageId: message.id,
      ...templates.contactNotification(message),
    });
  }

  res.status(201).json({ ok: true });
});

// ---------------------------------------------------------------------------
// POST /api/orders
// ---------------------------------------------------------------------------

const orderSchema = z.object({
  packageType: z.enum(PACKAGE_TYPES, { error: 'Please choose a package.' }),
  templateId: z.string().trim().max(100).optional(),
  templateTitle: z.string().trim().max(200).optional(),
  clientName: requiredText('Full name', 100),
  clientEmail: emailField,
  companyName: requiredText('Company name', 150),
  industry: optionalText('Industry', 150),
  hasBranding: z.enum(['ready', 'need-logo', 'complete-rebrand'], { error: 'Please choose a branding option.' }),
  timeline: optionalText('Timeline', 100),
  notes: optionalText('Notes', 5000),
  website: honeypot,
});

// Unambiguous characters only (no 0/O, 1/I).
const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateReference() {
  let suffix = '';
  for (let i = 0; i < 6; i++) suffix += REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)];
  return `KZ-${suffix}`;
}

publicRouter.post('/orders', publicFormLimiter, async (req, res) => {
  const input = orderSchema.parse(req.body);
  const estimatedPrice = PACKAGES[input.packageType].price;

  if (input.website) {
    res.status(201).json({ reference: generateReference(), estimatedPrice, status: 'in_review' });
    return;
  }

  const { rows } = await query<{ id: number; reference: string; createdAt: Date }>(
    `INSERT INTO orders (reference, package_type, template_id, template_title, client_name, client_email,
                         company_name, industry, has_branding, timeline, notes, estimated_price, ip_address)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
     RETURNING id, reference, created_at AS "createdAt"`,
    [
      generateReference(),
      input.packageType,
      input.templateId ?? null,
      input.templateTitle ?? null,
      input.clientName,
      input.clientEmail,
      input.companyName,
      input.industry,
      input.hasBranding,
      input.timeline,
      input.notes,
      estimatedPrice,
      req.ip ?? null,
    ],
  );
  const saved = rows[0]!;
  const order = { ...input, templateTitle: input.templateTitle ?? null, reference: saved.reference, estimatedPrice };

  sendEmailInBackground({
    kind: 'order_confirmation',
    to: order.clientEmail,
    toName: order.clientName,
    orderId: saved.id,
    ...templates.orderConfirmation(order),
  });
  if (config.ADMIN_NOTIFY_EMAIL) {
    sendEmailInBackground({
      kind: 'order_notify',
      to: config.ADMIN_NOTIFY_EMAIL,
      replyTo: order.clientEmail,
      orderId: saved.id,
      ...templates.orderNotification(order),
    });
  }

  res.status(201).json({
    reference: saved.reference,
    estimatedPrice,
    status: 'in_review',
    createdAt: saved.createdAt,
  });
});

import { PACKAGES, formatPrice, type PackageType } from './catalog.js';
import type { EmailContent } from './mailer.js';

const BRAND = 'KZFR Studio';
const ACCENT = '#ff6b2c';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escapes user text and keeps its line breaks. */
function paragraph(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}

function layout(title: string, bodyHtml: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f4f5;font-family:Inter,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#080808;padding:20px 28px;color:#ffffff;font-weight:700;font-size:16px;">
        ${BRAND}<span style="color:${ACCENT};">.</span>
      </td></tr>
      <tr><td style="padding:28px;font-size:14px;line-height:1.6;">
        <h1 style="margin:0 0 16px;font-size:20px;">${escapeHtml(title)}</h1>
        ${bodyHtml}
      </td></tr>
      <tr><td style="padding:16px 28px;background:#fafafa;color:#71717a;font-size:12px;">
        ${BRAND} · Websites for people, MVPs for startups
      </td></tr>
    </table>
  </body>
</html>`;
}

function detailsTable(rows: [string, string][]) {
  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#71717a;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>` +
        `<td style="padding:6px 0;">${paragraph(value)}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e4e4e7;margin-top:12px;">${cells}</table>`;
}

function detailsText(rows: [string, string][]) {
  return rows.map(([label, value]) => `${label}: ${value}`).join('\n');
}

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
}

/** Sent to the visitor. Deliberately does not echo their message back (anti-spam-relay). */
export function contactAcknowledgement(msg: ContactMessage): EmailContent {
  const subject = `We received your message — ${BRAND}`;
  const text = `Hi ${msg.name},\n\nThanks for reaching out to ${BRAND}. We've received your message and will get back to you within one business day.\n\n— The ${BRAND} team`;
  const html = layout(
    'Thanks for reaching out!',
    `<p>Hi ${escapeHtml(msg.name)},</p>
     <p>We've received your message and will get back to you within one business day.</p>
     <p>— The ${BRAND} team</p>`,
  );
  return { subject, text, html };
}

/** Sent to the studio inbox. */
export function contactNotification(msg: ContactMessage): EmailContent {
  const rows: [string, string][] = [
    ['From', `${msg.name} <${msg.email}>`],
    ['Message', msg.message],
  ];
  return {
    subject: `New contact message from ${msg.name}`,
    text: `New contact message #${msg.id}\n\n${detailsText(rows)}`,
    html: layout(`New contact message #${msg.id}`, detailsTable(rows)),
  };
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

interface Order {
  reference: string;
  packageType: PackageType;
  templateTitle: string | null;
  clientName: string;
  clientEmail: string;
  companyName: string;
  industry: string;
  hasBranding: string;
  timeline: string;
  notes: string;
  estimatedPrice: number;
}

function orderRows(order: Order): [string, string][] {
  const rows: [string, string][] = [
    ['Reference', order.reference],
    ['Package', PACKAGES[order.packageType].label],
  ];
  if (order.templateTitle) rows.push(['Template', order.templateTitle]);
  rows.push(['Company', order.companyName], ['Timeline', order.timeline], ['Estimate', formatPrice(order.estimatedPrice)]);
  return rows;
}

export function orderConfirmation(order: Order): EmailContent {
  const rows = orderRows(order);
  return {
    subject: `Order ${order.reference} received — ${BRAND}`,
    text:
      `Hi ${order.clientName},\n\nThank you for your project brief. Our team will review your specifications ` +
      `and email you the kickoff invite and contract within 4 business hours.\n\n${detailsText(rows)}\n\n— The ${BRAND} team`,
    html: layout(
      `Order ${order.reference} received`,
      `<p>Hi ${escapeHtml(order.clientName)},</p>
       <p>Thank you for your project brief. Our team will review your specifications and email you the kickoff invite and contract within <strong>4 business hours</strong>.</p>
       ${detailsTable(rows)}
       <p style="margin-top:20px;">— The ${BRAND} team</p>`,
    ),
  };
}

export function orderNotification(order: Order): EmailContent {
  const rows: [string, string][] = [
    ...orderRows(order),
    ['Client', `${order.clientName} <${order.clientEmail}>`],
    ['Industry', order.industry || '—'],
    ['Branding', order.hasBranding],
    ['Notes', order.notes || '—'],
  ];
  return {
    subject: `New order ${order.reference} — ${PACKAGES[order.packageType].label}`,
    text: `New project brief\n\n${detailsText(rows)}`,
    html: layout(`New order ${order.reference}`, detailsTable(rows)),
  };
}

// ---------------------------------------------------------------------------
// Admin replies
// ---------------------------------------------------------------------------

export function adminReply(subject: string, body: string): EmailContent {
  return {
    subject,
    text: body,
    html: layout(subject, `<p>${paragraph(body)}</p>`),
  };
}

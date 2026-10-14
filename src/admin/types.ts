// Shapes returned by the backend's /api/admin and /api/auth routes.

export interface Admin {
  id: number;
  email: string;
  name: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
}

export interface Stats {
  totalMessages: number;
  newMessages: number;
  totalOrders: number;
  ordersInReview: number;
  pipelineValue: number;
  /** Failures in the last 7 days. */
  failedEmails: number;
}

export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'in_review' | 'discovery_call' | 'in_development' | 'ready_to_launch' | 'cancelled';

export interface Order {
  id: number;
  reference: string;
  packageType: 'landing' | 'mvp' | 'full-app';
  templateId: string | null;
  templateTitle: string | null;
  clientName: string;
  clientEmail: string;
  companyName: string;
  industry: string;
  hasBranding: 'ready' | 'need-logo' | 'complete-rebrand';
  timeline: string;
  notes: string;
  estimatedPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type EmailKind = 'contact_ack' | 'contact_notify' | 'order_confirmation' | 'order_notify' | 'admin_reply';
export type EmailStatus = 'sent' | 'failed' | 'logged';

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
  createdAt: string;
}

export const MESSAGE_STATUS_LABELS: Record<MessageStatus, string> = {
  new: 'New',
  read: 'Read',
  replied: 'Replied',
  archived: 'Archived',
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  in_review: 'In Review',
  discovery_call: 'Discovery Call',
  in_development: 'In Development',
  ready_to_launch: 'Ready to Launch',
  cancelled: 'Cancelled',
};

export const EMAIL_STATUS_LABELS: Record<EmailStatus, string> = {
  sent: 'Sent',
  failed: 'Failed',
  logged: 'Logged (SMTP off)',
};

export const EMAIL_KIND_LABELS: Record<EmailKind, string> = {
  contact_ack: 'Contact auto-reply',
  contact_notify: 'Contact notification',
  order_confirmation: 'Order confirmation',
  order_notify: 'Order notification',
  admin_reply: 'Sent from dashboard',
};

export const PACKAGE_LABELS: Record<Order['packageType'], string> = {
  landing: 'Landing Page',
  mvp: 'Startup MVP Sprint',
  'full-app': 'Full Scalable App',
};

export const BRANDING_LABELS: Record<Order['hasBranding'], string> = {
  ready: 'Logo and content ready',
  'need-logo': 'Needs logo / brand colors',
  'complete-rebrand': 'Needs copywriting and branding',
};

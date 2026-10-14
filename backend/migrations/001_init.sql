-- Admin accounts. There is no public sign-up: admins are created with `npm run create-admin`.
CREATE TABLE admins (
  id            integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email         text NOT NULL,
  name          text NOT NULL DEFAULT '',
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz
);
CREATE UNIQUE INDEX admins_email_key ON admins (lower(email));

-- Login sessions. Only a SHA-256 hash of the cookie token is stored.
CREATE TABLE admin_sessions (
  token_hash text PRIMARY KEY,
  admin_id   integer NOT NULL REFERENCES admins (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);
CREATE INDEX admin_sessions_expires_at_idx ON admin_sessions (expires_at);

-- Messages sent from the public "Contact Us" page.
CREATE TABLE contact_messages (
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text NOT NULL,
  email      text NOT NULL,
  message    text NOT NULL,
  status     text NOT NULL DEFAULT 'new'
             CHECK (status IN ('new', 'read', 'replied', 'archived')),
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX contact_messages_created_at_idx ON contact_messages (created_at DESC);

-- Project briefs submitted from the "Project Onboarding & Scope" modal.
CREATE TABLE orders (
  id              integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reference       text NOT NULL UNIQUE,
  package_type    text NOT NULL CHECK (package_type IN ('landing', 'mvp', 'full-app')),
  template_id     text,
  template_title  text,
  client_name     text NOT NULL,
  client_email    text NOT NULL,
  company_name    text NOT NULL,
  industry        text NOT NULL DEFAULT '',
  has_branding    text NOT NULL CHECK (has_branding IN ('ready', 'need-logo', 'complete-rebrand')),
  timeline        text NOT NULL DEFAULT '',
  notes           text NOT NULL DEFAULT '',
  estimated_price integer NOT NULL,
  status          text NOT NULL DEFAULT 'in_review'
                  CHECK (status IN ('in_review', 'discovery_call', 'in_development', 'ready_to_launch', 'cancelled')),
  ip_address      text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX orders_created_at_idx ON orders (created_at DESC);

-- Every email the backend tries to send (automatic confirmations and admin replies).
CREATE TABLE email_logs (
  id                 integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kind               text NOT NULL
                     CHECK (kind IN ('contact_ack', 'contact_notify', 'order_confirmation', 'order_notify', 'admin_reply')),
  to_email           text NOT NULL,
  subject            text NOT NULL,
  body               text NOT NULL,
  status             text NOT NULL CHECK (status IN ('sent', 'failed', 'logged')),
  error              text,
  contact_message_id integer REFERENCES contact_messages (id) ON DELETE SET NULL,
  order_id           integer REFERENCES orders (id) ON DELETE SET NULL,
  sent_by_admin_id   integer REFERENCES admins (id) ON DELETE SET NULL,
  created_at         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX email_logs_created_at_idx ON email_logs (created_at DESC);

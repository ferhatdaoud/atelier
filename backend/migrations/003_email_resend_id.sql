-- The id Resend returns for each accepted email, to look up its delivery
-- status in the Resend dashboard (resend.com/emails).
ALTER TABLE email_logs ADD COLUMN resend_id text;

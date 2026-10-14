# KZFR Backend

Express + TypeScript + PostgreSQL API for the KZFR website.

- Stores **contact messages** (Contact page) and **orders / project briefs** (Project Onboarding modal).
- Sends **emails**: a confirmation to the client, a notification to the studio, and replies written from the admin dashboard. Every email is recorded in the `email_logs` table.
- **Admin-only login** for the dashboard at `/admin`. There is no public sign-up; admins are created from the command line.

## Setup

Requirements: Node.js 20+ and PostgreSQL 13+.

```bash
cd backend
npm install
cp .env.example .env        # PowerShell: Copy-Item .env.example .env
```

Edit `backend/.env` and set `DATABASE_URL` to your PostgreSQL credentials, e.g.

```
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/kzfr
```

Create the database tables. The database is created too if it doesn't exist yet:

```bash
npm run db:migrate
```

Create your admin account. You will be asked for a password (at least 10 characters):

```bash
npm run create-admin -- --email you@example.com --name "Your Name"
```

Running the same command again for an existing email **resets its password** and signs out all of its sessions.

## Running in development

Use two terminals:

```bash
# Terminal 1: API on http://localhost:4000
cd backend
npm run dev

# Terminal 2: website on http://localhost:3000 (from the repo root)
npm run dev
```

Vite forwards every `/api/*` request to the backend, so the website and API share one origin.

- Website: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin

## Email

Without SMTP settings, emails are **printed in the backend terminal** and shown as "Logged (SMTP off)" in the dashboard. Nothing is delivered.

To send real emails, fill in the SMTP variables in `backend/.env`. Any provider works (Gmail, Brevo, Resend, Mailgun, SendGrid, Zoho...). Gmail example:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your-16-char-app-password    # Google Account → Security → App passwords
MAIL_FROM="KZFR Studio <youraddress@gmail.com>"
ADMIN_NOTIFY_EMAIL=youraddress@gmail.com
```

At startup the server logs `SMTP ready` or the connection error.

## API

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | – | Health check (also checks the DB) |
| POST | `/api/contact` | – | Save a contact message and send emails |
| POST | `/api/orders` | – | Save a project brief and send emails. The price is set by the server |
| POST | `/api/auth/login` | – | Admin login (sets an httpOnly session cookie) |
| POST | `/api/auth/logout` | – | Log out (deletes the session) |
| GET | `/api/auth/me` | admin | Current admin |
| GET | `/api/admin/stats` | admin | Dashboard numbers |
| GET | `/api/admin/messages` | admin | List messages (`status`, `search`, `limit`, `offset`) |
| PATCH / DELETE | `/api/admin/messages/:id` | admin | Change status (`new`, `read`, `replied`, `archived`) / delete |
| GET | `/api/admin/orders` | admin | List orders (`status`, `search`, `limit`, `offset`) |
| PATCH / DELETE | `/api/admin/orders/:id` | admin | Change status (`in_review`, `discovery_call`, `in_development`, `ready_to_launch`, `cancelled`) / delete |
| GET | `/api/admin/emails` | admin | Email log (`contactMessageId`, `orderId`, `limit`, `offset`) |
| POST | `/api/admin/emails` | admin | Send an email to a client (`to`, `subject`, `body`, optional `contactMessageId` / `orderId`) |

## Security notes

- Passwords are hashed with scrypt (Node's built-in `crypto`).
- Sessions are random tokens in an `httpOnly`, `SameSite=Strict` cookie (also `Secure` in production). Only a SHA-256 hash of each token is stored in the `admin_sessions` table, so logging out revokes a session immediately.
- Login is rate-limited (10 failed attempts per 15 min per IP). Public forms are limited to 10 submissions per hour per IP and have a hidden honeypot field against bots.
- All input is validated with zod, and all SQL uses parameters.
- User text is HTML-escaped in emails. Automatic replies to visitors don't repeat their message, so the form can't be used to relay spam.

## Production

```bash
# repo root
npm run build               # builds the website into dist/

cd backend
npm run build               # compiles TypeScript into backend/dist/
npm run db:migrate:prod
NODE_ENV=production npm start
```

With `NODE_ENV=production`, the backend also serves the built website from `../dist`, so a single Node process hosts both. Behind a reverse proxy (Nginx, Render, Railway...), set `TRUST_PROXY=1` so rate limiting sees real client IPs. Serve the site over HTTPS, because the session cookie is `Secure` in production.

If you host the website separately (for example on Vercel), set `VITE_API_URL` when building the frontend and `CORS_ORIGIN` on the backend. Both must be on the same site (e.g. `example.com` and `api.example.com`) because the cookie is `SameSite=Strict`.

## Adding database changes

Add a new numbered file to `backend/migrations/` (for example `002_add_phone.sql`) and run `npm run db:migrate`. Applied files are tracked in the `schema_migrations` table, so each runs only once.

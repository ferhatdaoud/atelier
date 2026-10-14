# KZFR Backend

Express + TypeScript + PostgreSQL API for the KZFR website.

- Stores **contact messages** (Contact page) and **orders / project briefs** (Project Onboarding modal).
- Sends **emails**: a confirmation to the client, a notification to the studio, and replies written from the admin dashboard. Every email is recorded in the `email_logs` table.
- **Admin-only login** for the dashboard at `/admin`. There is no public sign-up; admins are created from the command line.

The same code runs two ways:

- **Locally / any Node host:** `src/server.ts` starts a normal Express server.
- **On Vercel:** `api/index.ts` (at the repo root) exposes the same Express app as a serverless function. See [Deploying to Vercel](#deploying-to-vercel).

## Setup

Requirements: Node.js 22+ (the website's `react-router` requires Node 22.22 or newer) and PostgreSQL 13+.

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
- Login is rate-limited (10 failed attempts per 15 min per IP). Public forms are limited to 10 submissions per hour per IP and have a hidden honeypot field against bots. The counters live in the `rate_limits` table, so the limits hold across serverless instances.
- All input is validated with zod, and all SQL uses parameters.
- User text is HTML-escaped in emails. Automatic replies to visitors don't repeat their message, so the form can't be used to relay spam.

## Deploying to Vercel

The repo is ready for Vercel as **one project**: the website and the API share the same domain, so the admin cookie works without any CORS setup. [`vercel.json`](../vercel.json) already:

- installs the backend's dependencies,
- sends every `/api/*` request to the Express app ([`api/index.ts`](../api/index.ts)),
- serves `index.html` for all other paths, so links like `/admin/orders` work when opened directly.

### 1. Create a PostgreSQL database

In your Vercel project, open **Storage**, add a **Neon** Postgres database from the Marketplace and connect it to the project. This adds `DATABASE_URL` to the project's environment variables automatically.

Any hosted PostgreSQL works (Supabase, Railway...). Add its **pooled** connection string as `DATABASE_URL` yourself. Serverless functions open many short connections, which a pooler handles well.

### 2. Add the other environment variables

In **Project Settings → Environment Variables**, add the variables from [Email](#email): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` and `ADMIN_NOTIFY_EMAIL`. Don't set `NODE_ENV` or `TRUST_PROXY`, because Vercel's defaults are already correct.

### 3. Create the tables and your admin account (from your computer)

Vercel can't run interactive commands, so run these locally against the production database. Copy `DATABASE_URL` from Vercel (use the **unpooled** URL if Neon shows both) and put it in `backend/.env`, then:

```bash
cd backend
npm run db:migrate
npm run create-admin -- --email you@example.com --name "Your Name"
```

Afterwards, switch `backend/.env` back to your local database.

### 4. Deploy

Push to GitHub. Vercel builds and deploys automatically. Then open `https://your-site.vercel.app/admin` and log in.

**Preview deployments** use the same environment variables by default, so they write to the same database. To keep them apart, scope `DATABASE_URL` to *Production* only, or let the Neon integration create a database branch per preview.

## Other hosts (VPS, Render, Railway...)

```bash
# repo root
npm run build               # builds the website into dist/

cd backend
npm run build               # compiles TypeScript into backend/dist/
npm run db:migrate:prod
NODE_ENV=production npm start
```

With `NODE_ENV=production`, `server.ts` also serves the built website from `../dist`, so a single Node process hosts both. Behind a reverse proxy (Nginx, Render, Railway...), set `TRUST_PROXY=1` so rate limiting sees real client IPs. Serve the site over HTTPS, because the session cookie is `Secure` in production.

## Adding database changes

Add a new numbered file to `backend/migrations/` (for example `003_add_phone.sql`) and run `npm run db:migrate`, both locally and against production (step 3 above). Applied files are tracked in the `schema_migrations` table, so each runs only once.

/**
 * Creates an admin account, or resets the password of an existing one.
 *
 *   npm run create-admin                      (asks for email, name and password)
 *   npm run create-admin you@example.com      (asks for name and password)
 *
 * Running it again for an existing email resets that admin's password.
 *
 * `--email` / `--name` flags also work in shells that pass them through
 * (`npm run create-admin -- --email you@example.com`). PowerShell strips the `--`,
 * which is why the plain forms above exist.
 *
 * The password is never echoed. For automation, set ADMIN_PASSWORD instead.
 */
import readline from 'node:readline';
import { Writable } from 'node:stream';
import { parseArgs } from 'node:util';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { hashPassword } from '../lib/password.js';

const MIN_PASSWORD_LENGTH = 10;

/**
 * Line-by-line prompts on one readline interface, so piped input works too.
 * Hidden prompts don't echo what is typed.
 */
function createPrompter() {
  let muted = false;
  const output = new Writable({
    write(chunk, encoding, callback) {
      if (!muted) process.stdout.write(chunk, encoding);
      callback();
    },
  });
  const rl = readline.createInterface({ input: process.stdin, output, terminal: Boolean(process.stdin.isTTY) });
  const lines = rl[Symbol.asyncIterator]();

  const ask = async (prompt: string, { hidden = false } = {}) => {
    process.stdout.write(prompt);
    muted = hidden;
    const { value } = await lines.next();
    muted = false;
    if (hidden || !process.stdin.isTTY) process.stdout.write('\n');
    return typeof value === 'string' ? value.trim() : '';
  };

  return { ask, close: () => rl.close() };
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      email: { type: 'string' },
      name: { type: 'string' },
    },
  });

  // Check the database before asking anything, so a missing migration is reported up front.
  const { rows: tables } = await pool.query<{ ready: boolean }>(`SELECT to_regclass('public.admins') IS NOT NULL AS ready`);
  if (!tables[0]?.ready) fail('The database has no tables yet. Run `npm run db:migrate` first, then try again.');

  const prompt = createPrompter();
  try {
    const emailInput = values.email ?? positionals[0] ?? (await prompt.ask('Admin email: '));
    const email = z.email().safeParse(emailInput.trim());
    if (!email.success) fail(`"${emailInput}" is not a valid email address.`);

    const name = values.name ?? (positionals.slice(1).join(' ') || (await prompt.ask('Name (optional, press Enter to skip): ')));

    let password = process.env.ADMIN_PASSWORD;
    if (!password) {
      password = await prompt.ask(`Password for ${email.data} (min. ${MIN_PASSWORD_LENGTH} characters): `, { hidden: true });
      const confirm = await prompt.ask('Confirm password: ', { hidden: true });
      if (password !== confirm) fail('Passwords do not match.');
    }
    if (password.length < MIN_PASSWORD_LENGTH) fail(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);

    const passwordHash = await hashPassword(password);
    const { rows } = await pool.query<{ id: number; inserted: boolean }>(
      `INSERT INTO admins (email, name, password_hash) VALUES ($1, $2, $3)
       ON CONFLICT ((lower(email))) DO UPDATE
         SET password_hash = EXCLUDED.password_hash,
             name = CASE WHEN EXCLUDED.name <> '' THEN EXCLUDED.name ELSE admins.name END
       RETURNING id, (xmax = 0) AS inserted`,
      [email.data, name.trim(), passwordHash],
    );
    const admin = rows[0]!;

    if (admin.inserted) {
      console.log(`Admin ${email.data} created. You can now log in at /admin.`);
    } else {
      // A password reset should sign out every existing session.
      await pool.query('DELETE FROM admin_sessions WHERE admin_id = $1', [admin.id]);
      console.log(`Password updated for ${email.data}; existing sessions were signed out.`);
    }
  } finally {
    prompt.close();
  }
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());

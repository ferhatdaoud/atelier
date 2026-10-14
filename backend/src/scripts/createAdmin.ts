/**
 * Creates an admin account, or resets the password of an existing one.
 *
 *   npm run create-admin -- --email you@example.com --name "Your Name"
 *
 * The password is asked for interactively (input hidden). For automation, set
 * ADMIN_PASSWORD in the environment instead.
 */
import readline from 'node:readline';
import { Writable } from 'node:stream';
import { parseArgs } from 'node:util';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { hashPassword } from '../lib/password.js';

const MIN_PASSWORD_LENGTH = 10;

/** Asks for the password twice without echoing it. Also works with piped input. */
async function askPasswordTwice(email: string): Promise<[string, string]> {
  let muted = false;
  const output = new Writable({
    write(chunk, encoding, callback) {
      if (!muted) process.stdout.write(chunk, encoding);
      callback();
    },
  });
  const rl = readline.createInterface({ input: process.stdin, output, terminal: Boolean(process.stdin.isTTY) });
  const lines = rl[Symbol.asyncIterator]();

  const ask = async (prompt: string) => {
    process.stdout.write(prompt);
    muted = true;
    const { value } = await lines.next();
    muted = false;
    process.stdout.write('\n');
    return typeof value === 'string' ? value : '';
  };

  try {
    return [await ask(`Password for ${email}: `), await ask('Confirm password: ')];
  } finally {
    rl.close();
  }
}

async function main() {
  const { values } = parseArgs({
    options: {
      email: { type: 'string' },
      name: { type: 'string', default: '' },
    },
  });

  const email = z.email().safeParse(values.email?.trim());
  if (!email.success) {
    console.error('Usage: npm run create-admin -- --email you@example.com [--name "Your Name"]');
    process.exit(1);
  }

  let password = process.env.ADMIN_PASSWORD;
  if (!password) {
    const [first, confirm] = await askPasswordTwice(email.data);
    password = first;
    if (password !== confirm) {
      console.error('Passwords do not match.');
      process.exit(1);
    }
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const { rows } = await pool.query<{ id: number; inserted: boolean }>(
    `INSERT INTO admins (email, name, password_hash) VALUES ($1, $2, $3)
     ON CONFLICT ((lower(email))) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           name = CASE WHEN EXCLUDED.name <> '' THEN EXCLUDED.name ELSE admins.name END
     RETURNING id, (xmax = 0) AS inserted`,
    [email.data, values.name?.trim() ?? '', passwordHash],
  );
  const admin = rows[0]!;

  if (admin.inserted) {
    console.log(`Admin ${email.data} created.`);
  } else {
    // A password reset should sign out every existing session.
    await pool.query('DELETE FROM admin_sessions WHERE admin_id = $1', [admin.id]);
    console.log(`Password updated for ${email.data}; existing sessions were signed out.`);
  }
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());

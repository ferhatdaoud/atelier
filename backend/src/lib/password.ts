import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

// scrypt parameters (N=2^15, r=8 → ~32 MB per hash). Stored alongside each hash
// so they can be raised later without invalidating existing passwords.
const N = 2 ** 15;
const R = 8;
const P = 1;
const KEY_LENGTH = 64;
const MAX_MEM = 64 * 1024 * 1024;

function deriveKey(password: string, salt: Buffer, n: number, r: number, p: number, keyLength: number) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, keyLength, { N: n, r, p, maxmem: MAX_MEM }, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

/** Returns a self-describing hash: `scrypt$N$r$p$salt$key` (salt and key base64). */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt, N, R, P, KEY_LENGTH);
  return ['scrypt', N, R, P, salt.toString('base64'), key.toString('base64')].join('$');
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, n, r, p, saltB64, keyB64] = stored.split('$');
  if (algorithm !== 'scrypt' || !n || !r || !p || !saltB64 || !keyB64) return false;

  const expected = Buffer.from(keyB64, 'base64');
  const actual = await deriveKey(password, Buffer.from(saltB64, 'base64'), Number(n), Number(r), Number(p), expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

let dummyHash: Promise<string> | undefined;

/**
 * Burns the same CPU time as a real check. Used when the email is unknown so
 * response timing doesn't reveal which admin emails exist.
 */
export async function fakePasswordCheck(password: string): Promise<false> {
  dummyHash ??= hashPassword('not-a-real-password');
  await verifyPassword(password, await dummyHash);
  return false;
}

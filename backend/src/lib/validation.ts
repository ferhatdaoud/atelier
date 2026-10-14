import { z } from 'zod';

export const emailField = z
  .string({ error: 'Email is required.' })
  .trim()
  .max(254, 'Email is too long.')
  .pipe(z.email('Please enter a valid email address.'));

export const requiredText = (label: string, max: number) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be at most ${max} characters.`);

export const optionalText = (label: string, max: number) =>
  z.string().trim().max(max, `${label} must be at most ${max} characters.`).default('');

export const idParam = z.coerce.number({ error: 'Invalid id.' }).int().positive('Invalid id.');

export const pagination = {
  limit: z.coerce.number().int().min(1).max(200).default(50),
  offset: z.coerce.number().int().min(0).default(0),
};

/** Wraps a search term for ILIKE, escaping its own wildcards. */
export function likePattern(term: string) {
  return `%${term.replace(/[\\%_]/g, '\\$&')}%`;
}

/** Formats an amount in Algerian dinars, e.g. 30000 → "30,000 DA". */
export function formatPrice(amount: number) {
  return `${amount.toLocaleString('en-US')} DA`;
}

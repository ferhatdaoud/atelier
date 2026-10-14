// Mirrors the three packages offered in src/components/OrderTemplateModal.tsx.
// Prices are decided here, not by the browser.
export const PACKAGES = {
  landing: { label: 'High-Converting Landing Page', price: 12000 },
  mvp: { label: 'Startup MVP Sprint', price: 30000 },
  'full-app': { label: 'Full Scalable Web Application', price: 60000 },
} as const;

export type PackageType = keyof typeof PACKAGES;

export const PACKAGE_TYPES = Object.keys(PACKAGES) as [PackageType, ...PackageType[]];

export const ORDER_STATUSES = ['in_review', 'discovery_call', 'in_development', 'ready_to_launch', 'cancelled'] as const;
export const MESSAGE_STATUSES = ['new', 'read', 'replied', 'archived'] as const;

export function formatPrice(amount: number) {
  return `${amount.toLocaleString('en-US')} DA`;
}

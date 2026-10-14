import React from 'react';
import { AlertCircle, Loader2, Search } from 'lucide-react';

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export { formatPrice } from '../lib/format';

type Tone = 'accent' | 'neutral' | 'muted' | 'success' | 'warning' | 'info' | 'violet' | 'danger';

const TONES: Record<Tone, string> = {
  accent: 'bg-[#ff6b2c]/15 text-[#ff8a57] border-[#ff6b2c]/30',
  neutral: 'bg-white/5 text-zinc-300 border-white/10',
  muted: 'bg-white/[0.02] text-zinc-500 border-white/5',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  warning: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  info: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
  violet: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
  danger: 'bg-red-500/10 text-red-300 border-red-500/25',
};

export const STATUS_TONES: Record<string, Tone> = {
  // messages
  new: 'accent',
  read: 'neutral',
  replied: 'success',
  archived: 'muted',
  // orders
  in_review: 'warning',
  discovery_call: 'info',
  in_development: 'violet',
  ready_to_launch: 'success',
  cancelled: 'danger',
  // emails
  sent: 'success',
  logged: 'warning',
  failed: 'danger',
};

export function Badge({ status, label }: { status: string; label: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${TONES[STATUS_TONES[status] ?? 'neutral']}`}
    >
      {label}
    </span>
  );
}

export function Spinner({ className = '' }: { className?: string }) {
  return <Loader2 className={`h-5 w-5 animate-spin text-zinc-500 ${className}`} aria-label="Loading" />;
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-300">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="text-xs font-semibold underline underline-offset-2 hover:text-red-200">
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center text-sm text-zinc-500">{children}</div>;
}

export function FilterChips<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T | '';
  options: Record<T, string>;
  onChange: (value: T | '') => void;
}) {
  const entries: [T | '', string][] = [['', 'All'], ...(Object.entries(options) as [T, string][])];
  return (
    <div className="flex flex-wrap gap-1.5">
      {entries.map(([key, label]) => (
        <button
          key={key || 'all'}
          onClick={() => onChange(key)}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            value === key
              ? 'border-[#ff6b2c] bg-[#ff6b2c]/15 text-white'
              : 'border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/10 bg-black py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:border-[#ff6b2c] focus:outline-none"
      />
    </div>
  );
}

export function LoadMore({ shown, total, loading, onClick }: { shown: number; total: number; loading: boolean; onClick: () => void }) {
  if (shown >= total) return null;
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full rounded-xl border border-white/10 py-2.5 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200 disabled:opacity-50"
    >
      {loading ? 'Loading…' : `Load more (${total - shown} remaining)`}
    </button>
  );
}

export const inputClass =
  'w-full rounded-xl border border-white/15 bg-black px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#ff6b2c] focus:outline-none';

export const secondaryButtonClass =
  'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10 disabled:opacity-50';

export const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b2c] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#ff824d] disabled:cursor-wait disabled:opacity-60';

export const dangerButtonClass =
  'inline-flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50';

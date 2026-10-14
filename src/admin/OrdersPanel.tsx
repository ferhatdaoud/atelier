import { useState } from 'react';
import { ArrowLeft, Mail, Trash2 } from 'lucide-react';
import { errorMessage } from '../lib/api';
import { useAdmin, useAdminList, useDebounced } from './AdminContext';
import { ComposeEmailModal, type ComposeDraft } from './ComposeEmailModal';
import { EmailHistory } from './EmailsPanel';
import { BRANDING_LABELS, ORDER_STATUS_LABELS, PACKAGE_LABELS, type Order, type OrderStatus } from './types';
import {
  Badge,
  EmptyState,
  ErrorBanner,
  FilterChips,
  LoadMore,
  SearchInput,
  Spinner,
  dangerButtonClass,
  formatDate,
  formatPrice,
  primaryButtonClass,
} from './ui';

export function OrdersPanel() {
  const { request, refreshStats } = useAdmin();
  const [status, setStatus] = useState<OrderStatus | ''>('');
  const [searchInput, setSearchInput] = useState('');
  const search = useDebounced(searchInput.trim());
  const list = useAdminList<Order>('/admin/orders', { status, search });

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState<ComposeDraft | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState(0);
  const selected = list.items.find((o) => o.id === selectedId) ?? null;

  const changeStatus = async (order: Order, next: OrderStatus) => {
    setActionError(null);
    try {
      const updated = await request<Order>(`/admin/orders/${order.id}`, { method: 'PATCH', body: { status: next } });
      list.setItems((items) => items.map((o) => (o.id === updated.id ? updated : o)));
      refreshStats();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  };

  const remove = async (order: Order) => {
    if (!window.confirm(`Delete order ${order.reference} from ${order.companyName}? This cannot be undone.`)) return;
    setActionError(null);
    try {
      await request(`/admin/orders/${order.id}`, { method: 'DELETE' });
      list.setItems((items) => items.filter((o) => o.id !== order.id));
      list.setTotal((total) => total - 1);
      setSelectedId(null);
      refreshStats();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  };

  const emailClient = (order: Order) =>
    setDraft({
      to: order.clientEmail,
      subject: `Your project ${order.reference} — KZFR Studio`,
      body: `Hi ${order.clientName.split(' ')[0]},\n\nThanks for choosing KZFR Studio for ${order.companyName}.\n\n\n\n— KZFR Studio`,
      orderId: order.id,
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {/* List */}
      <div className={`space-y-4 ${selected ? 'hidden lg:block' : ''}`}>
        <div className="flex flex-col gap-3">
          <SearchInput value={searchInput} onChange={setSearchInput} placeholder="Search reference, client, company…" />
          <FilterChips value={status} options={ORDER_STATUS_LABELS} onChange={setStatus} />
        </div>

        {list.error && <ErrorBanner message={list.error} onRetry={list.reload} />}

        {list.loading && !list.items.length ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : !list.items.length ? (
          <EmptyState>{search || status ? 'No orders match these filters.' : 'No orders yet. Project briefs from the website will appear here.'}</EmptyState>
        ) : (
          <ul className="space-y-2">
            {list.items.map((order) => (
              <li key={order.id}>
                <button
                  onClick={() => {
                    setSelectedId(order.id);
                    setActionError(null);
                  }}
                  className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                    order.id === selectedId
                      ? 'border-[#ff6b2c]/60 bg-[#ff6b2c]/[0.06]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-zinc-100">{order.companyName}</span>
                    <Badge status={order.status} label={ORDER_STATUS_LABELS[order.status]} />
                  </div>
                  <div className="mt-0.5 truncate text-xs text-zinc-500">
                    <span className="font-mono">{order.reference}</span> · {order.clientName} · {formatDate(order.createdAt)}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">{PACKAGE_LABELS[order.packageType]}</span>
                    <span className="font-semibold tabular-nums text-[#ff8a57]">{formatPrice(order.estimatedPrice)}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        <LoadMore shown={list.items.length} total={list.total} loading={list.loading} onClick={list.loadMore} />
      </div>

      {/* Detail */}
      <div className={selected ? '' : 'hidden lg:block'}>
        {selected ? (
          <article className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:sticky lg:top-20">
            <button onClick={() => setSelectedId(null)} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white lg:hidden">
              <ArrowLeft className="h-4 w-4" /> All orders
            </button>

            <header className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-mono text-xs text-zinc-500">{selected.reference}</div>
                <h2 className="font-display text-lg font-bold">{selected.companyName}</h2>
                <div className="text-sm text-zinc-300">
                  {selected.clientName} ·{' '}
                  <a href={`mailto:${selected.clientEmail}`} className="text-[#ff8a57] hover:underline">
                    {selected.clientEmail}
                  </a>
                </div>
                <div className="mt-1 text-xs text-zinc-500">Submitted {formatDate(selected.createdAt)}</div>
              </div>
              <select
                value={selected.status}
                onChange={(e) => void changeStatus(selected, e.target.value as OrderStatus)}
                className="rounded-full border border-white/15 bg-black px-3 py-1.5 text-xs text-white focus:border-[#ff6b2c] focus:outline-none"
                aria-label="Order status"
              >
                {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </header>

            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-xl border border-white/5 bg-black/40 p-4 text-sm sm:grid-cols-2">
              <Field label="Package" value={PACKAGE_LABELS[selected.packageType]} />
              <Field label="Estimate" value={formatPrice(selected.estimatedPrice)} />
              {selected.templateTitle && <Field label="Template" value={selected.templateTitle} wide />}
              <Field label="Industry" value={selected.industry || '—'} />
              <Field label="Timeline" value={selected.timeline || '—'} />
              <Field label="Branding" value={BRANDING_LABELS[selected.hasBranding]} wide />
              <Field label="Notes" value={selected.notes || '—'} wide />
            </dl>

            {actionError && <ErrorBanner message={actionError} />}

            <div className="flex flex-wrap gap-2">
              <button onClick={() => emailClient(selected)} className={primaryButtonClass}>
                <Mail className="h-4 w-4" /> Email client
              </button>
              <button onClick={() => void remove(selected)} className={dangerButtonClass}>
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>

            <EmailHistory key={`${selected.id}-${historyKey}`} orderId={selected.id} />
          </article>
        ) : (
          <EmptyState>Select an order to see the full brief.</EmptyState>
        )}
      </div>

      {draft && (
        <ComposeEmailModal
          draft={draft}
          onClose={() => setDraft(null)}
          onSent={() => {
            setHistoryKey((k) => k + 1);
            refreshStats();
          }}
        />
      )}
    </div>
  );
}

function Field({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap break-words text-zinc-200">{value}</dd>
    </div>
  );
}

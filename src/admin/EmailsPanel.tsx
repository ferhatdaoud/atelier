import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAdminList } from './AdminContext';
import { EMAIL_KIND_LABELS, EMAIL_STATUS_LABELS, type EmailLog } from './types';
import { Badge, EmptyState, ErrorBanner, LoadMore, Spinner, formatDate } from './ui';

/** The "Emails" tab: every email the backend sent or tried to send. */
export function EmailsPanel() {
  const list = useAdminList<EmailLog>('/admin/emails', {});

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400">
        Automatic confirmations, studio notifications and emails sent from this dashboard.
      </p>
      {list.error && <ErrorBanner message={list.error} onRetry={list.reload} />}
      {list.loading && !list.items.length ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !list.items.length ? (
        <EmptyState>No emails yet.</EmptyState>
      ) : (
        <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10">
          {list.items.map((email) => (
            <EmailRow key={email.id} email={email} showKind />
          ))}
        </div>
      )}
      <LoadMore shown={list.items.length} total={list.total} loading={list.loading} onClick={list.loadMore} />
    </div>
  );
}

/** Compact email history for one message or order (shown in their detail panels). */
export function EmailHistory({ contactMessageId, orderId }: { contactMessageId?: number; orderId?: number }) {
  const list = useAdminList<EmailLog>('/admin/emails', {
    contactMessageId: contactMessageId?.toString(),
    orderId: orderId?.toString(),
  });

  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Email history</h3>
      {list.error ? (
        <ErrorBanner message={list.error} onRetry={list.reload} />
      ) : list.loading && !list.items.length ? (
        <Spinner />
      ) : !list.items.length ? (
        <p className="text-sm text-zinc-500">No emails yet.</p>
      ) : (
        <div className="divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10">
          {list.items.map((email) => (
            <EmailRow key={email.id} email={email} />
          ))}
        </div>
      )}
    </section>
  );
}

function EmailRow({ email, showKind = false }: { email: EmailLog; showKind?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/[0.01]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
      >
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm text-zinc-100">{email.subject}</div>
          <div className="mt-0.5 truncate text-xs text-zinc-500">
            To {email.toEmail} · {formatDate(email.createdAt)}
            {showKind && ` · ${EMAIL_KIND_LABELS[email.kind]}`}
          </div>
        </div>
        <Badge status={email.status} label={EMAIL_STATUS_LABELS[email.status]} />
        <ChevronDown className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="border-t border-white/5 px-4 py-3">
          {email.error && <p className="mb-2 text-xs text-red-300">Error: {email.error}</p>}
          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-zinc-300">{email.body}</pre>
          {email.resendId && (
            <p className="mt-3 text-[11px] text-zinc-500">
              Resend ID: <span className="select-all font-mono">{email.resendId}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, Reply, Trash2 } from 'lucide-react';
import { errorMessage } from '../lib/api';
import { useAdmin, useAdminList, useDebounced } from './AdminContext';
import { ComposeEmailModal, type ComposeDraft } from './ComposeEmailModal';
import { EmailHistory } from './EmailsPanel';
import { MESSAGE_STATUS_LABELS, type ContactMessage, type MessageStatus } from './types';
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
  primaryButtonClass,
} from './ui';

export function MessagesPanel() {
  const { request, refreshStats } = useAdmin();
  const [status, setStatus] = useState<MessageStatus | ''>('');
  const [searchInput, setSearchInput] = useState('');
  const search = useDebounced(searchInput.trim());
  const list = useAdminList<ContactMessage>('/admin/messages', { status, search });

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState<ComposeDraft | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState(0);
  const selected = list.items.find((m) => m.id === selectedId) ?? null;

  const replace = (updated: ContactMessage) => list.setItems((items) => items.map((m) => (m.id === updated.id ? updated : m)));

  const changeStatus = async (message: ContactMessage, next: MessageStatus) => {
    setActionError(null);
    try {
      replace(await request<ContactMessage>(`/admin/messages/${message.id}`, { method: 'PATCH', body: { status: next } }));
      refreshStats();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  };

  const open = (message: ContactMessage) => {
    setSelectedId(message.id);
    setActionError(null);
    if (message.status === 'new') void changeStatus(message, 'read');
  };

  const remove = async (message: ContactMessage) => {
    if (!window.confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return;
    setActionError(null);
    try {
      await request(`/admin/messages/${message.id}`, { method: 'DELETE' });
      list.setItems((items) => items.filter((m) => m.id !== message.id));
      list.setTotal((total) => total - 1);
      setSelectedId(null);
      refreshStats();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  };

  const reply = (message: ContactMessage) =>
    setDraft({
      to: message.email,
      subject: 'Re: your message to KZFR Studio',
      body: `Hi ${message.name.split(' ')[0]},\n\n\n\n— KZFR Studio\n\n> ${message.message.replace(/\n/g, '\n> ')}`,
      contactMessageId: message.id,
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {/* List */}
      <div className={`space-y-4 ${selected ? 'hidden lg:block' : ''}`}>
        <div className="flex flex-col gap-3">
          <SearchInput value={searchInput} onChange={setSearchInput} placeholder="Search name, email, message…" />
          <FilterChips value={status} options={MESSAGE_STATUS_LABELS} onChange={setStatus} />
        </div>

        {list.error && <ErrorBanner message={list.error} onRetry={list.reload} />}

        {list.loading && !list.items.length ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : !list.items.length ? (
          <EmptyState>{search || status ? 'No messages match these filters.' : 'No messages yet. They will appear here when someone uses the contact form.'}</EmptyState>
        ) : (
          <ul className="space-y-2">
            {list.items.map((message) => (
              <li key={message.id}>
                <button
                  onClick={() => open(message)}
                  className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                    message.id === selectedId
                      ? 'border-[#ff6b2c]/60 bg-[#ff6b2c]/[0.06]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-sm ${message.status === 'new' ? 'font-bold text-white' : 'font-medium text-zinc-200'}`}>
                      {message.name}
                    </span>
                    <Badge status={message.status} label={MESSAGE_STATUS_LABELS[message.status]} />
                  </div>
                  <div className="mt-0.5 truncate text-xs text-zinc-500">
                    {message.email} · {formatDate(message.createdAt)}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-400">{message.message}</p>
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
              <ArrowLeft className="h-4 w-4" /> All messages
            </button>

            <header className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-lg font-bold">{selected.name}</h2>
                <a href={`mailto:${selected.email}`} className="text-sm text-[#ff8a57] hover:underline">
                  {selected.email}
                </a>
                <div className="mt-1 text-xs text-zinc-500">Received {formatDate(selected.createdAt)}</div>
              </div>
              <select
                value={selected.status}
                onChange={(e) => void changeStatus(selected, e.target.value as MessageStatus)}
                className="rounded-full border border-white/15 bg-black px-3 py-1.5 text-xs text-white focus:border-[#ff6b2c] focus:outline-none"
                aria-label="Message status"
              >
                {Object.entries(MESSAGE_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </header>

            <p className="whitespace-pre-wrap break-words rounded-xl border border-white/5 bg-black/40 p-4 text-sm leading-relaxed text-zinc-200">
              {selected.message}
            </p>

            {actionError && <ErrorBanner message={actionError} />}

            <div className="flex flex-wrap gap-2">
              <button onClick={() => reply(selected)} className={primaryButtonClass}>
                <Reply className="h-4 w-4" /> Reply by email
              </button>
              <button onClick={() => void remove(selected)} className={dangerButtonClass}>
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>

            <EmailHistory key={`${selected.id}-${historyKey}`} contactMessageId={selected.id} />
          </article>
        ) : (
          <EmptyState>Select a message to read it and reply.</EmptyState>
        )}
      </div>

      {draft && (
        <ComposeEmailModal
          draft={draft}
          onClose={() => setDraft(null)}
          onSent={() => {
            if (draft.contactMessageId) {
              const message = list.items.find((m) => m.id === draft.contactMessageId);
              if (message) replace({ ...message, status: 'replied' });
            }
            setHistoryKey((k) => k + 1);
            refreshStats();
          }}
        />
      )}
    </div>
  );
}

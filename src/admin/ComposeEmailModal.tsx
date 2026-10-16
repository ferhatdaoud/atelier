import React, { useEffect, useState } from 'react';
import { CheckCircle2, Send, TriangleAlert, X } from 'lucide-react';
import { errorMessage } from '../lib/api';
import { useAdmin } from './AdminContext';
import type { EmailLog } from './types';
import { ErrorBanner, Spinner, inputClass, primaryButtonClass, secondaryButtonClass } from './ui';

export interface ComposeDraft {
  to: string;
  subject: string;
  body: string;
  contactMessageId?: number;
  orderId?: number;
}

export function ComposeEmailModal({
  draft,
  onClose,
  onSent,
}: {
  draft: ComposeDraft;
  onClose: () => void;
  onSent: (email: EmailLog) => void;
}) {
  const { request } = useAdmin();
  const [to, setTo] = useState(draft.to);
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EmailLog | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !sending && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, sending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const email = await request<EmailLog>('/admin/emails', {
        method: 'POST',
        body: { to, subject, body, contactMessageId: draft.contactMessageId, orderId: draft.orderId },
      });
      setResult(email);
      onSent(email);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compose-title"
    >
      <div className="my-8 w-full max-w-xl rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <h2 id="compose-title" className="font-display text-base font-bold">
            Email client
          </h2>
          <button
            onClick={onClose}
            disabled={sending}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {result ? (
          <div className="px-5 py-10 text-center">
            {result.status === 'sent' ? (
              <>
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
                <p className="mt-3 font-semibold">Email sent to {result.toEmail}</p>
              </>
            ) : (
              <>
                <TriangleAlert className="mx-auto h-10 w-10 text-amber-400" />
                <p className="mt-3 font-semibold">Saved, but not delivered</p>
                <p className="mx-auto mt-1 max-w-sm text-sm text-zinc-400">
                  RESEND_API_KEY isn't set on the server, so the email was printed to the backend console instead. Add it to backend/.env
                  (or to Vercel's environment variables) to send real emails.
                </p>
              </>
            )}
            <button onClick={onClose} className={`${secondaryButtonClass} mt-6`}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            <div>
              <label htmlFor="compose-to" className="mb-1 block text-xs font-medium text-zinc-300">
                To
              </label>
              <input id="compose-to" type="email" required value={to} onChange={(e) => setTo(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="compose-subject" className="mb-1 block text-xs font-medium text-zinc-300">
                Subject
              </label>
              <input
                id="compose-subject"
                required
                maxLength={200}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="compose-body" className="mb-1 block text-xs font-medium text-zinc-300">
                Message
              </label>
              <textarea
                id="compose-body"
                required
                rows={10}
                maxLength={20000}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={`${inputClass} resize-y leading-relaxed`}
                autoFocus
              />
            </div>

            {error && <ErrorBanner message={error} />}

            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={onClose} disabled={sending} className={secondaryButtonClass}>
                Cancel
              </button>
              <button type="submit" disabled={sending} className={primaryButtonClass}>
                {sending ? <Spinner className="h-4 w-4 text-white" /> : <Send className="h-4 w-4" />}
                {sending ? 'Sending…' : 'Send email'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

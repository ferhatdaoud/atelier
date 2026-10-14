import React, { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Lock } from 'lucide-react';
import { api, errorMessage } from '../lib/api';
import type { Admin } from './types';
import { ErrorBanner, Spinner, inputClass, primaryButtonClass } from './ui';

export function AdminLogin({ onLogin }: { onLogin: (admin: Admin) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api<{ admin: Admin }>('/auth/login', { method: 'POST', body: { email, password } });
      onLogin(res.admin);
    } catch (err) {
      setError(errorMessage(err));
      setPassword('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-4 text-[#f4f4f5]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b2c]/30 bg-[#ff6b2c]/10 text-[#ff6b2c]">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-display text-2xl font-bold">
            KZFR<span className="text-[#ff6b2c]">.</span> Admin
          </h1>
          <p className="mt-1 text-sm text-zinc-400">Sign in to manage messages and orders.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <div>
            <label htmlFor="admin-email" className="mb-1 block text-xs font-medium text-zinc-300">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1 block text-xs font-medium text-zinc-300">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <ErrorBanner message={error} />}

          <button type="submit" disabled={submitting} className={`${primaryButtonClass} w-full py-3`}>
            {submitting && <Spinner className="h-4 w-4 text-white" />}
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <Link to="/" className="mt-6 flex items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to website
        </Link>
      </div>
    </div>
  );
}

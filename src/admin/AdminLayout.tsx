import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router';
import { ExternalLink, Inbox, LogOut, Mail, Package } from 'lucide-react';
import { AdminContext, useAdminSession } from './AdminContext';
import type { Admin, Stats } from './types';
import { formatPrice } from './ui';

export function AdminLayout({ admin, onSignedOut }: { admin: Admin; onSignedOut: () => void }) {
  const { request, logout } = useAdminSession(onSignedOut);
  const [stats, setStats] = useState<Stats | null>(null);

  const refreshStats = useCallback(() => {
    request<Stats>('/admin/stats')
      .then(setStats)
      .catch(() => undefined);
  }, [request]);

  useEffect(refreshStats, [refreshStats]);

  const contextValue = useMemo(
    () => ({ admin, request, logout, stats, refreshStats }),
    [admin, request, logout, stats, refreshStats],
  );

  const tabs = [
    { to: '/admin', label: 'Messages', icon: Inbox, count: stats?.newMessages, end: true },
    { to: '/admin/orders', label: 'Orders', icon: Package, count: stats?.ordersInReview, end: false },
    { to: '/admin/emails', label: 'Emails', icon: Mail, count: stats?.failedEmails, end: false },
  ];

  return (
    <AdminContext.Provider value={contextValue}>
      <div className="min-h-screen bg-[#080808] font-sans text-[#f4f4f5]">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080808]/85 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-2 font-display text-base font-bold">
              KZFR<span className="text-[#ff6b2c]">.</span>
              <span className="text-xs font-medium text-zinc-500">Admin</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-3">
              <span className="hidden text-xs text-zinc-400 sm:inline">{admin.name || admin.email}</span>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                title="Open website"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => void logout()}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="New messages" value={stats?.newMessages} hint={stats && `${stats.totalMessages} total`} />
            <StatCard label="Orders in review" value={stats?.ordersInReview} hint={stats && `${stats.totalOrders} total`} />
            <StatCard label="Pipeline value" value={stats && formatPrice(stats.pipelineValue)} hint="Excludes cancelled orders" />
            <StatCard
              label="Failed emails"
              value={stats?.failedEmails}
              hint="Last 7 days — check SMTP settings if > 0"
              alert={Boolean(stats?.failedEmails)}
            />
          </div>

          {/* Tabs */}
          <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-white/10">
            {tabs.map(({ to, label, icon: Icon, count, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `-mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm transition-colors ${
                    isActive ? 'border-[#ff6b2c] text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
                {Boolean(count) && (
                  <span className="rounded-full bg-[#ff6b2c] px-1.5 text-[10px] font-bold leading-4 text-white">{count}</span>
                )}
              </NavLink>
            ))}
          </nav>

          <main className="pt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

function StatCard({
  label,
  value,
  hint,
  alert,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  alert?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${alert ? 'border-red-500/30 bg-red-950/20' : 'border-white/10 bg-white/[0.02]'}`}>
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold tabular-nums">{value ?? '—'}</div>
      {hint && <div className="mt-0.5 text-[11px] text-zinc-500">{hint}</div>}
    </div>
  );
}

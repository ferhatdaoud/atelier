import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { api } from '../lib/api';
import { AdminLayout } from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import { EmailsPanel } from './EmailsPanel';
import { MessagesPanel } from './MessagesPanel';
import { OrdersPanel } from './OrdersPanel';
import type { Admin } from './types';
import { Spinner } from './ui';

/** Everything under /admin. Lazy-loaded from main.tsx so visitors never download it. */
export default function AdminApp() {
  // undefined = still checking the session cookie
  const [admin, setAdmin] = useState<Admin | null | undefined>(undefined);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Admin — KZFR';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    api<{ admin: Admin }>('/auth/me')
      .then((res) => setAdmin(res.admin))
      .catch(() => setAdmin(null));
  }, []);

  const handleSignedOut = useCallback(() => setAdmin(null), []);

  if (admin === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808]">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="login" element={admin ? <Navigate to="/admin" replace /> : <AdminLogin onLogin={setAdmin} />} />
      <Route
        element={admin ? <AdminLayout admin={admin} onSignedOut={handleSignedOut} /> : <Navigate to="/admin/login" replace />}
      >
        <Route index element={<MessagesPanel />} />
        <Route path="orders" element={<OrdersPanel />} />
        <Route path="emails" element={<EmailsPanel />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

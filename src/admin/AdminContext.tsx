import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ApiError, api, errorMessage, type RequestOptions } from '../lib/api';
import type { Admin, Paginated, Stats } from './types';

interface AdminContextValue {
  admin: Admin;
  /** Like `api`, but a 401 (expired session) signs the admin out. */
  request: <T = void>(path: string, options?: RequestOptions) => Promise<T>;
  logout: () => Promise<void>;
  stats: Stats | null;
  refreshStats: () => void;
}

export const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin() {
  const value = useContext(AdminContext);
  if (!value) throw new Error('useAdmin must be used inside the admin dashboard');
  return value;
}

export function useAdminSession(onSignedOut: () => void) {
  const request = useCallback(
    async <T = void,>(path: string, options?: RequestOptions) => {
      try {
        return await api<T>(path, options);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) onSignedOut();
        throw err;
      }
    },
    [onSignedOut],
  );

  const logout = useCallback(async () => {
    await api('/auth/logout', { method: 'POST' }).catch(() => undefined);
    onSignedOut();
  }, [onSignedOut]);

  return { request, logout };
}

export function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const PAGE_SIZE = 25;

/** Loads a paginated admin list and reloads whenever `params` change. */
export function useAdminList<T>(endpoint: string, params: Record<string, string | undefined>) {
  const { request } = useAdmin();
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(Object.entries(params).filter((entry): entry is [string, string] => Boolean(entry[1]))).toString();

  const load = useCallback(
    async (offset: number, signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const qs = new URLSearchParams(query);
        qs.set('limit', String(PAGE_SIZE));
        qs.set('offset', String(offset));
        const data = await request<Paginated<T>>(`${endpoint}?${qs}`, { signal });
        setItems((prev) => (offset === 0 ? data.items : [...prev, ...data.items]));
        setTotal(data.total);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setError(errorMessage(err));
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [endpoint, query, request],
  );

  useEffect(() => {
    const controller = new AbortController();
    void load(0, controller.signal);
    return () => controller.abort();
  }, [load]);

  return {
    items,
    setItems,
    total,
    setTotal,
    loading,
    error,
    reload: () => load(0),
    loadMore: () => load(items.length),
  };
}

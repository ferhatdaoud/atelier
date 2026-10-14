// Thin fetch wrapper for the Express backend (backend/).
// In dev, Vite proxies /api to the backend, so the default empty base URL works.
// Set VITE_API_URL only if the API is hosted on a different origin.
const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
}

export async function api<T = void>(path: string, { method = 'GET', body, signal }: RequestOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api${path}`, {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal,
    });
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    throw new ApiError(0, 'Could not reach the server. Please check your connection and try again.');
  }

  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const fallback = res.status >= 500 ? 'The server is unavailable right now. Please try again later.' : `Request failed (${res.status}).`;
    throw new ApiError(res.status, data?.error ?? fallback);
  }
  return data as T;
}

export function errorMessage(err: unknown) {
  return err instanceof Error ? err.message : 'Something went wrong. Please try again.';
}

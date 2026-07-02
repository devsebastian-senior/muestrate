/**
 * Cliente del backend API (server-side). Adjunta el token de Supabase del usuario
 * en las rutas privadas. Si no hay NEXT_PUBLIC_API_URL, la capa de datos cae a demo.
 */
import { createSupabaseServer } from "@/lib/auth/server";

const API = process.env.NEXT_PUBLIC_API_URL;

export const apiEnabled = () => Boolean(API);

async function authHeaders(): Promise<Record<string, string>> {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {};
  } catch {
    return {};
  }
}

/** GET al API. `auth:true` adjunta el Bearer del usuario. Devuelve null si falla.
 *  Timeout (8s) para no acumular peticiones colgadas bajo carga. */
export async function apiGet<T>(path: string, opts: { auth?: boolean } = {}): Promise<T | null> {
  if (!API) return null;
  const headers = opts.auth ? await authHeaders() : {};
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`${API}${path}`, { headers, cache: "no-store", signal: ctrl.signal });
    if (!res.ok) return null; // incluye 429 (rate limit) → la pantalla cae a su estado vacío
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

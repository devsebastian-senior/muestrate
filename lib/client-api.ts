"use client";

/**
 * Llamadas al backend desde componentes cliente (con el token de Supabase).
 * En preview o sin API, no-op local (la UI ya refleja el cambio en su estado).
 */
import { createSupabaseBrowser } from "@/lib/auth/client";

const API = process.env.NEXT_PUBLIC_API_URL;
const preview = () => process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";

async function token() {
  try {
    const { data } = await createSupabaseBrowser().auth.getSession();
    return data.session?.access_token;
  } catch {
    return undefined;
  }
}

export async function apiPatch(path: string, body: unknown): Promise<{ ok: boolean }> {
  if (!API || preview()) return { ok: true }; // demo/preview: cambio solo local
  const t = await token();
  try {
    const res = await fetch(`${API}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) },
      body: JSON.stringify(body),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

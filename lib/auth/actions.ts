"use client";

/**
 * Acciones de autenticación del lado cliente (usan el browser client de Supabase).
 * Todas comprueban si Supabase está configurado; si no (modo demo), devuelven
 * un error claro en vez de fallar feo.
 */
import { createSupabaseBrowser } from "@/lib/auth/client";

const DEMO_MSG = "Auth en modo demo: conecta Supabase (NEXT_PUBLIC_SUPABASE_URL) para activarla.";

function configured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** true cuando NO hay Supabase (modo demo). Las pantallas lo usan para que los
 *  botones entren directo a la plataforma y poder recorrer todo el flujo. */
export function authDemo() {
  return !configured();
}

function redirectUrl(next = "/dashboard") {
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

export async function signInWithMagicLink(email: string, next?: string) {
  if (!configured()) return { error: DEMO_MSG };
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl(next) },
  });
  return { error: error?.message ?? null };
}

export async function signUpWithPassword(params: {
  email: string;
  password: string;
  fullName: string;
}) {
  if (!configured()) return { error: DEMO_MSG };
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: { full_name: params.fullName },
      emailRedirectTo: redirectUrl(),
    },
  });
  return { error: error?.message ?? null };
}

export async function signInWithPassword(email: string, password: string) {
  if (!configured()) return { error: DEMO_MSG };
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error: error?.message ?? null };
}

export async function signInWithGoogle(next?: string) {
  if (!configured()) return { error: DEMO_MSG };
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: redirectUrl(next) },
  });
  return { error: error?.message ?? null };
}

export async function requestPasswordReset(email: string) {
  if (!configured()) return { error: DEMO_MSG };
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/restablecer`,
  });
  return { error: error?.message ?? null };
}

export async function updateProfile(params: { fullName?: string; avatarUrl?: string }) {
  if (!configured()) return { error: DEMO_MSG };
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.auth.updateUser({
    data: { full_name: params.fullName, avatar_url: params.avatarUrl },
  });
  return { error: error?.message ?? null };
}

export async function updatePassword(newPassword: string) {
  if (!configured()) return { error: DEMO_MSG };
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  return { error: error?.message ?? null };
}

export async function signOut() {
  if (configured()) {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
  }
  window.location.href = "/";
}

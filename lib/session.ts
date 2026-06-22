/**
 * Usuario de sesión (lado servidor). Devuelve el usuario real de Supabase o,
 * sin Supabase configurado, un usuario demo para poder ver la UX de cuenta.
 *
 * Tipos/utilidades client-safe viven en lib/user.ts (no importar este módulo
 * desde componentes cliente: usa next/headers vía auth/server).
 */
import { getCurrentUser } from "@/lib/auth/server";
import { supabaseConfigured } from "@/lib/demo";
import { apiGet } from "@/lib/api";
import { DEMO_USER, type AppUser } from "@/lib/user";

export type { AppUser } from "@/lib/user";
export { DEMO_USER, initials } from "@/lib/user";

export async function getSessionUser(): Promise<AppUser> {
  if (!supabaseConfigured()) return DEMO_USER;

  const user = await getCurrentUser();
  if (!user) return DEMO_USER; // el middleware ya protege; fallback defensivo

  // Perfil (nombre, avatar, rol) desde el backend API.
  const profile = await apiGet<AppUser>("/me/profile", { auth: true });

  return {
    id: user.id,
    email: profile?.email ?? user.email ?? "",
    name: profile?.name ?? user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Alumno",
    avatarUrl: profile?.avatarUrl ?? user.user_metadata?.avatar_url ?? null,
    isAdmin: profile?.isAdmin ?? false,
    hasAccess: profile?.hasAccess ?? false,
  };
}

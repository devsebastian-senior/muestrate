/**
 * Usuario de sesión (lado servidor). Devuelve el usuario real de Supabase o,
 * en modo demo (sin servicios conectados), un usuario de ejemplo para poder ver
 * toda la UX de cuenta sin credenciales.
 *
 * Tipos/utilidades client-safe viven en lib/user.ts (no importar este módulo
 * desde componentes cliente: usa next/headers vía auth/server).
 */
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/server";
import { isDemoMode } from "@/lib/demo";
import { DEMO_USER, type AppUser } from "@/lib/user";

export type { AppUser } from "@/lib/user";
export { DEMO_USER, initials } from "@/lib/user";

export async function getSessionUser(): Promise<AppUser> {
  if (isDemoMode()) return DEMO_USER;

  const user = await getCurrentUser();
  if (!user) return DEMO_USER; // el middleware ya protege; fallback defensivo

  let isAdmin = false;
  try {
    const { db } = await import("@/lib/db");
    const { profiles } = await import("@/lib/db/schema");
    const rows = await db
      .select({ isAdmin: profiles.isAdmin })
      .from(profiles)
      .where(eq(profiles.id, user.id))
      .limit(1);
    isAdmin = rows[0]?.isAdmin ?? false;
  } catch {
    // sin DB todavía
  }

  return {
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Alumno",
    avatarUrl: user.user_metadata?.avatar_url ?? null,
    isAdmin,
  };
}

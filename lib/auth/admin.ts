/**
 * Cliente Supabase con SERVICE ROLE. SOLO server (webhooks, jobs).
 * Nunca importar desde código de cliente: la service key puede todo.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";

export function createSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase admin no configurado (URL / SERVICE_ROLE_KEY).");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Garantiza que existe un usuario para este email y devuelve su id.
 * Crea el auth user (confirmado) y su profile si no existían. Idempotente.
 */
export async function ensureUserByEmail(email: string, fullName?: string): Promise<string> {
  const admin = createSupabaseAdmin();

  // ¿Ya tenemos profile con ese email? (camino rápido)
  const existing = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.email, email))
    .limit(1);
  if (existing[0]) return existing[0].id;

  // Crea el usuario en Supabase Auth (email ya confirmado: pagó, es legítimo).
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  let userId = data?.user?.id;

  // Si ya existía en Auth pero no teníamos profile, recupéralo.
  if (error || !userId) {
    const { data: list } = await admin.auth.admin.listUsers();
    userId = list?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;
    if (!userId) throw new Error(`No se pudo crear/encontrar usuario para ${email}`);
  }

  await db
    .insert(profiles)
    .values({ id: userId, email, fullName })
    .onConflictDoNothing();

  return userId;
}

/** Genera un magic link para entrar sin contraseña (acceso post-pago). */
export async function generateMagicLink(email: string, redirectTo: string): Promise<string> {
  const admin = createSupabaseAdmin();
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo },
  });
  if (error || !data?.properties?.action_link) {
    throw new Error(`No se pudo generar magic link: ${error?.message}`);
  }
  return data.properties.action_link;
}

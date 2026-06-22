/**
 * Flags del frontend.
 * - isDemoMode: sin backend API conectado → la capa de datos devuelve demo.
 * - supabaseConfigured: hay Supabase → auth real (login/registro/Google funcionan).
 */
export const isDemoMode = () => !process.env.NEXT_PUBLIC_API_URL;

export const supabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

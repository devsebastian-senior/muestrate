/**
 * Flags del frontend.
 * - isDemoMode: sin backend API conectado → la capa de datos devuelve demo.
 * - supabaseConfigured: hay Supabase → auth real (login/registro/Google).
 * - previewMode: NEXT_PUBLIC_PREVIEW_MODE=true → recorrer TODAS las pantallas
 *   solo con botones (sin login, sin compra, sin validar campos). Para producción
 *   poner en false y se reactiva toda la protección.
 */
export const isDemoMode = () => !process.env.NEXT_PUBLIC_API_URL;

export const supabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const previewMode = () => process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";

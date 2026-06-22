import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/auth/server";

/**
 * Callback del magic link / OTP. Supabase redirige aquí con ?code=…
 * Intercambiamos el código por sesión y mandamos al destino (?next o /dashboard).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    try {
      const supabase = await createSupabaseServer();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    } catch {
      // cae al error de abajo
    }
  }

  return NextResponse.redirect(`${origin}/acccesomuestrate?error=enlace_invalido`);
}

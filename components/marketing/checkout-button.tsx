"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Botón de compra. Llama a /api/checkout y redirige a la pasarela.
 * En Fase 0 (sin Stripe configurado) muestra el error de forma controlada.
 */
export function CheckoutButton({
  courseSlug,
  children,
  ...props
}: { courseSlug: string } & ButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    // Modo demo (sin Stripe): simula el pago y muestra el flujo post-compra.
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      window.location.href = "/gracias";
      return;
    }
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "No se pudo iniciar el pago");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={go} disabled={loading} {...props}>
        {loading ? <Loader2 className="animate-spin" /> : null}
        {children}
      </Button>
      {error ? <p className="text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
    </div>
  );
}

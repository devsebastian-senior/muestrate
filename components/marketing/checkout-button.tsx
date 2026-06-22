"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * Botón de compra. Llama al backend API (/checkout) y redirige a la pasarela.
 * Sin API configurada → simula el flujo post-compra (/gracias).
 */
export function CheckoutButton({
  courseSlug,
  children,
  ...props
}: { courseSlug: string } & ButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API = process.env.NEXT_PUBLIC_API_URL;

  async function go() {
    setLoading(true);
    setError(null);
    // Sin backend: simula el pago y muestra el flujo post-compra.
    if (!API) {
      window.location.href = "/gracias";
      return;
    }
    try {
      const res = await fetch(`${API}/checkout`, {
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

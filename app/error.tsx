"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: enviar a un servicio de errores (Sentry/PostHog) en producción.
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--color-fuchsia)]/15 text-[var(--color-fuchsia)]">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">Algo salió mal</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Ocurrió un error inesperado. Inténtalo de nuevo.
        </p>
        <div className="mt-8">
          <Button onClick={reset}>
            <RotateCw className="size-4" /> Reintentar
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { updatePassword } from "@/lib/auth/actions";

export default function RestablecerPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) return setError("Mínimo 6 caracteres.");
    if (password !== confirm) return setError("Las contraseñas no coinciden.");
    setStatus("loading");
    setError(null);
    const { error } = await updatePassword(password);
    if (error) {
      setError(error);
      setStatus("idle");
    } else {
      setStatus("done");
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    }
  }

  return (
    <AuthShell title="Nueva contraseña" subtitle="Crea una contraseña segura">
      {status === "done" ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-[var(--color-lime)]" />
          <p className="mt-3 text-sm">Contraseña actualizada. Entrando…</p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <Label>Nueva contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label>Confirmar contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
              <Input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
            {status === "loading" ? <Loader2 className="animate-spin" /> : null}
            Guardar contraseña
          </Button>
          {error ? <p className="text-center text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
        </form>
      )}
    </AuthShell>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { requestPasswordReset } from "@/lib/auth/actions";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const { error } = await requestPasswordReset(email);
    if (error) {
      setError(error);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

  return (
    <AuthShell
      title="Recuperar contraseña"
      subtitle="Te enviamos un enlace para crear una nueva"
      footer={
        <Link href="/acccesomuestrate" className="font-medium text-[var(--color-fg)] hover:underline">
          Volver a iniciar sesión
        </Link>
      }
    >
      {status === "sent" ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-[var(--color-lime)]" />
          <p className="mt-3 text-sm">
            Si <span className="font-medium">{email}</span> tiene cuenta, recibirás un enlace.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
            {status === "loading" ? <Loader2 className="animate-spin" /> : null}
            Enviar enlace <ArrowRight className="size-4" />
          </Button>
          {error ? <p className="text-center text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
        </form>
      )}
    </AuthShell>
  );
}

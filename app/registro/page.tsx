"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { AuthShell, OrDivider } from "@/components/auth/auth-shell";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { signUpWithPassword } from "@/lib/auth/actions";

export default function RegistroPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    setStatus("loading");
    setError(null);
    const { error } = await signUpWithPassword({ fullName, email, password });
    if (error) {
      setError(error);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle="Empieza a aprender en minutos"
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/acceso" className="font-medium text-[var(--color-fg)] hover:underline">
            Iniciar sesión
          </Link>
        </>
      }
    >
      {status === "sent" ? (
        <div className="py-8 text-center">
          <CheckCircle2 className="mx-auto size-12 text-[var(--color-lime)]" />
          <h2 className="mt-4 text-lg font-semibold">Confirma tu correo</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Enviamos un enlace de verificación a <span className="text-[var(--color-fg)]">{email}</span>.
          </p>
        </div>
      ) : (
        <div className="mt-7">
          <GoogleButton label="Registrarme con Google" />
          <OrDivider />
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
                <Input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre"
                  className="pl-10"
                />
              </div>
            </div>
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
            <div>
              <Label>Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
              {status === "loading" ? <Loader2 className="animate-spin" /> : null}
              Crear cuenta <ArrowRight className="size-4" />
            </Button>
            {error ? <p className="text-center text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
          </form>
        </div>
      )}
    </AuthShell>
  );
}

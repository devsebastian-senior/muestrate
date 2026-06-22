"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { AuthShell, OrDivider } from "@/components/auth/auth-shell";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { signInWithPassword, signInWithMagicLink, authDemo } from "@/lib/auth/actions";

export default function AccesoPage() {
  return (
    <AuthShell
      title="Entra a tu curso"
      subtitle="Bienvenido de vuelta"
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="font-medium text-[var(--color-fg)] hover:underline">
            Crear cuenta
          </Link>
        </>
      }
    >
      <div className="mt-7">
        <GoogleButton />
        <OrDivider />

        <Tabs defaultValue="password">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="password">Contraseña</TabsTrigger>
              <TabsTrigger value="magic">Enlace mágico</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="password">
            <PasswordForm />
          </TabsContent>
          <TabsContent value="magic">
            <MagicForm />
          </TabsContent>
        </Tabs>
      </div>
    </AuthShell>
  );
}

function PasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (authDemo()) return void (window.location.href = "/dashboard");
    setLoading(true);
    setError(null);
    const { error } = await signInWithPassword(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
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
        <div className="mb-1.5 flex items-center justify-between">
          <Label className="mb-0">Contraseña</Label>
          <Link href="/recuperar" className="text-xs text-[var(--color-cyan)] hover:underline">
            ¿Olvidaste?
          </Link>
        </div>
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
      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? <Loader2 className="animate-spin" /> : null}
        Entrar <ArrowRight className="size-4" />
      </Button>
      {error ? <p className="text-center text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
    </form>
  );
}

function MagicForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (authDemo()) return void (window.location.href = "/dashboard");
    setStatus("loading");
    setError(null);
    const { error } = await signInWithMagicLink(email);
    if (error) {
      setError(error);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-4 text-center">
        <CheckCircle2 className="mx-auto size-10 text-[var(--color-lime)]" />
        <p className="mt-3 text-sm">
          Enlace enviado a <span className="font-medium">{email}</span>. Revisa tu correo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
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
        Enviar enlace mágico <ArrowRight className="size-4" />
      </Button>
      {error ? <p className="text-center text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
    </form>
  );
}

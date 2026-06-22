import Link from "next/link";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "¡Gracias por tu compra!" };

export default function GraciasPage() {
  return (
    <section className="mx-auto grid min-h-dvh max-w-xl place-items-center px-6 py-32">
      <Card className="w-full p-10 text-center">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-gradient-to-br from-[var(--color-lime)]/20 to-[var(--color-cyan)]/20 text-[var(--color-lime)] ring-1 ring-[var(--color-border)]">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="text-3xl font-bold">¡Pago confirmado! 🎉</h1>
        <p className="mt-3 text-[var(--color-muted)]">
          Tu acceso al curso ya está activo. Te enviamos el enlace de entrada por:
        </p>

        <div className="mt-6 flex flex-col gap-3 text-left text-sm">
          <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] glass p-3">
            <Mail className="size-5 text-[var(--color-cyan)]" /> Tu correo electrónico
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] glass p-3">
            <MessageCircle className="size-5 text-[var(--color-lime)]" /> WhatsApp (en breve)
          </div>
        </div>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/acccesomuestrate">Ir a iniciar sesión</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)]">
          ¿No te llegó? Revisa spam o escríbenos por WhatsApp.
        </p>
      </Card>
    </section>
  );
}

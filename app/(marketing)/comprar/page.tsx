import Link from "next/link";
import { Check, ShieldCheck, Lock, CreditCard, ArrowLeft, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CheckoutButton } from "@/components/marketing/checkout-button";

export const metadata = { title: "Finalizar compra" };

const COURSE_SLUG = "muestrate-fundamentos";

const INCLUDES = [
  "37 lecciones en video HD",
  "Plantillas y checklists descargables",
  "Acceso a la comunidad privada",
  "Actualizaciones futuras gratis",
];

const BONUSES = [
  { title: "Plantillas de contenido viral", value: "$197" },
  { title: "Mini-curso de edición móvil", value: "$147" },
  { title: "Q&A mensual en vivo", value: "$297" },
];

export default function ComprarPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40">
      <Link
        href="/#precio"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
      >
        <ArrowLeft className="size-4" /> Volver
      </Link>

      <h1 className="mt-6 text-4xl font-bold tracking-tight">Finaliza tu compra</h1>
      <p className="mt-2 text-[var(--color-muted)]">A un paso de empezar a mostrarte.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Resumen del producto */}
        <Card className="p-7">
          <h2 className="text-xl font-semibold">Muéstrate: Marca Personal de Alto Impacto</h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">De invisible a referente en 6 semanas</p>

          <div className="mt-6">
            <h3 className="text-sm font-medium">Incluye</h3>
            <ul className="mt-3 space-y-2.5">
              {INCLUDES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 shrink-0 text-[var(--color-lime)]" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-lime)]/5 p-5">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <Gift className="size-4 text-[var(--color-fuchsia)]" /> Bonos gratis hoy
            </h3>
            <ul className="mt-3 space-y-2">
              {BONUSES.map((b) => (
                <li key={b.title} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[var(--color-muted)]">
                    <Check className="size-3.5 text-[var(--color-lime)]" /> {b.title}
                  </span>
                  <span className="text-xs text-[var(--color-muted)] line-through">{b.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Resumen de pago */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-7">
            <h3 className="text-sm font-medium text-[var(--color-muted)]">Resumen</h3>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Curso</span>
                <span>$497</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Bonos</span>
                <span className="text-[var(--color-lime)]">Gratis</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Descuento lanzamiento</span>
                <span className="text-[var(--color-fuchsia)]">−$200</span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-[var(--color-border)] pt-4">
              <span className="font-medium">Total</span>
              <span className="text-3xl font-bold text-gradient">$297</span>
            </div>
            <p className="mt-1 text-right text-xs text-[var(--color-muted)]">USD · pago único</p>

            <div className="mt-6">
              <CheckoutButton courseSlug={COURSE_SLUG} size="lg" className="w-full">
                Pagar ahora
              </CheckoutButton>
            </div>

            <div className="mt-5 space-y-2 text-xs text-[var(--color-muted)]">
              <p className="flex items-center gap-2"><Lock className="size-3.5 text-[var(--color-lime)]" /> Pago cifrado y seguro</p>
              <p className="flex items-center gap-2"><CreditCard className="size-3.5 text-[var(--color-lime)]" /> Procesado por Stripe</p>
              <p className="flex items-center gap-2"><ShieldCheck className="size-3.5 text-[var(--color-lime)]" /> Garantía de 14 días</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

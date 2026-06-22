"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Gift,
  Target,
  User,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Logo } from "@/components/site/logo";
import { PaymentSection } from "@/components/marketing/payment-section";

const COURSE_SLUG = "muestrate-fundamentos";

const FOR_YOU = [
  "Tienes algo valioso que enseñar u ofrecer, pero nadie te conoce todavía.",
  "Publicas sin estrategia y no ves resultados.",
  "Quieres atraer clientes sin gastar en publicidad.",
  "Estás listo para mostrarte con confianza y método.",
];

const NOT_FOR_YOU = [
  "Buscas un truco mágico de la noche a la mañana.",
  "No estás dispuesto a aplicar lo que aprendes.",
];

const VALUE = [
  { label: "Curso completo · 37 lecciones HD", value: 497 },
  { label: "Plantillas de contenido viral", value: 197 },
  { label: "Mini-curso de edición móvil", value: 147 },
  { label: "Q&A mensual en vivo", value: 297 },
  { label: "Comunidad privada", value: 0, note: "incluido" },
];

const COUNTRIES = ["Colombia", "México", "Argentina", "Chile", "Perú", "España", "Estados Unidos", "Otro"];

const STEPS = ["¿Es para ti?", "Lo que recibes", "Tus datos", "Pago"];

export default function ComprarPage() {
  const [step, setStep] = useState(1);

  // Datos del comprador (con esto se crea la cuenta al pagar).
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Colombia");

  const totalValue = VALUE.reduce((n, v) => n + v.value, 0);

  function goToPayment(e: React.FormEvent) {
    e.preventDefault();
    setStep(4); // datos válidos (required) → paso de pago
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-12">
      <div className="mb-10 flex items-center justify-between">
        <Logo />
        <Link href="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]">
          ← Volver
        </Link>
      </div>

      {/* Stepper */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`grid size-8 place-items-center rounded-full text-sm font-bold transition-colors ${
                    done
                      ? "bg-[var(--color-lime)] text-black"
                      : active
                        ? "bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-fuchsia)] text-white"
                        : "bg-[var(--color-surface-2)] text-[var(--color-muted)]"
                  }`}
                >
                  {done ? <Check className="size-4" /> : n}
                </span>
                <span className={`hidden text-sm sm:block ${active ? "text-[var(--color-fg)]" : "text-[var(--color-muted)]"}`}>
                  {label}
                </span>
              </div>
              {n < STEPS.length ? <span className="h-px w-6 bg-[var(--color-border)]" /> : null}
            </div>
          );
        })}
      </div>

      {/* PASO 1 — ¿Es para ti? */}
      {step === 1 ? (
        <Card className="p-8">
          <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
            <Target className="size-5" />
            <h1 className="text-2xl font-bold text-[var(--color-fg)]">¿Por qué este curso es para ti?</h1>
          </div>
          <p className="mb-6 text-[var(--color-muted)]">
            Antes de pagar, asegúrate de que es para ti. Queremos alumnos que obtengan resultados.
          </p>

          <h3 className="mb-3 font-semibold text-[var(--color-lime)]">Es para ti si…</h3>
          <ul className="space-y-3">
            {FOR_YOU.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-lime)]" /> {f}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 mt-7 font-semibold text-[var(--color-fuchsia)]">No es para ti si…</h3>
          <ul className="space-y-3">
            {NOT_FOR_YOU.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
                <span className="mt-0.5 text-[var(--color-fuchsia)]">✕</span> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-end">
            <Button size="lg" onClick={() => setStep(2)}>
              Sí, es para mí <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      ) : null}

      {/* PASO 2 — Valor vs precio */}
      {step === 2 ? (
        <Card className="p-8">
          <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
            <Gift className="size-5" />
            <h1 className="text-2xl font-bold text-[var(--color-fg)]">Lo que recibes por tu inversión</h1>
          </div>

          <ul className="divide-y divide-[var(--color-border)]">
            {VALUE.map((v) => (
              <li key={v.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="flex items-center gap-3">
                  <Check className="size-4 shrink-0 text-[var(--color-lime)]" /> {v.label}
                </span>
                <span className="shrink-0 text-[var(--color-muted)]">
                  {v.note ?? `$${v.value}`}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] p-5">
            <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
              <span>Valor total</span>
              <span className="line-through">${totalValue}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-semibold">Hoy pagas</span>
              <span className="text-4xl font-bold text-gradient">$297</span>
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              Pago único · acceso de por vida · garantía de 14 días
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>
              <ArrowLeft className="size-4" /> Atrás
            </Button>
            <Button size="lg" onClick={() => setStep(3)}>
              Lo quiero <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      ) : null}

      {/* PASO 3 — Tus datos */}
      {step === 3 ? (
        <form onSubmit={goToPayment}>
          <Card className="p-8">
            <div className="mb-2 flex items-center gap-2 text-[var(--color-cyan)]">
              <User className="size-5" />
              <h1 className="text-2xl font-bold text-[var(--color-fg)]">Tus datos</h1>
            </div>
            <p className="mb-6 text-sm text-[var(--color-muted)]">
              Con estos datos creamos tu acceso al pagar. Te enviaremos el enlace de entrada por email y WhatsApp.
            </p>

            <div className="space-y-4">
              <div>
                <Label>Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
                  <Input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tu nombre" className="pl-10" />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
                  <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="pl-10" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
                    <Input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+57 300 000 0000" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label>País</Label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] pl-10 pr-3 text-sm outline-none focus:border-[var(--color-violet)]"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-baseline justify-between border-t border-[var(--color-border)] pt-5">
              <span className="font-medium">Total a pagar</span>
              <span className="text-3xl font-bold text-gradient">$297 USD</span>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                <ArrowLeft className="size-4" /> Atrás
              </Button>
              <Button type="submit" size="lg">
                Continuar al pago <ArrowRight className="size-4" />
              </Button>
            </div>
          </Card>
        </form>
      ) : null}

      {/* PASO 4 — Pago (campos de tarjeta embebidos) */}
      {step === 4 ? (
        <Card className="p-8">
          <div className="mb-2 flex items-center gap-2 text-[var(--color-cyan)]">
            <CreditCard className="size-5" />
            <h1 className="text-2xl font-bold text-[var(--color-fg)]">Pago</h1>
          </div>
          <p className="mb-6 text-sm text-[var(--color-muted)]">
            {fullName ? `${fullName}, ` : ""}completa el pago para recibir tu acceso al instante.
          </p>

          <div className="mb-6 flex items-baseline justify-between rounded-[var(--radius-xl)] border border-[var(--color-border)] p-4">
            <span className="text-sm">Muéstrate · acceso de por vida</span>
            <span className="text-2xl font-bold text-gradient">$297 USD</span>
          </div>

          <PaymentSection courseSlug={COURSE_SLUG} buyer={{ fullName, email, phone, country }} />

          <div className="mt-6">
            <Button type="button" variant="ghost" onClick={() => setStep(3)}>
              <ArrowLeft className="size-4" /> Atrás
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
const TOTAL = 7;

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

export default function ComprarPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const totalValue = VALUE.reduce((n, v) => n + v.value, 0);
  const next = () => setStep((s) => Math.min(s + 1, TOTAL));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const pct = Math.round((step / TOTAL) * 100);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-12">
      <div className="mb-8 flex items-center justify-between">
        <Logo />
        <Link href="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]">
          ← Salir
        </Link>
      </div>

      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-xs text-[var(--color-muted)]">
          <span>Paso {step} de {TOTAL}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* 1 — ¿Es para ti? */}
      {step === 1 ? (
        <Card className="p-8">
          <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
            <Target className="size-5" />
            <h1 className="text-2xl font-bold text-[var(--color-fg)]">¿Por qué este curso es para ti?</h1>
          </div>
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
            <Button size="lg" onClick={next}>
              Sí, es para mí <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      ) : null}

      {/* 2 — Valor */}
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
                <span className="shrink-0 text-[var(--color-muted)]">{v.note ?? `$${v.value}`}</span>
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
          </div>
          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={back}>
              <ArrowLeft className="size-4" /> Atrás
            </Button>
            <Button size="lg" onClick={next}>
              Lo quiero <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      ) : null}

      {/* 3 — Nombre */}
      {step === 3 ? (
        <FieldStep
          title="¿Cómo te llamas?"
          icon={User}
          value={fullName}
          onChange={setFullName}
          placeholder="Tu nombre completo"
          onNext={next}
          onBack={back}
        />
      ) : null}

      {/* 4 — Email */}
      {step === 4 ? (
        <FieldStep
          title="¿A qué correo enviamos tu acceso?"
          icon={Mail}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="tu@email.com"
          onNext={next}
          onBack={back}
        />
      ) : null}

      {/* 5 — WhatsApp */}
      {step === 5 ? (
        <FieldStep
          title="¿Tu WhatsApp?"
          subtitle="Te mandamos el enlace de acceso también por aquí."
          icon={Phone}
          value={phone}
          onChange={setPhone}
          placeholder="+57 300 000 0000"
          onNext={next}
          onBack={back}
        />
      ) : null}

      {/* 6 — País (auto-avanza al elegir) */}
      {step === 6 ? (
        <Card className="p-8">
          <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
            <Globe className="size-5" />
            <h1 className="text-2xl font-bold text-[var(--color-fg)]">¿Desde qué país?</h1>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {COUNTRIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCountry(c);
                  next();
                }}
                className={`rounded-xl border p-4 text-left text-sm transition-all hover:border-[var(--color-violet)] hover:bg-[var(--color-surface-2)] ${
                  country === c ? "border-[var(--color-violet)] bg-[var(--color-surface-2)]" : "border-[var(--color-border)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="ghost" onClick={back}>
              <ArrowLeft className="size-4" /> Atrás
            </Button>
          </div>
        </Card>
      ) : null}

      {/* 7 — Pago */}
      {step === 7 ? (
        <Card className="p-8">
          <div className="mb-2 flex items-center gap-2 text-[var(--color-cyan)]">
            <CreditCard className="size-5" />
            <h1 className="text-2xl font-bold text-[var(--color-fg)]">Pago</h1>
          </div>
          <p className="mb-6 text-sm text-[var(--color-muted)]">
            {fullName ? `${fullName.split(" ")[0]}, ` : ""}completa el pago para recibir tu acceso al instante.
          </p>
          <div className="mb-6 flex items-baseline justify-between rounded-[var(--radius-xl)] border border-[var(--color-border)] p-4">
            <span className="text-sm">Muéstrate · acceso de por vida</span>
            <span className="text-2xl font-bold text-gradient">$297 USD</span>
          </div>
          <PaymentSection courseSlug={COURSE_SLUG} buyer={{ fullName, email, phone, country }} />
          <div className="mt-6">
            <Button variant="ghost" onClick={back}>
              <ArrowLeft className="size-4" /> Atrás
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}

// Paso de un solo campo. Enter avanza si es válido. Autofocus al entrar.
function FieldStep({
  title,
  subtitle,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  onNext,
  onBack,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const preview = process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";
  const valid = type === "email" ? /.+@.+\..+/.test(value) : value.trim().length > 1;
  const canNext = valid || preview; // en preview se avanza sin llenar

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (canNext) onNext();
  }

  return (
    <Card className="p-8">
      <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
        <Icon className="size-5" />
        <h1 className="text-2xl font-bold text-[var(--color-fg)]">{title}</h1>
      </div>
      {subtitle ? <p className="-mt-4 mb-6 text-sm text-[var(--color-muted)]">{subtitle}</p> : null}
      <form onSubmit={submit}>
        <Label className="sr-only">{title}</Label>
        <Input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-14 text-lg"
        />
        <p className="mt-2 text-xs text-[var(--color-muted)]">Presiona Enter ↵ para continuar</p>
        <div className="mt-8 flex items-center justify-between">
          <Button type="button" variant="ghost" onClick={onBack}>
            <ArrowLeft className="size-4" /> Atrás
          </Button>
          <Button type="submit" size="lg" disabled={!canNext}>
            Continuar <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}

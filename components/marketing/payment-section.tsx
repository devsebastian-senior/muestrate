"use client";

import { useEffect, useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2, Lock, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export interface Buyer {
  fullName: string;
  email: string;
  phone: string;
  country: string;
}

const PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const API = process.env.NEXT_PUBLIC_API_URL;
let stripePromise: Promise<Stripe | null> | null = null;
function getStripe() {
  if (!stripePromise && PK) stripePromise = loadStripe(PK);
  return stripePromise;
}

export function PaymentSection({ courseSlug, buyer }: { courseSlug: string; buyer: Buyer }) {
  // Sin Stripe configurado → mock visual de los campos (demo).
  if (!PK || !API) return <MockCardForm />;
  return <RealPayment courseSlug={courseSlug} buyer={buyer} />;
}

// ── Stripe real (Payment Element embebido) ─────────────────────
function RealPayment({ courseSlug, buyer }: { courseSlug: string; buyer: Buyer }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseSlug, ...buyer }),
        });
        const data = await res.json();
        if (data.demo) setDemo(true);
        else if (data.clientSecret) setClientSecret(data.clientSecret);
        else setError(data.error ?? "No se pudo iniciar el pago");
      } catch {
        setError("No se pudo conectar con el servidor de pagos");
      }
    })();
  }, [courseSlug, buyer]);

  const options = useMemo(
    () =>
      clientSecret
        ? {
            clientSecret,
            appearance: {
              theme: "night" as const,
              variables: { colorPrimary: "#7c5cff", borderRadius: "12px" },
            },
          }
        : undefined,
    [clientSecret],
  );

  if (demo) return <MockCardForm />;
  if (error) return <p className="text-center text-sm text-[var(--color-fuchsia)]">{error}</p>;
  if (!clientSecret || !options) {
    return (
      <div className="grid place-items-center py-10">
        <Loader2 className="size-6 animate-spin text-[var(--color-violet)]" />
      </div>
    );
  }

  return (
    <Elements stripe={getStripe()} options={options}>
      <RealForm />
    </Elements>
  );
}

function RealForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/gracias` },
    });
    if (error) {
      setError(error.message ?? "El pago no se pudo completar");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <PaymentElement options={{ layout: "tabs" }} />
      <Button type="submit" size="lg" disabled={!stripe || loading} className="mt-6 w-full">
        {loading ? <Loader2 className="animate-spin" /> : <Lock className="size-4" />}
        Pagar $297 USD
      </Button>
      {error ? <p className="mt-2 text-center text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
      <TrustRow />
    </form>
  );
}

// ── Mock visual (demo, sin Stripe) ─────────────────────────────
function MockCardForm() {
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const brand = number.startsWith("4") ? "VISA" : /^5[1-5]/.test(number) ? "MC" : /^3[47]/.test(number) ? "AMEX" : "";

  function onNumber(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    setNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  }
  function onExp(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    setExp(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  }

  function pay(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = "/gracias";
  }

  return (
    <form onSubmit={pay}>
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium">
          <CreditCard className="size-4 text-[var(--color-cyan)]" /> Datos de la tarjeta
        </span>
        <span className="rounded-full bg-[var(--color-violet)]/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-violet)]">
          demo
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Número de tarjeta</Label>
          <div className="relative">
            <Input
              inputMode="numeric"
              value={number}
              onChange={(e) => onNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="pr-14"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-muted)]">
              {brand}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Vencimiento</Label>
            <Input value={exp} onChange={(e) => onExp(e.target.value)} placeholder="MM/AA" inputMode="numeric" />
          </div>
          <div>
            <Label>CVC</Label>
            <Input
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              inputMode="numeric"
            />
          </div>
        </div>
        <div>
          <Label>Nombre en la tarjeta</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Como aparece en la tarjeta" />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full">
        <Lock className="size-4" /> Pagar $297 USD
      </Button>
      <p className="mt-2 text-center text-[11px] text-[var(--color-muted)]">
        Modo demo: no se cobra. Con Stripe conectado, aquí va el Payment Element real (PCI).
      </p>
      <TrustRow />
    </form>
  );
}

function TrustRow() {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-[var(--color-muted)]">
      <span className="flex items-center gap-1.5">
        <Lock className="size-3.5 text-[var(--color-lime)]" /> Pago cifrado
      </span>
      <span className="flex items-center gap-1.5">
        <CreditCard className="size-3.5" /> Procesado por Stripe
      </span>
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="size-3.5 text-[var(--color-lime)]" /> Garantía 14 días
      </span>
    </div>
  );
}

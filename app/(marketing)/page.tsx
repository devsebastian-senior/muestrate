import Link from "next/link";
import {
  Sparkles,
  Play,
  ShieldCheck,
  Zap,
  Target,
  Users,
  TrendingUp,
  Video,
  Infinity as InfinityIcon,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/marketing/checkout-button";

const COURSE_SLUG = "muestrate-fundamentos";

const STATS = [
  { value: "+3.500", label: "alumnos" },
  { value: "4.9/5", label: "valoración" },
  { value: "6 sem", label: "para resultados" },
  { value: "∞", label: "acceso de por vida" },
];

const BENEFITS = [
  { icon: Target, title: "Posicionamiento claro", desc: "Define un mensaje que te hace inolvidable y atrae a tu cliente ideal." },
  { icon: Video, title: "Contenido que vende", desc: "Frameworks probados para crear videos y posts que convierten sin sonar vendedor." },
  { icon: TrendingUp, title: "Crecimiento real", desc: "Sistema de métricas para crecer con intención, no por suerte." },
  { icon: Zap, title: "Ejecución rápida", desc: "Plantillas y checklists listas para usar hoy mismo." },
  { icon: Users, title: "Comunidad", desc: "Acompañamiento y feedback de quienes ya lo están logrando." },
  { icon: ShieldCheck, title: "Sin riesgo", desc: "Garantía de 14 días. Si no es para ti, te devolvemos el 100%." },
];

const MODULES = [
  { n: "01", title: "Fundamentos y mentalidad", lessons: 5, desc: "La base mental y estratégica antes de publicar nada." },
  { n: "02", title: "Tu propuesta de valor", lessons: 6, desc: "El mensaje que te diferencia en un mercado saturado." },
  { n: "03", title: "Framework de contenido", lessons: 8, desc: "El sistema para crear contenido magnético en serie." },
  { n: "04", title: "Distribución y algoritmo", lessons: 7, desc: "Cómo llegar a más personas sin pagar publicidad." },
  { n: "05", title: "Monetización", lessons: 6, desc: "Convierte seguidores en clientes que pagan." },
  { n: "06", title: "Escala y sistemas", lessons: 5, desc: "Automatiza para crecer sin quemarte." },
];

const FAQ = [
  { q: "¿Necesito experiencia previa?", a: "No. El curso empieza desde cero y avanza paso a paso. Si ya tienes audiencia, te ayuda a monetizarla mejor." },
  { q: "¿Cuánto tiempo tengo acceso?", a: "Acceso de por vida, incluyendo todas las actualizaciones futuras del programa." },
  { q: "¿Cómo accedo después de pagar?", a: "Al confirmar el pago recibes acceso inmediato por email y WhatsApp con un enlace para entrar a la plataforma." },
  { q: "¿Hay garantía?", a: "Sí. 14 días de garantía total. Si no es para ti, escribes y te devolvemos el 100%." },
];

export default function LandingPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-36 text-center md:pt-44">
        <Reveal>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] glass px-4 py-1.5 text-xs font-medium text-[var(--color-muted)]">
            <Sparkles className="size-3.5 text-[var(--color-cyan)]" />
            Nuevo programa 2026 · Cupos limitados
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-7 max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            De invisible a <span className="text-gradient">referente</span> en tu nicho
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[var(--color-muted)] md:text-xl">
            El sistema completo para construir una marca personal magnética y convertir tu
            audiencia en clientes. Sin pagar publicidad, sin fórmulas vacías.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#precio">
                Quiero entrar al curso <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="#vsl">
                <Play className="size-4" /> Ver cómo funciona
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* VSL frame */}
        <Reveal delay={0.2}>
          <div
            id="vsl"
            className="group relative mx-auto mt-16 aspect-video w-full max-w-3xl overflow-hidden rounded-[var(--radius-2xl)] border-gradient glass glow"
          >
            <div className="absolute inset-0 grid place-items-center">
              <button className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-fuchsia)] text-white shadow-[0_0_50px_-8px_var(--color-fuchsia)] transition-transform duration-300 group-hover:scale-110">
                <Play className="size-8 translate-x-0.5" fill="currentColor" />
              </button>
            </div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Video de presentación (VSL)
            </span>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.25}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] glass md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-6">
                <div className="text-3xl font-bold text-gradient">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[var(--color-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── BENEFICIOS ───────────────────────────────────────── */}
      <section id="beneficios" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            Todo lo que necesitas para <span className="text-gradient">destacar</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            Un método, no un montón de tips sueltos. Cada módulo construye sobre el anterior.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <Card className="group h-full hover:-translate-y-1 hover:glow">
                <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)]/20 to-[var(--color-cyan)]/20 text-[var(--color-cyan)] ring-1 ring-[var(--color-border)]">
                  <b.icon className="size-6" />
                </div>
                <CardTitle>{b.title}</CardTitle>
                <CardDescription>{b.desc}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROGRAMA ─────────────────────────────────────────── */}
      <section id="programa" className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            El <span className="text-gradient">programa</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            6 módulos · 37 lecciones en video · plantillas descargables
          </p>
        </Reveal>

        <div className="mt-14 space-y-3">
          {MODULES.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.04}>
              <div className="group flex items-center gap-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] glass p-5 transition-all duration-300 hover:border-[var(--color-violet)]">
                <span className="font-mono text-2xl font-bold text-gradient">{m.n}</span>
                <div className="flex-1">
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">{m.desc}</p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-muted)] sm:block">
                  {m.lessons} lecciones
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRECIO / OFERTA ──────────────────────────────────── */}
      <section id="precio" className="mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <Card className="relative overflow-hidden p-8 text-center md:p-12">
            <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-[var(--color-violet)] opacity-30 blur-[100px]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-1.5 text-xs text-[var(--color-cyan)]">
                <Star className="size-3.5" fill="currentColor" /> Oferta de lanzamiento
              </span>

              <div className="mt-6 flex items-baseline justify-center gap-3">
                <span className="text-2xl text-[var(--color-muted)] line-through">$497</span>
                <span className="text-6xl font-bold text-gradient">$297</span>
                <span className="text-sm text-[var(--color-muted)]">USD</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">Pago único · acceso de por vida</p>

              <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
                {[
                  "37 lecciones en video HD",
                  "Plantillas y checklists descargables",
                  "Acceso a la comunidad privada",
                  "Actualizaciones futuras gratis",
                  "Garantía de 14 días",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 shrink-0 text-[var(--color-lime)]" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <CheckoutButton courseSlug={COURSE_SLUG} size="lg" className="w-full sm:w-auto">
                  Obtener acceso ahora <ArrowRight className="size-4" />
                </CheckoutButton>
              </div>

              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-[var(--color-muted)]">
                <InfinityIcon className="size-3.5" /> Acceso inmediato tras el pago · por email y WhatsApp
              </p>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            Preguntas <span className="text-gradient">frecuentes</span>
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] glass p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between font-medium marker:content-['']">
                  {f.q}
                  <span className="ml-4 text-[var(--color-muted)] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Tu audiencia te está <span className="text-gradient">esperando</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[var(--color-muted)]">
            Cada día que no te muestras es un cliente que se va con otro. Empieza hoy.
          </p>
          <div className="mt-9">
            <Button asChild size="lg">
              <Link href="#precio">
                Empezar ahora <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

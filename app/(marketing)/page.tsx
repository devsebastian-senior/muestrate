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
  X,
  Star,
  ArrowRight,
  Gift,
  Quote,
  BadgeCheck,
  Lock,
  CreditCard,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/marketing/countdown";

const STATS = [
  { value: "+3.500", label: "alumnos" },
  { value: "4.9/5", label: "valoración" },
  { value: "6 sem", label: "para resultados" },
  { value: "∞", label: "acceso de por vida" },
];

const PAIN = [
  "Publicas contenido y nadie reacciona.",
  "Sientes que tu trabajo es bueno, pero nadie te conoce.",
  "Ves a otros con menos talento crecer más rápido.",
  "No sabes qué publicar ni cuándo, vas a ciegas.",
  "Te da miedo mostrarte y sonar 'vendedor'.",
  "Tienes audiencia, pero no se convierte en clientes.",
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

const TESTIMONIALS = [
  { name: "María González", role: "Coach de bienestar", quote: "En 5 semanas pasé de 800 a 12.000 seguidores y cerré mis primeros 4 clientes high-ticket. El framework de contenido es oro.", rating: 5 },
  { name: "Carlos Ramírez", role: "Consultor financiero", quote: "Llevaba 2 años invisible. Apliqué el módulo de propuesta de valor y en un mes ya me llegaban mensajes pidiendo trabajar conmigo.", rating: 5 },
  { name: "Lucía Fernández", role: "Diseñadora freelance", quote: "Dejé de improvisar. Ahora tengo un sistema y publico con confianza. Tripliqué mis tarifas sin perder clientes.", rating: 5 },
  { name: "Diego Torres", role: "Agente inmobiliario", quote: "El mejor dinero que he invertido en mi marca. Recuperé la inversión con el primer cliente que llegó por Instagram.", rating: 5 },
];

const BONUSES = [
  { title: "Plantillas de contenido viral", value: "$197", desc: "30 estructuras listas para rellenar y publicar." },
  { title: "Mini-curso de edición móvil", value: "$147", desc: "Edita videos pro desde tu celular en minutos." },
  { title: "Sesión de preguntas en vivo", value: "$297", desc: "Acceso al Q&A mensual con feedback directo." },
];

const COMPARE = {
  sin: ["Publicas sin estrategia", "Creces por suerte", "Audiencia que no compra", "Comparas y te frustras"],
  con: ["Sistema paso a paso", "Crecimiento con intención", "Seguidores que se vuelven clientes", "Claridad y confianza"],
};

const FAQ = [
  { q: "¿Necesito experiencia previa?", a: "No. El curso empieza desde cero y avanza paso a paso. Si ya tienes audiencia, te ayuda a monetizarla mejor." },
  { q: "¿Cuánto tiempo tengo acceso?", a: "Acceso de por vida, incluyendo todas las actualizaciones futuras del programa." },
  { q: "¿Cómo accedo después de pagar?", a: "Al confirmar el pago recibes acceso inmediato por email y WhatsApp con un enlace para entrar a la plataforma." },
  { q: "¿Hay garantía?", a: "Sí. 14 días de garantía total. Si no es para ti, escribes y te devolvemos el 100%." },
  { q: "¿En cuánto tiempo veo resultados?", a: "La mayoría de alumnos ve tracción en las primeras 6 semanas aplicando el sistema de forma constante." },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="size-4" fill="currentColor" />
      ))}
    </div>
  );
}

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

        <Reveal delay={0.18}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-[var(--color-lime)]" /> Garantía 14 días</span>
            <span className="flex items-center gap-1.5"><Lock className="size-3.5 text-[var(--color-lime)]" /> Pago seguro</span>
            <span className="flex items-center gap-1.5"><Zap className="size-3.5 text-[var(--color-lime)]" /> Acceso inmediato</span>
          </div>
        </Reveal>

        {/* VSL frame */}
        <Reveal delay={0.2}>
          <div
            id="vsl"
            className="group relative mx-auto mt-14 aspect-video w-full max-w-3xl overflow-hidden rounded-[var(--radius-2xl)] border-gradient glass glow"
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

      {/* ── PROBLEMA / DOLOR ─────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            ¿Te suena <span className="text-gradient">esto</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            No es falta de talento. Es falta de un sistema.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PAIN.map((p, i) => (
            <Reveal key={p} delay={i * 0.04}>
              <div className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] glass p-5">
                <X className="mt-0.5 size-5 shrink-0 text-[var(--color-fuchsia)]" />
                <span className="text-sm text-[var(--color-fg)]">{p}</span>
              </div>
            </Reveal>
          ))}
        </div>
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

      {/* ── ANTES / DESPUÉS ──────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card className="h-full border-[var(--color-fuchsia)]/30">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-[var(--color-fuchsia)]">
                <X className="size-5" /> Sin Muéstrate
              </h3>
              <ul className="space-y-3">
                {COMPARE.sin.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                    <X className="size-4 shrink-0 text-[var(--color-fuchsia)]" /> {c}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full border-[var(--color-lime)]/30 glow">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-[var(--color-lime)]">
                <Check className="size-5" /> Con Muéstrate
              </h3>
              <ul className="space-y-3">
                {COMPARE.con.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 shrink-0 text-[var(--color-lime)]" /> {c}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
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

      {/* ── INSTRUCTOR / AUTORIDAD ───────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <Card className="grid items-center gap-8 p-8 md:grid-cols-[280px_1fr] md:p-12">
            <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-[var(--radius-2xl)] border-gradient md:w-full">
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--color-violet)]/30 to-[var(--color-cyan)]/20">
                <Users className="size-20 text-[var(--color-fg)]/30" />
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)]">
                Tu instructor
              </span>
              {/* TODO: reemplazar con los datos reales del creador del curso */}
              <h2 className="mt-2 text-3xl font-bold">[Nombre del creador]</h2>
              <p className="mt-4 text-[var(--color-muted)]">
                Más de [X] años ayudando a profesionales a construir marcas personales que generan
                ingresos. Ha trabajado con [logros / clientes] y enseñado a más de 3.500 alumnos el
                sistema exacto que vas a aprender aquí.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {["+3.500 alumnos", "4.9/5 valoración", "Método probado"].map((b) => (
                  <span key={b} className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 text-[var(--color-muted)]">
                    <BadgeCheck className="size-3.5 text-[var(--color-cyan)]" /> {b}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            Lo que dicen los <span className="text-gradient">alumnos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            Resultados reales de personas que decidieron mostrarse.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <Card className="h-full">
                <Quote className="size-7 text-[var(--color-violet)]" />
                <p className="mt-4 text-[var(--color-fg)]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-sm font-bold text-white">
                      {t.name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-[var(--color-muted)]">{t.role}</div>
                    </div>
                  </div>
                  <Stars n={t.rating} />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── BONOS ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">
            Además te llevas estos <span className="text-gradient">bonos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            Incluidos gratis si entras hoy · valor total <span className="text-[var(--color-fg)]">$641</span>
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {BONUSES.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <Card className="h-full">
                <div className="mb-4 flex items-center justify-between">
                  <Gift className="size-7 text-[var(--color-fuchsia)]" />
                  <span className="rounded-full bg-[var(--color-lime)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--color-lime)]">
                    valor {b.value}
                  </span>
                </div>
                <CardTitle>{b.title}</CardTitle>
                <CardDescription>{b.desc}</CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRECIO / OFERTA ──────────────────────────────────── */}
      <section id="precio" className="mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <div className="mb-8 flex justify-center">
            <Countdown />
          </div>
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
                  "3 bonos exclusivos (valor $641)",
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
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/comprar">
                    Obtener acceso ahora <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-[var(--color-muted)]">
                <span className="flex items-center gap-1.5"><CreditCard className="size-3.5" /> Pago seguro con Stripe</span>
                <span className="flex items-center gap-1.5"><InfinityIcon className="size-3.5" /> Acceso inmediato por email y WhatsApp</span>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* ── GARANTÍA ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <Reveal>
          <Card className="flex flex-col items-center gap-6 p-8 text-center md:flex-row md:text-left">
            <div className="grid size-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--color-lime)]/20 to-[var(--color-cyan)]/20 text-[var(--color-lime)] ring-1 ring-[var(--color-lime)]/30">
              <ShieldCheck className="size-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Garantía de 14 días sin riesgo</h3>
              <p className="mt-2 text-[var(--color-muted)]">
                Entra, mira los módulos, aplica el sistema. Si en 14 días sientes que no es para ti,
                escríbenos y te devolvemos el 100%. Sin preguntas, sin letra pequeña. El riesgo es nuestro.
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

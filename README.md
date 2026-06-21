# Muéstrate

Plataforma de cursos (estilo Skool) + funnel de ventas de alta conversión.
Una sola app Next.js: el funnel público y la plataforma privada comparten auth, DB y dominio.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| UI | Tailwind CSS v4 + Framer Motion · diseño futurista (glass, aurora, neón) |
| DB | Postgres (Supabase) + Drizzle ORM |
| Auth | Supabase Auth (magic link) |
| Video | Bunny Stream (URLs firmadas) — abstraído, migrable a Mux |
| Pago | Stripe (global) — abstraído, listo para Mercado Pago (LATAM) |
| Email | Resend |
| Hosting | Vercel |

## Arquitectura de carpetas

```
app/
  (marketing)/          → funnel público (landing, gracias)
  (app)/                → plataforma privada (dashboard, curso, lección, cuenta)
  acceso/               → login magic link
  auth/callback/        → intercambio de código de sesión
  api/
    checkout/           → crea sesión de pago
    webhooks/stripe/    → pago confirmado → concede acceso
lib/
  db/                   → schema Drizzle + cliente + seed
  payments/             → abstracción de pasarela (Stripe, MP)
  video/                → abstracción de video (Bunny, Mux)
  auth/                 → clientes Supabase + gate de entitlements
  email/                → emails transaccionales
components/
  site/                 → nav, footer, aurora, logo, reveal
  marketing/            → checkout button
  app/                  → sidebar, player de lección
  ui/                   → button, card
```

## El flujo crítico: pago → acceso

```
Funnel → Checkout (Stripe) → webhook "payment.succeeded"
  → registra order → crea usuario → concede entitlement
  → envía magic link por email (+ WhatsApp en Fase 3) → alumno entra
```

El acceso lo concede **el webhook del servidor**, nunca el navegador.
Los videos solo se sirven con **URL firmada** ligada a un entitlement activo.

## Setup

1. **Instala dependencias**
   ```bash
   npm install
   ```

2. **Variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   La app levanta sin credenciales (modo demo Fase 0). Conecta cada servicio cuando lo tengas:
   - **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `..._ANON_KEY`, `SERVICE_ROLE_KEY`, `DATABASE_URL`
   - **Stripe**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - **Bunny**: `BUNNY_STREAM_*`
   - **Resend**: `RESEND_API_KEY`

3. **Base de datos** (cuando tengas Supabase)
   ```bash
   npm run db:push     # crea las tablas
   npm run db:seed     # curso demo
   ```

4. **Dev**
   ```bash
   npm run dev
   ```

5. **Webhook de Stripe en local**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## Estado: Fase 0 (infraestructura)

- [x] Scaffold completo, diseño futurista, navegable en modo demo
- [x] Schema DB, abstracciones de pago/video, gate de acceso, webhook
- [ ] Conectar Supabase / Stripe / Bunny (cuentas del cliente)
- [ ] Subida de videos desde panel admin (Fase 1)
- [ ] WhatsApp Cloud API para entrega de acceso (Fase 3)
- [ ] PostHog + A/B testing del funnel (Fase 4)

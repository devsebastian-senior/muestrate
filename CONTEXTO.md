# 📘 Muéstrate — Documento maestro de contexto

> **Propósito:** memoria viva del proyecto. Quien lo lea (humano o IA) entiende qué es, cómo está armado, qué está hecho y qué falta — sin depender de conversaciones previas.
> **Última actualización:** 2026-06-22

---

## 1. Visión

Plataforma para **vender un curso online** (estilo Skool) con:
- Un **funnel de ventas** de alta conversión (landing → checkout paso a paso → pago).
- Una **plataforma de aprendizaje** (módulos, lecciones en video, progreso, certificado).
- La **cuenta del alumno se crea automáticamente al pagar** (no hay registro manual).
- **Acceso por entitlement**: solo quien pagó (o un admin) entra a las pantallas del curso.

---

## 2. Arquitectura general

Dos proyectos separados, cada uno su repo:

```
┌─────────────────────────┐        HTTPS / JWT        ┌──────────────────────────┐
│  muestrate (FRONTEND)   │  ───────────────────────► │ muestrate-api (BACKEND)  │
│  Next.js 15 · Vercel    │   fetch lib/data + Bearer │  Hono · Node             │
│  funnel + plataforma    │ ◄───────────────────────  │  lógica + datos          │
└─────────────────────────┘        JSON (VMs)         └────────────┬─────────────┘
            │                                                       │
            │ Auth (cookies, @supabase/ssr)                         │ Drizzle / REST
            ▼                                                       ▼
   ┌──────────────────┐                                  ┌────────────────────┐
   │ Supabase Auth    │ ◄──── verifica JWT (GoTrue) ──── │ Supabase Postgres  │
   └──────────────────┘                                  └────────────────────┘

   Pagos: Stripe (Payment Element embebido)   ·   Video: Bunny Stream (URLs firmadas)
   Email: Resend   ·   (futuro) WhatsApp Cloud API
```

**Regla de oro:** el frontend nunca toca la DB directo. Todo pasa por el backend (que usa `service_role` y respeta los entitlements). El frontend solo usa Supabase para **autenticación** (sesión por cookies).

---

## 3. Repositorios

| Proyecto | Carpeta local | Repo GitHub (SSH) | Rama |
|----------|---------------|-------------------|------|
| Frontend | `MyWorkSpace/muestrate` | `git@github.com:devsebastian-senior/muestrate.git` | `main` |
| Backend | `MyWorkSpace/muestrate-api` | `git@github.com:devsebastian-senior/backend-muestrate.git` | `main` |

> Pushes **siempre por SSH** (HTTPS/GCM roto en esta máquina).

---

## 4. Stack

**Frontend (`muestrate`)**
- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · Framer Motion · componentes propios (estilo shadcn) · lucide-react
- `@supabase/ssr` (auth por cookies)
- `@stripe/stripe-js` + `@stripe/react-stripe-js` v3 (Payment Element embebido)

**Backend (`muestrate-api`)**
- Hono + `@hono/node-server` · TypeScript (ESM, imports con `.js`)
- Drizzle ORM + `postgres` (postgres.js) → Supabase pooler
- Zod · Stripe SDK · Resend · auth Supabase vía **GoTrue REST** (fetch, no `supabase-js`)

---

## 5. Estructura de carpetas (lo clave)

**Frontend**
```
app/
  (marketing)/        funnel PÚBLICO, sin navbar
    page.tsx          landing (dolor, valor, testimonios, bonos, precio, FAQ…)
    comprar/          checkout wizard Typeform (7 pasos)
    gracias/  terminos/  privacidad/
  (app)/              plataforma PRIVADA (gate de entitlement en layout.tsx)
    dashboard/  curso/[slug]/  leccion/[id]/  configuracion/  certificado/  admin/
  acccesomuestrate/   LOGIN (única ruta privada que es pública)
  registro/           → redirige a /comprar (sin auto-registro)
  recuperar/  restablecer/  verificar/   flujos de contraseña/email
  auth/callback/      intercambio de código de sesión Supabase
lib/
  data/               CONTRATO: funciones que consume la UI (fetch al API + fallback demo)
  api.ts              cliente del backend (adjunta Bearer de Supabase)
  session.ts          getSessionUser() (server) → /me/profile
  user.ts             AppUser + DEMO_USER (client-safe)
  auth/               clientes Supabase (server/browser) + actions
  demo.ts             isDemoMode() = !NEXT_PUBLIC_API_URL · supabaseConfigured()
components/
  site/ marketing/ app/ ui/ auth/
middleware.ts         protege rutas privadas (redirige al login si no hay sesión)
```

**Backend**
```
src/
  index.ts            app Hono + CORS + montaje de rutas
  env.ts              env + isDemoMode() + authEnabled()
  db/                 schema.ts (CANÓNICO) · index.ts (cliente lazy) · seed.ts
  lib/
    supabase.ts       getUserFromToken() + adminCreateUser() (GoTrue REST)
    payments.ts       Stripe: createCheckout / createPaymentIntent / parseStripeWebhook
    video.ts          Bunny: getSignedPlayback()
    email.ts          Resend: sendAccessEmail()
  services/
    access.ts         hasCourseAccess · grantCourseAccess · isAdmin · getProfile(hasAccess)
    queries.ts        getCourse / getDashboard / getLessonDetail / admin stats…
    users.ts          ensureProfileByEmail() (crea user al pagar)
    progress.ts       saveProgress / getNotes
  middleware/auth.ts  requireAuth · requireAdmin
  routes/             public · me · checkout · webhooks · admin
  scripts/test-user.ts  bootstrap de usuario de prueba
drizzle/0000_init.sql migración inicial (versionada)
```

---

## 6. Cómo correr en local

**Backend** (puerto **8787**)
```bash
cd muestrate-api
npm install
# .env ya configurado con Supabase (NO se commitea)
npm run dev
```

**Frontend** (puerto **3000**)
```bash
cd muestrate
npm install
# .env.local ya configurado (NO se commitea)
npm run dev
```

Orden: levantar **backend primero**, luego frontend. El front llama al back en `NEXT_PUBLIC_API_URL`.

---

## 7. Variables de entorno (NOMBRES — nunca commitear valores)

**Backend `muestrate-api/.env`**
```
PORT, CORS_ORIGIN
DATABASE_URL                  # Supabase pooler, puerto 6543, prepare:false
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET          # Fase 4 (vacías hoy)
BUNNY_STREAM_LIBRARY_ID, _API_KEY, _CDN_HOSTNAME, _TOKEN_AUTH_KEY   # Fase 5
RESEND_API_KEY, EMAIL_FROM    # Fase 6
APP_URL
```

**Frontend `muestrate/.env.local`**
```
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_URL                       # http://localhost:8787
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY        # Fase 4 (activa Payment Element real)
```

> Sin `DATABASE_URL` el backend corre en **modo demo** (datos de ejemplo). Sin `NEXT_PUBLIC_API_URL` el front corre en demo. Hoy ambos están conectados a Supabase real.

---

## 8. Modelo de datos (Postgres / Drizzle)

`schema.ts` (canónico en el backend; copia espejo en el front para tipos).

| Tabla | Rol |
|-------|-----|
| `profiles` | espejo de `auth.users` (id = uid). `is_admin`, `full_name`, `phone` |
| `courses` | curso (slug, título, precio, moneda, estado) |
| `modules` | módulos del curso (orden) |
| `lessons` | lecciones (video_id de Bunny, duración, `is_free_preview`) |
| `entitlements` | **gate de acceso**: (user, course) activo = puede ver el curso |
| `progress` | progreso por lección (posición, completado, notas) |
| `orders` | registro de pagos (provider, ref, monto, estado) |

**Trigger en Supabase:** `on_auth_user_created` crea la fila en `public.profiles` al registrarse un usuario. **RLS activado** en todas las tablas sin políticas públicas (solo el backend con `service_role` accede).

---

## 9. Contrato de datos (frontend ↔ backend)

El frontend consume **view-models** (`lib/data/types.ts`); el backend los produce. Endpoints:

| Endpoint | Auth | Lo consume |
|----------|------|-----------|
| `GET /courses/:slug` | público | landing/funnel |
| `POST /checkout` | público | Checkout redirect (Stripe hosted) |
| `POST /payment-intent` | público | Payment Element embebido |
| `POST /webhooks/stripe` | firma Stripe | concede acceso al pagar |
| `GET /me/profile` | Bearer | sesión (nombre, isAdmin, **hasAccess**) |
| `GET /me/dashboard` | Bearer | dashboard alumno |
| `GET /me/lessons/:id` (+notes, +progress) | Bearer | lección (video firmado si tiene acceso) |
| `GET /admin/{stats,students,orders,course}` · `POST /admin/videos` | admin | panel admin |

Header de rutas privadas: `Authorization: Bearer <access_token de Supabase>`.

---

## 10. Autenticación y protección de rutas

**Login:** `/acccesomuestrate` (magic link + email/contraseña + Google). Es la **única ruta privada que es pública**.

**Capas de protección:**
1. **Middleware (frontend):** rutas privadas sin sesión → redirige a `/acccesomuestrate?next=…`.
2. **`(app)/layout.tsx` (frontend):** exige **entitlement** — logueado sin compra (y no admin) → redirige a `/comprar`.
3. **`(app)/admin/layout.tsx`:** exige `isAdmin` → si no, a `/dashboard`.
4. **Backend (candado real):** `requireAuth` verifica el JWT; `requireAdmin` revisa `is_admin`; el **video solo se firma si `hasCourseAccess`**. Aunque alguien llame la API directo, sin entitlement no hay video.

**Rutas públicas:** `/` (landing), `/comprar`, `/gracias`, `/terminos`, `/privacidad`, `/acccesomuestrate`, recuperación de contraseña. Todo lo demás es privado.

---

## 11. Flujo del funnel (`/comprar` — wizard Typeform, 7 pasos)

Auto-avanza a medida que se ponen los datos:
1. **¿Es para ti?** (cualificación)
2. **Lo que recibes** (valor $1138 → hoy $297)
3. **Nombre** (Enter ↵ avanza)
4. **Email** (Enter ↵)
5. **WhatsApp** (Enter ↵)
6. **País** (clic auto-avanza)
7. **Pago** (campos de tarjeta embebidos)

Barra de progreso %. La landing no tiene navbar (cero distracciones).

---

## 12. Flujo de pago (Stripe) y creación de cuenta

```
Paso 7 del funnel
  → POST /payment-intent (nombre, email, teléfono, país, courseId)
  → backend crea PaymentIntent (metadata con los datos) → clientSecret
  → Stripe Payment Element (campos de tarjeta, PCI, en nuestra página)
  → confirmPayment → return_url /gracias
  → webhook payment_intent.succeeded
      → ensureProfileByEmail (crea usuario en Supabase con nombre/teléfono)
      → registra orden → grantCourseAccess (entitlement) → email de acceso
```

**Hoy (sin keys de Stripe):** demo → el botón lleva a `/gracias` y el Payment Element se muestra como **mock visual** (campos de tarjeta de ejemplo, no cobra). Se activa el cobro real al poner las keys (Fase 4).

> PCI: nunca recolectamos el número de tarjeta en inputs propios para cobros reales — eso lo maneja el Stripe Payment Element (iframe).

---

## 13. Inventario de pantallas

**Marketing/funnel:** landing · /comprar (wizard) · /gracias · /terminos · /privacidad
**Auth:** /acccesomuestrate (login) · /recuperar · /restablecer · /verificar · /registro (→/comprar)
**Alumno:** /dashboard · /curso/[slug] · /leccion/[id] (tabs Recursos/Notas/Transcripción) · /configuracion (Perfil/Seguridad/Notificaciones/Facturación) · /certificado
**Admin:** /admin (resumen) · /admin/contenido (editor + subir video) · /admin/alumnos · /admin/ventas · /admin/ajustes
**Sistema:** 404 · error boundary · loading

---

## 14. Usuarios de prueba (Supabase real)

| Email | Password | Rol |
|-------|----------|-----|
| `test@muestrate.com` | `Test1234!` | admin + acceso al curso |
| `sinacceso@test.com` | `Test1234!` | sin acceso (rebota a /comprar) |

`muestrate-api` → `npm run db:seed` carga el curso demo. `tsx --env-file=.env src/scripts/test-user.ts` crea/recupera el admin de prueba.

---

## 15. ✅ Hecho

- [x] **Fase 0 — Infra:** scaffold front + back, diseño futurista, schema DB, abstracciones pago/video/email, gate de acceso.
- [x] **Pantallas completas** (todas las del inventario), navegables.
- [x] **Backend Hono** con contrato `lib/data`, modo demo, deploy-ready.
- [x] **Supabase conectado:** migraciones aplicadas (`generate`+`migrate`), seed, trigger profiles, RLS.
- [x] **Auth real:** login (magic link + contraseña + Google) verificado end-to-end.
- [x] **Frontend ↔ API:** `lib/data` consume el backend con token; `getSessionUser` vía `/me/profile`.
- [x] **Funnel:** sin navbar · checkout wizard Typeform de 7 pasos con auto-avance.
- [x] **Pago embebido:** Stripe Payment Element (+ mock demo). Cuenta se crea al pagar.
- [x] **Protección total:** login renombrado a `/acccesomuestrate`; sin sesión → login; logueado sin compra → /comprar; admin gateado; video gateado por entitlement. Verificado en vivo.
- [x] Repos en GitHub (SSH), builds `exit 0`.

---

## 16. ⏳ Pendiente (priorizado)

1. **Fase 4 — Stripe real** *(decisión: hacerlo de último)*
   - Crear cuenta Stripe (test). Poner `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (back) y `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (front).
   - `stripe listen --forward-to localhost:8787/webhooks/stripe`.
   - Verificar: pago test → webhook → cuenta creada + acceso + email.
2. **Fase 5 — Video (Bunny Stream)**
   - Cuenta + Video Library + Token Authentication. Subir video desde /admin/contenido → guarda `video_id`. Lección sirve video firmado.
3. **Fase 6 — Email (Resend)**
   - Verificar dominio. `RESEND_API_KEY` + `EMAIL_FROM`. Email de acceso al pagar.
4. **Contenido real** del creador (instructor en landing es placeholder), buyer específico, videos, copys, testimonios reales.
5. **WhatsApp Cloud API** — entrega de acceso por WhatsApp.
6. **Analítica/conversión** — PostHog + Meta Pixel + A/B testing del funnel.
7. **Deploy** — backend (Railway/Render) + frontend (Vercel) + env vars + webhook Stripe prod + dominio/DNS + Supabase Site URL.
8. **Datos reales en listados admin** — `progressPct` por alumno (hoy 0), `conversionPct` (de PostHog).
9. **Server actions reales** en admin (course-settings, admin-editor) y persistencia de notas.

---

## 17. 🔒 Acciones de seguridad pendientes

- [ ] **Rotar `service_role` key** de Supabase (se expuso en chat durante el setup). Project Settings → API → roll.
- [ ] Revisar nombre del login: quedó `/acccesomuestrate` (tres "c"). Si fue typo, renombrar a `/accesomuestrate`.
- [ ] Antes de producción: endurecer `lib/env.ts` (requerir variables por capa), revisar CORS, rate-limiting en `/checkout` y `/payment-intent`.

---

## 18. ⚙️ Convenciones y gotchas (no tropezar otra vez)

- **Migraciones Drizzle:** usar `db:generate` + `db:migrate`. **NO** `db:push` (cuelga por prompt interactivo con `strict:true`).
- **Backend usa GoTrue REST, no `supabase-js`:** su `RealtimeClient` requiere `WebSocket` global, ausente en Node 20 → crashea. Por eso `lib/supabase.ts` usa `fetch`.
- **Stripe React SDK:** usar `@stripe/react-stripe-js` **v3** (soporta React 19). La v2 da ERESOLVE.
- **Imports backend:** ESM con extensión `.js` (`import x from "./y.js"`), aunque el archivo sea `.ts`.
- **DATABASE_URL:** pooler puerto **6543** + cliente con `prepare:false`. Password URL-encodeada si tiene símbolos.
- **Nunca commitear `.env` / `.env.local`** (ya en `.gitignore`). Verificar antes de cada push.
- **Build (front):** parar el dev server antes de `next build` (lock `EPERM` en `.next/trace`).
- **Push:** SSH siempre. Avisos LF→CRLF en Windows son inofensivos.
- **Modo demo:** front y back funcionan sin credenciales con datos de ejemplo — útil para desarrollar pantallas.

---

## 19. 🧠 Decisiones de arquitectura (el "por qué")

- **Dos repos** (front/back separados): decisión del dueño. El contrato es `lib/data` ↔ endpoints API.
- **Hono** en el backend: TS-first, ultraligero, deploy en cualquier runtime, poco boilerplate.
- **Payment Element embebido** (no checkout hosted): los campos de tarjeta viven en nuestra página (mejor marca/conversión), manteniendo PCI vía iframe de Stripe.
- **Cuenta creada al pagar:** menos fricción en el funnel; el alumno entra con magic link tras la compra.
- **`hasAccess` en el perfil:** una sola fuente de verdad para el gate de rutas, calculada en el backend.

---

## 20. 🛠️ Cheat sheet

```bash
# Backend
cd muestrate-api && npm run dev            # API en :8787
npm run db:generate && npm run db:migrate  # aplicar cambios de schema
npm run db:seed                            # curso demo
npm run typecheck

# Frontend
cd muestrate && npm run dev                # app en :3000
npm run build                              # parar dev antes

# Git (SSH)
git add -A && git commit -m "msg" && git push
```

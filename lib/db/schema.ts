/**
 * Esquema de base de datos — MUÉSTRATE (Postgres / Drizzle).
 *
 * Modelo MVP: catálogo de curso (course → modules → lessons),
 * acceso por entitlement (el gate de quién entra) y progreso del alumno.
 *
 * NOTA Supabase: la identidad la maneja `auth.users` (gestionado por Supabase).
 * `profiles.id` = el uuid de auth.users. No hay FK cross-schema aquí a propósito;
 * el vínculo se mantiene con un trigger en Supabase (ver lib/db/README o migración).
 */
import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// ── Enums ──────────────────────────────────────────────────────
export const courseStatus = pgEnum("course_status", ["draft", "published", "archived"]);
export const orderStatus = pgEnum("order_status", ["pending", "paid", "failed", "refunded"]);
export const entitlementStatus = pgEnum("entitlement_status", ["active", "revoked"]);
export const paymentProvider = pgEnum("payment_provider", ["stripe", "mercadopago", "manual"]);

// ── Profiles (espejo de auth.users) ────────────────────────────
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // = auth.users.id
  email: text("email").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  phone: text("phone"), // para acceso por WhatsApp (Fase 3)
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ── Courses ────────────────────────────────────────────────────
export const courses = pgTable(
  "courses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    description: text("description"),
    coverUrl: text("cover_url"),
    priceCents: integer("price_cents").notNull().default(0),
    currency: text("currency").notNull().default("USD"),
    status: courseStatus("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: uniqueIndex("courses_slug_idx").on(t.slug),
  }),
);

// ── Modules ────────────────────────────────────────────────────
export const modules = pgTable(
  "modules",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => ({
    courseIdx: index("modules_course_idx").on(t.courseId),
  }),
);

// ── Lessons ────────────────────────────────────────────────────
export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    // ID del video en el proveedor (Bunny GUID / Mux asset id).
    videoId: text("video_id"),
    durationSec: integer("duration_sec").notNull().default(0),
    sortOrder: integer("sort_order").notNull().default(0),
    // Lección de muestra gratis (sirve al funnel: dar a probar antes de pagar).
    isFreePreview: boolean("is_free_preview").notNull().default(false),
  },
  (t) => ({
    moduleIdx: index("lessons_module_idx").on(t.moduleId),
  }),
);

// ── Entitlements (gate de acceso) ──────────────────────────────
// Sin fila ACTIVE aquí, el usuario NO ve los videos. La crea el webhook de pago.
export const entitlements = pgTable(
  "entitlements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    status: entitlementStatus("status").notNull().default("active"),
    source: paymentProvider("source").notNull(),
    orderId: uuid("order_id").references(() => orders.id, { onDelete: "set null" }),
    grantedAt: timestamp("granted_at", { withTimezone: true }).notNull().defaultNow(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => ({
    userCourseIdx: uniqueIndex("entitlements_user_course_idx").on(t.userId, t.courseId),
  }),
);

// ── Progress ───────────────────────────────────────────────────
export const progress = pgTable(
  "progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    lastPositionSec: integer("last_position_sec").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userLessonIdx: uniqueIndex("progress_user_lesson_idx").on(t.userId, t.lessonId),
  }),
);

// ── Orders (registro de pagos) ─────────────────────────────────
export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => profiles.id, { onDelete: "set null" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "restrict" }),
    provider: paymentProvider("provider").notNull(),
    // Referencia del proveedor (Stripe session/payment_intent, MP payment id).
    providerRef: text("provider_ref").notNull(),
    amountCents: integer("amount_cents").notNull(),
    currency: text("currency").notNull().default("USD"),
    status: orderStatus("status").notNull().default("pending"),
    customerEmail: text("customer_email"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    providerRefIdx: uniqueIndex("orders_provider_ref_idx").on(t.provider, t.providerRef),
  }),
);

// ── Relaciones ─────────────────────────────────────────────────
export const coursesRelations = relations(courses, ({ many }) => ({
  modules: many(modules),
  entitlements: many(entitlements),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, { fields: [modules.courseId], references: [courses.id] }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
}));

export const entitlementsRelations = relations(entitlements, ({ one }) => ({
  user: one(profiles, { fields: [entitlements.userId], references: [profiles.id] }),
  course: one(courses, { fields: [entitlements.courseId], references: [courses.id] }),
  order: one(orders, { fields: [entitlements.orderId], references: [orders.id] }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(profiles, { fields: [progress.userId], references: [profiles.id] }),
  lesson: one(lessons, { fields: [progress.lessonId], references: [lessons.id] }),
}));

// ── Tipos inferidos ────────────────────────────────────────────
export type Profile = typeof profiles.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Entitlement = typeof entitlements.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type Order = typeof orders.$inferSelect;

/**
 * View-models que consumen las pantallas. Independientes de la fuente (demo o DB).
 * La capa de datos (lib/data) devuelve estos tipos; al integrar backend solo cambia
 * el cuerpo de cada función, no las pantallas ni estos tipos.
 */

export interface LessonVM {
  id: string;
  title: string;
  durationSec: number;
  completed: boolean;
  free: boolean;
  /** ID del video en el proveedor (Bunny GUID). null = sin subir. */
  videoId: string | null;
}

export interface ModuleVM {
  id: string;
  title: string;
  lessons: LessonVM[];
}

export interface CourseVM {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  priceCents: number;
  currency: string;
  status: "draft" | "published" | "archived";
  coverUrl: string | null;
  modules: ModuleVM[];
  /** Novedad activada por el admin (banner para alumnos). */
  newsActive: boolean;
  newsText: string | null;
}

export interface DashboardVM {
  course: CourseVM;
  progressPct: number;
  totalLessons: number;
  completedLessons: number;
  nextLessonId: string | null;
  streakDays: number;
}

export interface LessonDetailVM {
  lesson: LessonVM;
  courseSlug: string;
  index: number;
  total: number;
  prevId: string | null;
  nextId: string | null;
  /** URL embed firmada del video (null en demo / sin subir). */
  embedUrl: string | null;
  resources: { label: string; href: string; type: "pdf" | "link" | "zip" }[];
}

export interface StudentRow {
  id: string;
  name: string;
  email: string;
  progressPct: number;
  joinedAt: string; // ISO
  status: "active" | "revoked";
}

export interface OrderRow {
  id: string;
  customerEmail: string;
  amountCents: number;
  currency: string;
  provider: "stripe" | "mercadopago" | "manual";
  status: "paid" | "pending" | "refunded" | "failed";
  createdAt: string; // ISO
}

export interface BannerVM {
  id: string;
  title: string;
  text: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  active: boolean;
  sortOrder: number;
}

export interface AdminStats {
  students: number;
  revenueCents: number;
  lessons: number;
  conversionPct: number;
}

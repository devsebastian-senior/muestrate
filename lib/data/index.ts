/**
 * CAPA DE DATOS — punto único de integración con el backend.
 *
 * Hoy devuelve datos demo. Para conectar la DB, reemplaza el cuerpo de cada
 * función por la query real (Drizzle). Las pantallas NO cambian: consumen estos
 * view-models (lib/data/types). Cada función marca con `// TODO(db)` dónde va la query.
 */
import { apiEnabled, apiGet } from "@/lib/api";
import { previewMode } from "@/lib/demo";

/** Usar datos demo: sin API conectada, o en modo preview (recorrer sin backend). */
const apiActive = () => apiEnabled() && !previewMode();
import type {
  AdminStats,
  CourseVM,
  DashboardVM,
  LessonDetailVM,
  OrderRow,
  StudentRow,
} from "./types";

export * from "./types";

// ── Dataset demo ───────────────────────────────────────────────
const DEMO_COURSE: CourseVM = {
  id: "course-1",
  slug: "muestrate-fundamentos",
  title: "Muéstrate: Marca Personal de Alto Impacto",
  subtitle: "De invisible a referente en 6 semanas",
  description:
    "El sistema completo para construir una marca personal magnética y convertir tu audiencia en clientes.",
  priceCents: 29700,
  currency: "USD",
  status: "published",
  coverUrl: null,
  newsActive: true,
  newsText: "🎉 Nueva lección disponible: «El framework de contenido viral». ¡Ya puedes verla!",
  modules: [
    {
      id: "m1",
      title: "Fundamentos y mentalidad",
      lessons: [
        { id: "l1", title: "Bienvenida y mentalidad", durationSec: 420, completed: true, free: true, videoId: "demo" },
        { id: "l2", title: "Define tu propuesta de valor", durationSec: 780, completed: true, free: false, videoId: "demo" },
        { id: "l3", title: "Tu cliente ideal", durationSec: 610, completed: false, free: false, videoId: null },
      ],
    },
    {
      id: "m2",
      title: "Estrategia de contenido",
      lessons: [
        { id: "l4", title: "El framework de contenido viral", durationSec: 960, completed: false, free: false, videoId: null },
        { id: "l5", title: "Calendario de 30 días", durationSec: 540, completed: false, free: false, videoId: null },
      ],
    },
  ],
};

const DEMO_STUDENTS: StudentRow[] = [
  { id: "u1", name: "María González", email: "maria@email.com", progressPct: 78, joinedAt: "2026-05-02", status: "active" },
  { id: "u2", name: "Carlos Ramírez", email: "carlos@email.com", progressPct: 42, joinedAt: "2026-05-10", status: "active" },
  { id: "u3", name: "Lucía Fernández", email: "lucia@email.com", progressPct: 100, joinedAt: "2026-04-18", status: "active" },
  { id: "u4", name: "Diego Torres", email: "diego@email.com", progressPct: 12, joinedAt: "2026-06-01", status: "active" },
  { id: "u5", name: "Ana Martín", email: "ana@email.com", progressPct: 0, joinedAt: "2026-06-12", status: "revoked" },
];

const DEMO_ORDERS: OrderRow[] = [
  { id: "o1", customerEmail: "maria@email.com", amountCents: 29700, currency: "USD", provider: "stripe", status: "paid", createdAt: "2026-05-02" },
  { id: "o2", customerEmail: "carlos@email.com", amountCents: 29700, currency: "USD", provider: "stripe", status: "paid", createdAt: "2026-05-10" },
  { id: "o3", customerEmail: "lucia@email.com", amountCents: 19700, currency: "USD", provider: "mercadopago", status: "paid", createdAt: "2026-04-18" },
  { id: "o4", customerEmail: "diego@email.com", amountCents: 29700, currency: "USD", provider: "stripe", status: "paid", createdAt: "2026-06-01" },
  { id: "o5", customerEmail: "pedro@email.com", amountCents: 29700, currency: "USD", provider: "stripe", status: "refunded", createdAt: "2026-05-22" },
];

const DEMO_RESOURCES: LessonDetailVM["resources"] = [
  { label: "Workbook de la lección.pdf", href: "#", type: "pdf" },
  { label: "Plantilla de propuesta de valor", href: "#", type: "link" },
];

// ── Helpers ────────────────────────────────────────────────────
function allLessons(c: CourseVM) {
  return c.modules.flatMap((m) => m.lessons);
}

// ── Queries (alumno) ───────────────────────────────────────────

export async function getCourse(slug: string): Promise<CourseVM | null> {
  if (apiActive()) return apiGet<CourseVM>(`/courses/${slug}`);
  return slug === DEMO_COURSE.slug ? DEMO_COURSE : null;
}

export async function getDashboard(_userId: string): Promise<DashboardVM | null> {
  if (apiActive()) return apiGet<DashboardVM>(`/me/dashboard`, { auth: true });
  const course = DEMO_COURSE;
  const lessons = allLessons(course);
  const completed = lessons.filter((l) => l.completed).length;
  const next = lessons.find((l) => !l.completed) ?? null;
  return {
    course,
    totalLessons: lessons.length,
    completedLessons: completed,
    progressPct: Math.round((completed / lessons.length) * 100),
    nextLessonId: next?.id ?? null,
    streakDays: 3,
  };
}

export async function getLessonDetail(lessonId: string): Promise<LessonDetailVM | null> {
  if (apiActive()) return apiGet<LessonDetailVM>(`/me/lessons/${lessonId}`, { auth: true });

  const course = DEMO_COURSE;
  const lessons = allLessons(course);
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;
  const lesson = lessons[index];
  return {
    lesson,
    courseSlug: course.slug,
    index,
    total: lessons.length,
    prevId: lessons[index - 1]?.id ?? null,
    nextId: lessons[index + 1]?.id ?? null,
    embedUrl: null,
    resources: DEMO_RESOURCES,
  };
}

// ── Queries (admin) ────────────────────────────────────────────

export async function getCourseForAdmin(): Promise<CourseVM | null> {
  if (apiActive()) return apiGet<CourseVM>(`/admin/course`, { auth: true });
  return DEMO_COURSE;
}

export async function getAdminStats(): Promise<AdminStats> {
  if (apiActive()) {
    return (
      (await apiGet<AdminStats>(`/admin/stats`, { auth: true })) ?? {
        students: 0,
        revenueCents: 0,
        lessons: 0,
        conversionPct: 0,
      }
    );
  }
  const lessons = allLessons(DEMO_COURSE).length;
  return { students: 3512, revenueCents: 10400000, lessons, conversionPct: 4.8 };
}

export async function listStudents(): Promise<StudentRow[]> {
  if (apiActive()) return (await apiGet<StudentRow[]>(`/admin/students`, { auth: true })) ?? [];
  return DEMO_STUDENTS;
}

export async function listOrders(): Promise<OrderRow[]> {
  if (apiActive()) return (await apiGet<OrderRow[]>(`/admin/orders`, { auth: true })) ?? [];
  return DEMO_ORDERS;
}

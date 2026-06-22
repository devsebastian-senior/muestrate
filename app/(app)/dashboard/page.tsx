import Link from "next/link";
import { Play, GraduationCap, Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboard } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const metadata = { title: "Inicio" };

export default async function DashboardPage() {
  const user = await getSessionUser();
  const data = await getDashboard(user.id);

  if (!data) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Aún no tienes acceso al curso</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Cuando completes tu compra, tu curso aparecerá aquí.
        </p>
        <Button asChild className="mt-6">
          <Link href="/comprar">Ver el curso</Link>
        </Button>
      </div>
    );
  }

  const { course, totalLessons, completedLessons, progressPct, nextLessonId, streakDays } = data;
  const next = course.modules.flatMap((m) => m.lessons).find((l) => l.id === nextLessonId);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
      <p className="text-sm text-[var(--color-muted)]">Bienvenido de vuelta 👋</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">Tu aprendizaje</h1>

      {/* Continuar aprendiendo */}
      <Card className="mt-8 overflow-hidden p-0">
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          <div className="p-8">
            <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)]">
              Continúa donde lo dejaste
            </span>
            <h2 className="mt-2 text-2xl font-semibold">{course.title}</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{course.subtitle}</p>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
                <span>Progreso</span>
                <span>
                  {completedLessons}/{totalLessons} lecciones · {progressPct}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {next ? (
              <Button asChild size="lg" className="mt-7">
                <Link href={`/leccion/${next.id}`}>
                  <Play className="size-4" /> Continuar: {next.title}
                </Link>
              </Button>
            ) : null}
          </div>

          <div className="relative hidden bg-gradient-to-br from-[var(--color-violet)]/20 via-[var(--color-fuchsia)]/10 to-[var(--color-cyan)]/20 md:block">
            <div className="absolute inset-0 grid place-items-center">
              <GraduationCap className="size-24 text-[var(--color-fg)]/20" />
            </div>
          </div>
        </div>
      </Card>

      {/* Métricas */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: TrendingUp, label: "Progreso", value: `${progressPct}%` },
          { icon: GraduationCap, label: "Lecciones", value: `${completedLessons}/${totalLessons}` },
          { icon: Clock, label: "Racha", value: `${streakDays} días` },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4">
            <div className="grid size-11 place-items-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-cyan)]">
              <s.icon className="size-5" />
            </div>
            <div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-[var(--color-muted)]">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button asChild variant="glass">
          <Link href={`/curso/${course.slug}`}>Ver todo el programa</Link>
        </Button>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, CheckCircle2, Circle, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getCourse } from "@/lib/data";
import { formatDuration } from "@/lib/utils";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
      <span className="text-xs uppercase tracking-widest text-[var(--color-cyan)]">Programa</span>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{course.title}</h1>
      <p className="mt-2 text-[var(--color-muted)]">{course.subtitle}</p>

      <div className="mt-10 space-y-8">
        {course.modules.map((m, mi) => (
          <div key={m.id}>
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-sm text-gradient">
                Módulo {String(mi + 1).padStart(2, "0")}
              </span>
              <h2 className="text-lg font-semibold">{m.title}</h2>
            </div>

            <Card className="divide-y divide-[var(--color-border)] p-0">
              {m.lessons.map((l) => {
                const Inner = (
                  <div className="flex items-center gap-4 p-4 transition-colors hover:bg-[var(--color-surface-2)]">
                    {l.completed ? (
                      <CheckCircle2 className="size-5 shrink-0 text-[var(--color-lime)]" />
                    ) : (
                      <Circle className="size-5 shrink-0 text-[var(--color-muted)]" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium">{l.title}</div>
                      <div className="text-xs text-[var(--color-muted)]">
                        {formatDuration(l.durationSec)}
                        {l.free ? " · muestra gratis" : ""}
                        {!l.videoId ? " · video pendiente" : ""}
                      </div>
                    </div>
                    {l.videoId ? (
                      <Play className="size-4 text-[var(--color-muted)]" />
                    ) : (
                      <Lock className="size-4 text-[var(--color-muted)]" />
                    )}
                  </div>
                );
                return (
                  <Link key={l.id} href={`/leccion/${l.id}`}>
                    {Inner}
                  </Link>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

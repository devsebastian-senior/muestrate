import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { LessonPlayer } from "@/components/app/lesson-player";
import { LessonTabs } from "@/components/app/lesson-tabs";
import { Button } from "@/components/ui/button";
import { getLessonDetail } from "@/lib/data";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getLessonDetail(id);
  if (!detail) notFound();
  const { lesson, courseSlug, index, total, prevId, nextId, embedUrl, resources } = detail;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:py-12">
      <Link
        href={`/curso/${courseSlug}`}
        className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
      >
        <ArrowLeft className="size-4" /> Volver al programa
      </Link>

      <div className="mt-5">
        <LessonPlayer title={lesson.title} embedUrl={embedUrl ?? undefined} />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Lección {index + 1} de {total}
          </p>
        </div>
        <Button variant={lesson.completed ? "glass" : "primary"} size="sm">
          <CheckCircle2 className="size-4" />
          {lesson.completed ? "Completada" : "Marcar completada"}
        </Button>
      </div>

      <div className="mt-8">
        <LessonTabs resources={resources} />
      </div>

      {/* Navegación entre lecciones */}
      <div className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6">
        {prevId ? (
          <Button asChild variant="outline" size="sm">
            <Link href={`/leccion/${prevId}`}>
              <ArrowLeft className="size-4" /> Anterior
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {nextId ? (
          <Button asChild size="sm">
            <Link href={`/leccion/${nextId}`}>
              Siguiente <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

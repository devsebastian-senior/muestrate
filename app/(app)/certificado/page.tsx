import { Award, Sparkles } from "lucide-react";
import { PrintButton } from "@/components/app/print-button";
import { getDashboard } from "@/lib/data";
import { getSessionUser } from "@/lib/session";

export const metadata = { title: "Certificado" };

export default async function CertificadoPage() {
  const user = await getSessionUser();
  const { course, progressPct } = await getDashboard(user.id);
  const completed = progressPct >= 100;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tu certificado</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {completed
              ? "¡Completaste el curso! Descarga tu certificado."
              : `Completa el curso (${progressPct}%) para desbloquearlo.`}
          </p>
        </div>
        {completed ? <PrintButton>Descargar PDF</PrintButton> : null}
      </div>

      {/* Certificado */}
      <div
        className={`relative overflow-hidden rounded-[var(--radius-2xl)] border-gradient bg-[var(--color-surface)] p-10 text-center md:p-16 ${
          completed ? "" : "opacity-40 blur-[1px]"
        }`}
      >
        <div className="absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-[var(--color-violet)] opacity-20 blur-[100px]" />
        <div className="relative">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-white">
            <Award className="size-8" />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Certificado de finalización
          </p>
          <p className="mt-6 text-sm text-[var(--color-muted)]">Otorgado a</p>
          <h2 className="mt-2 text-4xl font-bold text-gradient">{user.name}</h2>
          <p className="mx-auto mt-6 max-w-md text-[var(--color-muted)]">
            Por completar exitosamente el programa
          </p>
          <p className="mt-1 text-lg font-semibold">{course.title}</p>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-[var(--color-muted)]">
            <Sparkles className="size-3.5 text-[var(--color-cyan)]" />
            Muéstrate · Marca Personal de Alto Impacto
          </div>
        </div>
      </div>
    </div>
  );
}

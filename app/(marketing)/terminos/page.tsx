export const metadata = { title: "Términos y condiciones" };

const SECTIONS = [
  {
    h: "1. Aceptación",
    p: "Al comprar o usar Muéstrate aceptas estos términos. Si no estás de acuerdo, no uses la plataforma.",
  },
  {
    h: "2. Acceso al curso",
    p: "El pago da acceso de por vida al curso adquirido, para uso personal e intransferible. No puedes compartir tu cuenta ni redistribuir el contenido.",
  },
  {
    h: "3. Pagos y reembolsos",
    p: "Los pagos se procesan mediante pasarelas seguras. Ofrecemos garantía de reembolso de 14 días desde la compra, sin preguntas.",
  },
  {
    h: "4. Propiedad intelectual",
    p: "Todo el contenido (videos, materiales, plantillas) es propiedad de Muéstrate y está protegido. Queda prohibida su copia o difusión.",
  },
  {
    h: "5. Uso aceptable",
    p: "No está permitido descargar, grabar ni revender el contenido. El incumplimiento puede causar la revocación del acceso sin reembolso.",
  },
  {
    h: "6. Cambios",
    p: "Podemos actualizar estos términos. Te notificaremos cambios relevantes por email.",
  },
];

export default function TerminosPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44">
      <h1 className="text-4xl font-bold tracking-tight">Términos y condiciones</h1>
      <p className="mt-3 text-sm text-[var(--color-muted)]">Última actualización: junio 2026</p>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-semibold">{s.h}</h2>
            <p className="mt-2 text-[var(--color-muted)]">{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

export const metadata = { title: "Política de privacidad" };

const SECTIONS = [
  {
    h: "1. Datos que recopilamos",
    p: "Nombre, email y datos de pago (procesados por la pasarela, nunca almacenamos tu tarjeta). Datos de uso del curso para medir tu progreso.",
  },
  {
    h: "2. Para qué los usamos",
    p: "Dar acceso al curso, enviar tu enlace de entrada, soporte, y mejorar la plataforma. No vendemos tus datos a terceros.",
  },
  {
    h: "3. Comunicaciones",
    p: "Te escribimos por email y, si lo autorizas, por WhatsApp, para temas del curso y novedades. Puedes darte de baja cuando quieras.",
  },
  {
    h: "4. Cookies y analítica",
    p: "Usamos cookies y herramientas de analítica para entender el uso y optimizar la experiencia. Puedes gestionarlas en tu navegador.",
  },
  {
    h: "5. Tus derechos",
    p: "Puedes acceder, corregir o eliminar tus datos escribiéndonos. Cumplimos con la normativa de protección de datos aplicable.",
  },
  {
    h: "6. Contacto",
    p: "Para cualquier consulta de privacidad, escríbenos por los canales oficiales de soporte.",
  },
];

export default function PrivacidadPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:pt-44">
      <h1 className="text-4xl font-bold tracking-tight">Política de privacidad</h1>
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

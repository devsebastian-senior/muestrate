/**
 * Seed de demo: crea un curso publicado con 2 módulos y lecciones,
 * para poder ver la plataforma con contenido real antes de subir videos.
 *
 * Uso:  npm run db:seed   (requiere DATABASE_URL en .env.local)
 */
import { db } from "./index";
import { courses, modules, lessons } from "./schema";

async function main() {
  console.log("🌱 Seeding…");

  const [course] = await db
    .insert(courses)
    .values({
      slug: "muestrate-fundamentos",
      title: "Muéstrate: Marca Personal de Alto Impacto",
      subtitle: "De invisible a referente en 6 semanas",
      description:
        "El sistema completo para construir una marca personal magnética y convertir tu audiencia en clientes.",
      priceCents: 29700,
      currency: "USD",
      status: "published",
    })
    .returning();

  const [m1] = await db
    .insert(modules)
    .values({ courseId: course.id, title: "Fundamentos", sortOrder: 1 })
    .returning();

  const [m2] = await db
    .insert(modules)
    .values({ courseId: course.id, title: "Estrategia de Contenido", sortOrder: 2 })
    .returning();

  await db.insert(lessons).values([
    {
      moduleId: m1.id,
      title: "Bienvenida y mentalidad",
      durationSec: 420,
      sortOrder: 1,
      isFreePreview: true,
    },
    { moduleId: m1.id, title: "Define tu propuesta de valor", durationSec: 780, sortOrder: 2 },
    { moduleId: m2.id, title: "El framework de contenido viral", durationSec: 960, sortOrder: 1 },
    { moduleId: m2.id, title: "Calendario de 30 días", durationSec: 540, sortOrder: 2 },
  ]);

  console.log(`✅ Curso creado: ${course.slug}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

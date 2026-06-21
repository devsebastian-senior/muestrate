/**
 * Gate de acceso. Única fuente de verdad para "¿este usuario puede ver este curso?".
 *
 * Se consulta en el server ANTES de generar cualquier URL firmada de video.
 * Si esto devuelve false, no se emite token de video. Punto.
 */
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { entitlements } from "@/lib/db/schema";

export async function hasCourseAccess(userId: string, courseId: string): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;
  const rows = await db
    .select({ id: entitlements.id })
    .from(entitlements)
    .where(
      and(
        eq(entitlements.userId, userId),
        eq(entitlements.courseId, courseId),
        eq(entitlements.status, "active"),
      ),
    )
    .limit(1);
  return rows.length > 0;
}

/**
 * Concede acceso de forma idempotente (lo llama el webhook tras pago confirmado).
 * Si ya existe entitlement para (user, course), lo reactiva.
 */
export async function grantCourseAccess(params: {
  userId: string;
  courseId: string;
  source: "stripe" | "mercadopago" | "manual";
  orderId?: string;
}) {
  await db
    .insert(entitlements)
    .values({
      userId: params.userId,
      courseId: params.courseId,
      source: params.source,
      orderId: params.orderId,
      status: "active",
    })
    .onConflictDoUpdate({
      target: [entitlements.userId, entitlements.courseId],
      set: { status: "active", revokedAt: null, source: params.source },
    });
}

import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders, entitlements } from "@/lib/db/schema";
import { getPaymentProvider } from "@/lib/payments";
import { ensureUserByEmail, generateMagicLink } from "@/lib/auth/admin";
import { grantCourseAccess } from "@/lib/auth/entitlements";
import { sendAccessEmail } from "@/lib/email/access";

// Stripe firma el body crudo → necesitamos runtime Node y NO parsear el body.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Sin firma" }, { status: 400 });

  const rawBody = await req.text();
  const provider = getPaymentProvider("stripe");

  let event;
  try {
    event = await provider.parseWebhook(rawBody, signature);
  } catch (e) {
    // Firma inválida → 400 (Stripe reintentará si es transitorio).
    const message = e instanceof Error ? e.message : "firma inválida";
    return NextResponse.json({ error: `Webhook inválido: ${message}` }, { status: 400 });
  }

  try {
    if (event.type === "payment.succeeded") {
      const { courseId } = event.metadata;
      const email = event.customerEmail;
      if (!courseId || !email) {
        // No podemos conceder acceso sin estos datos; aceptamos para no reintentar en bucle.
        return NextResponse.json({ received: true, skipped: "faltan courseId/email" });
      }

      // 1. Registra el pedido (idempotente por provider + referencia).
      const [order] = await db
        .insert(orders)
        .values({
          courseId,
          provider: "stripe",
          providerRef: event.reference,
          amountCents: event.amountCents,
          currency: event.currency,
          status: "paid",
          customerEmail: email,
        })
        .onConflictDoUpdate({
          target: [orders.provider, orders.providerRef],
          set: { status: "paid" },
        })
        .returning();

      // 2. Asegura usuario.
      const userId = await ensureUserByEmail(email);

      // 3. Concede acceso (el gate). Idempotente.
      await grantCourseAccess({ userId, courseId, source: "stripe", orderId: order.id });

      // 4. Vincula el pedido al usuario.
      await db.update(orders).set({ userId }).where(eq(orders.id, order.id));

      // 5. Envía acceso (magic link) por email.
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      const magicLink = await generateMagicLink(email, `${appUrl}/dashboard`);
      await sendAccessEmail({ to: email, courseTitle: "tu curso", magicLink });
      // TODO Fase 3: enviar también por WhatsApp Cloud API.
    }

    if (event.type === "payment.refunded") {
      const [order] = await db
        .update(orders)
        .set({ status: "refunded" })
        .where(and(eq(orders.provider, "stripe"), eq(orders.providerRef, event.reference)))
        .returning();
      if (order?.userId) {
        await db
          .update(entitlements)
          .set({ status: "revoked", revokedAt: new Date() })
          .where(
            and(
              eq(entitlements.userId, order.userId),
              eq(entitlements.courseId, order.courseId),
            ),
          );
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    // Error procesando → 500 para que Stripe reintente.
    console.error("[webhook/stripe] error:", e);
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 });
  }
}

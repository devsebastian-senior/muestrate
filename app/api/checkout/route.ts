import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { getPaymentProvider } from "@/lib/payments";

export const runtime = "nodejs";

const bodySchema = z.object({ courseSlug: z.string().min(1) });

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Pago no disponible aún: falta conectar la base de datos (Fase 0)." },
        { status: 503 },
      );
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Pago no disponible aún: falta configurar Stripe (Fase 0)." },
        { status: 503 },
      );
    }

    const { courseSlug } = bodySchema.parse(await req.json());

    const [course] = await db.select().from(courses).where(eq(courses.slug, courseSlug)).limit(1);
    if (!course) return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const provider = getPaymentProvider("stripe");

    const { url } = await provider.createCheckout({
      courseId: course.id,
      amountCents: course.priceCents,
      currency: course.currency,
      productName: course.title,
      successUrl: `${appUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/#precio`,
    });

    return NextResponse.json({ url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error al iniciar el pago";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

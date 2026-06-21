/**
 * Implementación Stripe del PaymentProvider.
 * Usa Checkout Sessions (hosted) — lo más simple y seguro para empezar.
 */
import Stripe from "stripe";
import type {
  CheckoutParams,
  CheckoutResult,
  PaymentEvent,
  PaymentProvider,
} from "./provider";

function client() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY no configurada");
  // Sin apiVersion fija: usa la versión por defecto del SDK/cuenta y evita
  // acoplar el build a un literal de versión que cambia entre releases.
  return new Stripe(key);
}

export const stripeProvider: PaymentProvider = {
  id: "stripe",

  async createCheckout(params: CheckoutParams): Promise<CheckoutResult> {
    const stripe = client();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: params.customerEmail,
      line_items: [
        {
          price_data: {
            currency: params.currency.toLowerCase(),
            product_data: { name: params.productName },
            unit_amount: params.amountCents,
          },
          quantity: 1,
        },
      ],
      // Metadata viaja de vuelta en el webhook → así sabemos qué curso y a quién.
      metadata: { courseId: params.courseId },
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
    });

    return { url: session.url!, reference: session.id };
  },

  async parseWebhook(rawBody: string, signature: string): Promise<PaymentEvent> {
    const stripe = client();
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET no configurada");

    // Verifica la firma — si falla, lanza y el handler responde 400.
    const event = stripe.webhooks.constructEvent(rawBody, signature, secret);

    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        return {
          type: s.payment_status === "paid" ? "payment.succeeded" : "ignored",
          provider: "stripe",
          reference: s.id,
          amountCents: s.amount_total ?? 0,
          currency: (s.currency ?? "usd").toUpperCase(),
          customerEmail: s.customer_details?.email ?? s.customer_email ?? undefined,
          metadata: { courseId: s.metadata?.courseId },
        };
      }
      case "charge.refunded": {
        const c = event.data.object as Stripe.Charge;
        return {
          type: "payment.refunded",
          provider: "stripe",
          reference: c.payment_intent as string,
          amountCents: c.amount_refunded,
          currency: c.currency.toUpperCase(),
          metadata: {},
        };
      }
      default:
        return {
          type: "ignored",
          provider: "stripe",
          reference: event.id,
          amountCents: 0,
          currency: "USD",
          metadata: {},
        };
    }
  },
};

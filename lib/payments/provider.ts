/**
 * Contrato de proveedor de pago.
 *
 * Todo el sistema habla este lenguaje normalizado. Stripe, Mercado Pago, etc.
 * implementan esta interfaz y traducen sus eventos al PaymentEvent común.
 * Así el resto del código NO sabe ni le importa qué pasarela se usó.
 */

export type PaymentProviderId = "stripe" | "mercadopago";

export interface CheckoutParams {
  courseId: string;
  /** Precio en centavos (entero). */
  amountCents: number;
  currency: string;
  /** Título mostrado en el checkout. */
  productName: string;
  /** Email pre-rellenado si lo conocemos. */
  customerEmail?: string;
  /** A dónde volver tras éxito / cancelación. */
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  /** URL a la que redirigir al comprador. */
  url: string;
  /** Referencia del proveedor (session id) para trazabilidad. */
  reference: string;
}

/** Evento de pago normalizado que consume el webhook handler. */
export interface PaymentEvent {
  type: "payment.succeeded" | "payment.failed" | "payment.refunded" | "ignored";
  provider: PaymentProviderId;
  /** Referencia única del proveedor (idempotencia). */
  reference: string;
  amountCents: number;
  currency: string;
  customerEmail?: string;
  /** Metadata propia que viajó en el checkout. */
  metadata: { courseId?: string; userId?: string };
}

export interface PaymentProvider {
  readonly id: PaymentProviderId;
  /** Crea una sesión de checkout y devuelve la URL de pago. */
  createCheckout(params: CheckoutParams): Promise<CheckoutResult>;
  /** Verifica la firma y normaliza el evento entrante del webhook. */
  parseWebhook(rawBody: string, signature: string): Promise<PaymentEvent>;
}

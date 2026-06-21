/**
 * Registro de proveedores de pago. Punto único de acceso.
 *
 * Para añadir Mercado Pago (Fase LATAM local):
 *   1. crea lib/payments/mercadopago.ts implementando PaymentProvider
 *   2. regístralo aquí abajo
 *   3. el webhook /api/webhooks/mercadopago/route.ts lo usa
 * El resto del sistema no cambia.
 */
import { stripeProvider } from "./stripe";
import type { PaymentProvider, PaymentProviderId } from "./provider";

const providers: Record<string, PaymentProvider> = {
  stripe: stripeProvider,
  // mercadopago: mercadoPagoProvider,
};

export function getPaymentProvider(id: PaymentProviderId): PaymentProvider {
  const p = providers[id];
  if (!p) throw new Error(`Proveedor de pago no soportado: ${id}`);
  return p;
}

export * from "./provider";

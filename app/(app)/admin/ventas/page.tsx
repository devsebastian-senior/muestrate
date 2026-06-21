import { Card } from "@/components/ui/card";
import { listOrders } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

export const metadata = { title: "Ventas · Admin" };

const STATUS: Record<string, { label: string; cls: string }> = {
  paid: { label: "Pagado", cls: "bg-[var(--color-lime)]/10 text-[var(--color-lime)]" },
  pending: { label: "Pendiente", cls: "bg-[var(--color-cyan)]/10 text-[var(--color-cyan)]" },
  refunded: { label: "Reembolsado", cls: "bg-[var(--color-fuchsia)]/10 text-[var(--color-fuchsia)]" },
  failed: { label: "Fallido", cls: "bg-[var(--color-muted)]/10 text-[var(--color-muted)]" },
};

export default async function AdminVentasPage() {
  const orders = await listOrders();
  const totalPaid = orders
    .filter((o) => o.status === "paid")
    .reduce((n, o) => n + o.amountCents, 0);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ventas</h2>
        <span className="text-sm text-[var(--color-muted)]">
          Total cobrado: <span className="font-semibold text-[var(--color-fg)]">{formatPrice(totalPaid, "USD")}</span>
        </span>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wider text-[var(--color-muted)]">
              <th className="px-5 py-3 font-medium">Cliente</th>
              <th className="px-5 py-3 font-medium">Pasarela</th>
              <th className="px-5 py-3 font-medium">Fecha</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3 text-right font-medium">Monto</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const st = STATUS[o.status];
              return (
                <tr key={o.id} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="px-5 py-4">{o.customerEmail}</td>
                  <td className="px-5 py-4 capitalize text-[var(--color-muted)]">{o.provider}</td>
                  <td className="px-5 py-4 text-[var(--color-muted)]">{o.createdAt}</td>
                  <td className="px-5 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs", st.cls)}>{st.label}</span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold">
                    {formatPrice(o.amountCents, o.currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

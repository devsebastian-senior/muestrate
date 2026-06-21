import Link from "next/link";
import { Users, DollarSign, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getAdminStats, listStudents, listOrders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Resumen · Admin" };

export default async function AdminOverviewPage() {
  const [stats, students, orders] = await Promise.all([
    getAdminStats(),
    listStudents(),
    listOrders(),
  ]);

  const cards = [
    { icon: Users, label: "Alumnos", value: stats.students.toLocaleString("es") },
    { icon: DollarSign, label: "Ingresos", value: formatPrice(stats.revenueCents, "USD") },
    { icon: BookOpen, label: "Lecciones", value: String(stats.lessons) },
    { icon: TrendingUp, label: "Conversión", value: `${stats.conversionPct}%` },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((s) => (
          <Card key={s.label} className="p-5">
            <s.icon className="size-5 text-[var(--color-cyan)]" />
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-[var(--color-muted)]">{s.label}</div>
          </Card>
        ))}
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Últimos alumnos</h2>
          <Link href="/admin/alumnos" className="inline-flex items-center gap-1 text-sm text-[var(--color-cyan)] hover:underline">
            Ver todos <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <Card className="p-0">
          {students.slice(0, 4).map((s) => (
            <div key={s.id} className="flex items-center gap-4 border-b border-[var(--color-border)] p-4 last:border-0">
              <div className="flex-1">
                <div className="text-sm font-medium">{s.name}</div>
                <div className="text-xs text-[var(--color-muted)]">{s.email}</div>
              </div>
              <div className="text-xs text-[var(--color-muted)]">{s.progressPct}%</div>
            </div>
          ))}
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Ventas recientes</h2>
          <Link href="/admin/ventas" className="inline-flex items-center gap-1 text-sm text-[var(--color-cyan)] hover:underline">
            Ver todas <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <Card className="p-0">
          {orders.slice(0, 4).map((o) => (
            <div key={o.id} className="flex items-center gap-4 border-b border-[var(--color-border)] p-4 last:border-0">
              <div className="flex-1 text-sm">{o.customerEmail}</div>
              <span className="text-xs text-[var(--color-muted)]">{o.createdAt}</span>
              <span className="text-sm font-semibold">{formatPrice(o.amountCents, o.currency)}</span>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}

import { redirect } from "next/navigation";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { getSessionUser } from "@/lib/session";
import { isDemoMode } from "@/lib/demo";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  // Gate de acceso: solo entran alumnos con compra activa o admins.
  // (middleware ya exigió login; aquí exigimos entitlement).
  if (!user.isAdmin && !user.hasAccess) redirect("/comprar");

  return (
    <div className="flex min-h-dvh bg-[var(--color-base)]">
      <Sidebar isAdmin={user.isAdmin} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        {isDemoMode() ? (
          <div className="border-b border-[var(--color-border)] bg-[var(--color-violet)]/10 px-6 py-2 text-center text-xs text-[var(--color-muted)]">
            Modo demo (Fase 0) · conecta <span className="font-mono">DATABASE_URL</span> y Supabase para datos reales
          </div>
        ) : null}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

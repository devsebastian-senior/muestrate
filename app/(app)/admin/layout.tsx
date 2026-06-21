import { redirect } from "next/navigation";
import { AdminNav } from "@/components/app/admin/admin-nav";
import { getSessionUser } from "@/lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user.isAdmin) redirect("/dashboard");

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight">Administración</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        Gestiona contenido, alumnos, ventas y ajustes del curso.
      </p>
      <div className="mt-6">
        <AdminNav />
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

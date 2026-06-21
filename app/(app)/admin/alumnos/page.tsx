import { Card } from "@/components/ui/card";
import { listStudents } from "@/lib/data";
import { initials } from "@/lib/user";
import { cn } from "@/lib/utils";

export const metadata = { title: "Alumnos · Admin" };

export default async function AdminAlumnosPage() {
  const students = await listStudents();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Alumnos ({students.length})</h2>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left text-xs uppercase tracking-wider text-[var(--color-muted)]">
              <th className="px-5 py-3 font-medium">Alumno</th>
              <th className="px-5 py-3 font-medium">Progreso</th>
              <th className="px-5 py-3 font-medium">Alta</th>
              <th className="px-5 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-xs font-bold text-white">
                      {initials(s.name)}
                    </span>
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-[var(--color-muted)]">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
                        style={{ width: `${s.progressPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--color-muted)]">{s.progressPct}%</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-[var(--color-muted)]">{s.joinedAt}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs",
                      s.status === "active"
                        ? "bg-[var(--color-lime)]/10 text-[var(--color-lime)]"
                        : "bg-[var(--color-fuchsia)]/10 text-[var(--color-fuchsia)]",
                    )}
                  >
                    {s.status === "active" ? "Activo" : "Revocado"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

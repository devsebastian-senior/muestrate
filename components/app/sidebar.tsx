import { Sparkles } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { NavLinks } from "./nav-links";

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]/40 p-5 backdrop-blur-xl md:flex">
      <Logo />

      <div className="mt-10 flex-1">
        <NavLinks isAdmin={isAdmin} />
      </div>

      <div className="mt-auto rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-violet)]/10 to-[var(--color-fuchsia)]/10 p-4">
        <Sparkles className="size-5 text-[var(--color-cyan)]" />
        <p className="mt-2 text-sm font-medium">Comunidad</p>
        <p className="text-xs text-[var(--color-muted)]">Próximamente: foro y rankings.</p>
      </div>
    </aside>
  );
}

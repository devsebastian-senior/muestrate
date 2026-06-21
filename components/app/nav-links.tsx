"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GraduationCap, Settings, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/curso/muestrate-fundamentos", label: "Mi curso", icon: GraduationCap },
  { href: "/configuracion", label: "Configuración", icon: Settings },
];

export function NavLinks({
  isAdmin = false,
  onNavigate,
}: {
  isAdmin?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = isAdmin
    ? [...NAV, { href: "/admin", label: "Admin", icon: ShieldCheck }]
    : NAV;

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
              active
                ? "bg-gradient-to-r from-[var(--color-violet)]/20 to-transparent text-[var(--color-fg)] ring-1 ring-[var(--color-violet)]/30"
                : "text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-fg)]",
            )}
          >
            <item.icon className={cn("size-5", active && "text-[var(--color-cyan)]")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

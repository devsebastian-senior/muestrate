"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, BookOpen, Users, Receipt, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/admin", label: "Resumen", icon: LayoutGrid, exact: true },
  { href: "/admin/contenido", label: "Contenido", icon: BookOpen },
  { href: "/admin/alumnos", label: "Alumnos", icon: Users },
  { href: "/admin/ventas", label: "Ventas", icon: Receipt },
  { href: "/admin/ajustes", label: "Ajustes", icon: Settings2 },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-[var(--color-border)] pb-px">
      {TABS.map((t) => {
        const active = t.exact ? pathname === t.href : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-colors",
              active
                ? "border-[var(--color-violet)] text-[var(--color-fg)]"
                : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-fg)]",
            )}
          >
            <t.icon className="size-4" /> {t.label}
          </Link>
        );
      })}
    </div>
  );
}

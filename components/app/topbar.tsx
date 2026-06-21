"use client";

import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { NavLinks } from "./nav-links";
import { UserMenu } from "./user-menu";
import type { AppUser } from "@/lib/user";

export function Topbar({ user }: { user: AppUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-base)]/70 px-4 backdrop-blur-xl md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="grid size-9 place-items-center rounded-xl border border-[var(--color-border)] md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <div className="md:hidden">
            <Logo />
          </div>
        </div>

        <UserMenu user={user} />
      </header>

      {/* Drawer móvil */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="grid size-9 place-items-center rounded-xl border border-[var(--color-border)]"
                aria-label="Cerrar menú"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-8">
              <NavLinks isAdmin={user.isAdmin} onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-violet)]/10 to-[var(--color-fuchsia)]/10 p-4">
              <Sparkles className="size-5 text-[var(--color-cyan)]" />
              <p className="mt-2 text-sm font-medium">Comunidad</p>
              <p className="text-xs text-[var(--color-muted)]">Próximamente.</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

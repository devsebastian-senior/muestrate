"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Settings, ShieldCheck, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "@/lib/auth/actions";
import { initials, type AppUser } from "@/lib/user";
import { cn } from "@/lib/utils";

export function UserMenu({ user }: { user: AppUser }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-1 pl-1 pr-2.5 transition-colors hover:border-[var(--color-violet)]"
      >
        <Avatar user={user} />
        <span className="hidden max-w-28 truncate text-sm md:block">{user.name}</span>
        <ChevronDown className={cn("size-4 text-[var(--color-muted)] transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar user={user} />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-xs text-[var(--color-muted)]">{user.email}</div>
            </div>
          </div>
          <div className="my-1 h-px bg-[var(--color-border)]" />
          <MenuItem href="/configuracion" icon={Settings}>
            Configuración
          </MenuItem>
          {user.isAdmin ? (
            <MenuItem href="/admin" icon={ShieldCheck}>
              Panel admin
            </MenuItem>
          ) : null}
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--color-fuchsia)] transition-colors hover:bg-[var(--color-surface-2)]"
          >
            <LogOut className="size-4" /> Cerrar sesión
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Avatar({ user }: { user: AppUser }) {
  if (user.avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.avatarUrl} alt={user.name} className="size-8 rounded-full object-cover" />;
  }
  return (
    <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-xs font-bold text-white">
      {initials(user.name)}
    </span>
  );
}

function MenuItem({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--color-fg)] transition-colors hover:bg-[var(--color-surface-2)]"
    >
      <Icon className="size-4 text-[var(--color-muted)]" /> {children}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#programa", label: "Programa" },
  { href: "#precio", label: "Precio" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300",
          scrolled || open ? "glass border-gradient" : "",
        )}
      >
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/acccesomuestrate">Iniciar sesión</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="#precio">Quiero entrar</Link>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-xl border border-[var(--color-border)] md:hidden"
            aria-label="Menú"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Panel móvil */}
      {open ? (
        <div className="mx-auto mt-2 max-w-6xl px-4 md:hidden">
          <div className="glass border-gradient rounded-2xl p-4">
            <nav className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-fg)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-[var(--color-border)] pt-3">
              <Button asChild variant="glass" size="sm">
                <Link href="/acccesomuestrate" onClick={() => setOpen(false)}>
                  Iniciar sesión
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="#precio" onClick={() => setOpen(false)}>
                  Quiero entrar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

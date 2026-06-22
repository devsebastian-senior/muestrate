import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-[var(--color-muted)]">
            Marca personal de alto impacto. Acceso de por vida.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-muted)]">
          <Link href="/acccesomuestrate" className="hover:text-[var(--color-fg)]">
            Iniciar sesión
          </Link>
          <Link href="/terminos" className="hover:text-[var(--color-fg)]">
            Términos
          </Link>
          <Link href="/privacidad" className="hover:text-[var(--color-fg)]">
            Privacidad
          </Link>
          <span className="opacity-60">© {2026} Muéstrate</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Aurora } from "@/components/site/aurora";
import { Logo } from "@/components/site/logo";
import { Card } from "@/components/ui/card";

/** Marco visual compartido por todas las pantallas de auth. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative grid min-h-dvh place-items-center px-6 py-16">
      <Aurora />
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="p-8">
          <h1 className="text-center text-2xl font-bold">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-center text-sm text-[var(--color-muted)]">{subtitle}</p>
          ) : null}
          {children}
        </Card>
        {footer ? (
          <p className="mt-6 text-center text-sm text-[var(--color-muted)]">{footer}</p>
        ) : null}
        <p className="mt-4 text-center text-xs text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-fg)]">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="my-5 flex items-center gap-3 text-xs text-[var(--color-muted)]">
      <span className="h-px flex-1 bg-[var(--color-border)]" />o<span className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}

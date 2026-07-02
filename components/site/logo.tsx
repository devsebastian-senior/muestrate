import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logotipo de marca "Muéstrate by Andrea Cardona".
 * Wordmark cursivo (Pacifico ≈ lettering redondeado), "te" en gris-malva,
 * y firma "BY ANDREA CARDONA" en sans con tracking.
 */
export function Logo({
  className,
  href = "/",
  showByline = true,
}: {
  className?: string;
  href?: string;
  showByline?: boolean;
}) {
  return (
    <Link href={href} className={cn("group inline-flex flex-col leading-none", className)}>
      <span className="font-script text-2xl lowercase tracking-tight text-[var(--color-violet)] transition-opacity group-hover:opacity-90">
        muéstra<span className="text-[var(--color-muted)]">te</span>
      </span>
      {showByline ? (
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)]">
          by Andrea Cardona
        </span>
      ) : null}
    </Link>
  );
}

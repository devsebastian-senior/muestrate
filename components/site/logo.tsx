import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-violet)] via-[var(--color-fuchsia)] to-[var(--color-cyan)] shadow-[0_0_24px_-6px_var(--color-violet)] transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none">
          <path
            d="M4 18V8.5a1 1 0 0 1 1.6-.8l4.4 3.3 4.4-3.3a1 1 0 0 1 1.6.8V18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        Mu<span className="text-gradient">éstrate</span>
      </span>
    </Link>
  );
}

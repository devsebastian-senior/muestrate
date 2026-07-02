"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Megaphone, ArrowRight } from "lucide-react";
import type { BannerVM } from "@/lib/data/types";

/** Banner(es) rotativo(s) del nuevo módulo. Rota cada 5s si hay varios. */
export function RotatingBanner({ banners }: { banners: BannerVM[] }) {
  const items = banners.filter((b) => b.active);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
  const b = items[i % items.length];

  return (
    <div className="mt-6 flex items-center gap-3 rounded-[var(--radius-xl)] border border-[var(--color-violet)]/30 bg-gradient-to-r from-[var(--color-violet)]/12 to-[var(--color-cyan)]/10 p-4">
      <Megaphone className="size-5 shrink-0 text-[var(--color-violet)]" />
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium">{b.title}</span>
        {b.text ? <span className="ml-2 text-sm text-[var(--color-muted)]">{b.text}</span> : null}
      </div>
      {b.ctaHref && b.ctaLabel ? (
        <Link
          href={b.ctaHref}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--color-violet)] px-3 py-1.5 text-xs font-semibold text-white"
        >
          {b.ctaLabel} <ArrowRight className="size-3.5" />
        </Link>
      ) : null}
      {items.length > 1 ? (
        <div className="ml-2 flex shrink-0 gap-1">
          {items.map((_, k) => (
            <span
              key={k}
              className={`size-1.5 rounded-full ${k === i % items.length ? "bg-[var(--color-violet)]" : "bg-[var(--color-border)]"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

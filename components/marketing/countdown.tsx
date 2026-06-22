"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

/** Cuenta regresiva hasta la medianoche local (urgencia de oferta diaria). */
export function Countdown() {
  const [left, setLeft] = useState<{ h: string; m: string; s: string } | null>(null);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1000);
      const pad = (n: number) => n.toString().padStart(2, "0");
      setLeft({ h: pad(h), m: pad(m), s: pad(s) });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] glass px-4 py-2 text-sm">
      <Clock className="size-4 text-[var(--color-fuchsia)]" />
      <span className="text-[var(--color-muted)]">La oferta termina en</span>
      <span className="flex items-center gap-1 font-mono font-bold tabular-nums">
        {left ? (
          <>
            <Box>{left.h}</Box>:<Box>{left.m}</Box>:<Box>{left.s}</Box>
          </>
        ) : (
          <Box>··</Box>
        )}
      </span>
    </div>
  );
}

function Box({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[var(--color-fg)]">
      {children}
    </span>
  );
}

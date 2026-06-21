"use client";

import { Play } from "lucide-react";

/**
 * Player de lección. Con video real → iframe firmado de Bunny.
 * Sin video (Fase 0 demo) → marco placeholder.
 *
 * Migración a player propio (Vidstack/hls.js con hlsUrl) sin tocar el resto.
 */
export function LessonPlayer({ embedUrl, title }: { embedUrl?: string; title: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-2xl)] border-gradient glass glow">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[var(--color-surface)]">
          <div className="text-center">
            <button className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-fuchsia)] text-white shadow-[0_0_50px_-8px_var(--color-fuchsia)] transition-transform duration-300 hover:scale-110">
              <Play className="size-8 translate-x-0.5" fill="currentColor" />
            </button>
            <p className="mt-4 text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Video pendiente de subir (demo)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

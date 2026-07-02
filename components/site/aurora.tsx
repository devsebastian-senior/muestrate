/**
 * Fondo "aurora" claro y elegante: blobs lila/malva muy suaves sobre crema.
 * Puro CSS, detrás de todo (fixed, -z).
 */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="absolute -top-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[var(--color-violet)] opacity-[0.18] blur-[130px] animate-[var(--animate-aurora)]" />
      <div className="absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full bg-[var(--color-cyan)] opacity-[0.22] blur-[130px] animate-[var(--animate-aurora)] [animation-delay:-7s]" />
      <div className="absolute -bottom-48 left-1/3 h-[38rem] w-[38rem] rounded-full bg-[var(--color-fuchsia)] opacity-[0.12] blur-[140px] animate-[var(--animate-aurora)] [animation-delay:-14s]" />

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-base)]/40 via-transparent to-[var(--color-base)]" />
    </div>
  );
}

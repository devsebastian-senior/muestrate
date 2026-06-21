/**
 * Fondo "aurora" futurista: blobs de gradiente neón animados + rejilla + ruido.
 * Puro CSS/Tailwind, sin JS pesado. Va detrás de todo (fixed, -z).
 */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Rejilla */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Blobs aurora */}
      <div className="absolute -top-40 left-1/4 h-[42rem] w-[42rem] rounded-full bg-[var(--color-violet)] opacity-25 blur-[120px] animate-[var(--animate-aurora)]" />
      <div className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full bg-[var(--color-cyan)] opacity-20 blur-[120px] animate-[var(--animate-aurora)] [animation-delay:-6s]" />
      <div className="absolute -bottom-48 left-1/3 h-[40rem] w-[40rem] rounded-full bg-[var(--color-fuchsia)] opacity-20 blur-[130px] animate-[var(--animate-aurora)] [animation-delay:-12s]" />

      {/* Viñeta + degradado inferior hacia el negro base */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-base)]" />
    </div>
  );
}

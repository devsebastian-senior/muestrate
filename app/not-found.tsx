import Link from "next/link";
import { Aurora } from "@/components/site/aurora";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative grid min-h-dvh place-items-center px-6 text-center">
      <Aurora />
      <div>
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <p className="text-7xl font-bold text-gradient md:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Página no encontrada</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          El enlace no existe o se movió.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Ir al inicio</Link>
          </Button>
          <Button asChild variant="glass">
            <Link href="/dashboard">Mi curso</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

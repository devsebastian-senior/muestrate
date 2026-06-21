import Link from "next/link";
import { Suspense } from "react";
import { Mail } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata = { title: "Verifica tu correo" };

export default function VerificarPage() {
  return (
    <AuthShell
      title="Revisa tu correo"
      subtitle="Te enviamos un enlace para confirmar tu cuenta"
      footer={
        <Link href="/acceso" className="font-medium text-[var(--color-fg)] hover:underline">
          Volver a iniciar sesión
        </Link>
      }
    >
      <div className="py-6 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--color-cyan)]/15 text-[var(--color-cyan)]">
          <Mail className="size-8" />
        </div>
        <Suspense>
          <p className="mt-5 text-sm text-[var(--color-muted)]">
            Haz clic en el enlace del correo para activar tu cuenta y entrar al curso. Si no lo ves,
            revisa la carpeta de spam.
          </p>
        </Suspense>
      </div>
    </AuthShell>
  );
}

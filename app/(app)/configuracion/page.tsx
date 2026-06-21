import { SettingsTabs } from "@/components/app/settings/settings-tabs";
import { getSessionUser } from "@/lib/session";

export const metadata = { title: "Configuración" };

export default async function ConfiguracionPage() {
  const user = await getSessionUser();
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">Gestiona tu cuenta y preferencias.</p>
      <div className="mt-8">
        <SettingsTabs user={user} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, Check, CreditCard, Bell, ShieldCheck, UserCog, Mail } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { updateProfile, updatePassword } from "@/lib/auth/actions";
import { apiPatch } from "@/lib/client-api";
import { initials, type AppUser } from "@/lib/user";

export function SettingsTabs({ user }: { user: AppUser }) {
  return (
    <Tabs defaultValue="perfil">
      <TabsList>
        <TabsTrigger value="perfil">Perfil</TabsTrigger>
        <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
        <TabsTrigger value="facturacion">Facturación</TabsTrigger>
      </TabsList>

      <TabsContent value="perfil">
        <PerfilTab user={user} />
      </TabsContent>
      <TabsContent value="seguridad">
        <SeguridadTab />
      </TabsContent>
      <TabsContent value="notificaciones">
        <NotificacionesTab notifyUpdates={user.notifyUpdates} />
      </TabsContent>
      <TabsContent value="facturacion">
        <FacturacionTab />
      </TabsContent>
    </Tabs>
  );
}

function Saved({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-lime)]">
      <Check className="size-3.5" /> Guardado
    </span>
  );
}

function PerfilTab({ user }: { user: AppUser }) {
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);
    const { error } = await updateProfile({ fullName: name });
    setLoading(false);
    if (error) setError(error);
    else setSaved(true);
  }

  return (
    <Card>
      <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
        <UserCog className="size-5" />
        <CardTitle>Perfil</CardTitle>
      </div>
      <div className="mb-6 flex items-center gap-4">
        <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-lg font-bold text-white">
          {initials(name || user.name)}
        </span>
        <Button variant="outline" size="sm" type="button">
          Cambiar foto
        </Button>
      </div>
      <form onSubmit={save} className="space-y-4">
        <div>
          <Label>Nombre</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={user.email} disabled />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : null} Guardar cambios
          </Button>
          <Saved show={saved} />
        </div>
        {error ? <p className="text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
      </form>
    </Card>
  );
}

function SeguridadTab() {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 6) return setError("Mínimo 6 caracteres.");
    if (pw !== confirm) return setError("No coinciden.");
    setLoading(true);
    setError(null);
    setSaved(false);
    const { error } = await updatePassword(pw);
    setLoading(false);
    if (error) setError(error);
    else {
      setSaved(true);
      setPw("");
      setConfirm("");
    }
  }

  return (
    <Card>
      <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
        <ShieldCheck className="size-5" />
        <CardTitle>Seguridad</CardTitle>
      </div>
      <form onSubmit={save} className="space-y-4">
        <div>
          <Label>Nueva contraseña</Label>
          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
        </div>
        <div>
          <Label>Confirmar</Label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : null} Actualizar contraseña
          </Button>
          <Saved show={saved} />
        </div>
        {error ? <p className="text-xs text-[var(--color-fuchsia)]">{error}</p> : null}
      </form>
    </Card>
  );
}

function Toggle({ label, desc, defaultOn = true }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-[var(--color-muted)]">{desc}</div>
      </div>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-[var(--color-violet)]" : "bg-[var(--color-surface-2)]"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${
            on ? "left-[1.375rem]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function NotificacionesTab({ notifyUpdates }: { notifyUpdates: boolean }) {
  const [news, setNews] = useState(notifyUpdates);

  async function toggleNews() {
    const next = !news;
    setNews(next); // optimista
    const { ok } = await apiPatch("/me/preferences", { notifyUpdates: next });
    if (!ok) setNews(!next); // revertir si falla
  }

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2 text-[var(--color-cyan)]">
        <Bell className="size-5" />
        <CardTitle>Notificaciones</CardTitle>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {/* Real: preferencia de novedades (persiste en el backend) */}
        <div className="flex items-center justify-between gap-4 py-3">
          <div>
            <div className="text-sm font-medium">Novedades del curso</div>
            <div className="text-xs text-[var(--color-muted)]">
              Muéstrame el aviso cuando haya contenido nuevo.
            </div>
          </div>
          <button
            type="button"
            onClick={toggleNews}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              news ? "bg-[var(--color-violet)]" : "bg-[var(--color-surface-2)]"
            }`}
          >
            <span
              className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${
                news ? "left-[1.375rem]" : "left-0.5"
              }`}
            />
          </button>
        </div>
        <Toggle label="Recordatorios por WhatsApp" desc="Mantén tu racha de aprendizaje." />
        <Toggle label="Promociones" desc="Ofertas y lanzamientos." defaultOn={false} />
      </div>
    </Card>
  );
}

function FacturacionTab() {
  return (
    <Card>
      <div className="mb-6 flex items-center gap-2 text-[var(--color-cyan)]">
        <CreditCard className="size-5" />
        <CardTitle>Facturación</CardTitle>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-lime)]/5 p-3 text-sm">
        <ShieldCheck className="size-5 text-[var(--color-lime)]" />
        Acceso de por vida activo
      </div>
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-medium">Historial de compras</h3>
        <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] p-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="size-4 text-[var(--color-muted)]" />
            <div>
              <div>Muéstrate: Marca Personal de Alto Impacto</div>
              <div className="text-xs text-[var(--color-muted)]">Pago único · acceso de por vida</div>
            </div>
          </div>
          <span className="font-semibold">$297</span>
        </div>
      </div>
    </Card>
  );
}

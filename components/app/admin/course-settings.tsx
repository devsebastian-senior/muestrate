"use client";

import { useState } from "react";
import { Check, ImagePlus, Loader2 } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { CourseVM } from "@/lib/data/types";

export function CourseSettings({ course }: { course: CourseVM }) {
  const [title, setTitle] = useState(course.title);
  const [subtitle, setSubtitle] = useState(course.subtitle);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState((course.priceCents / 100).toString());
  const [currency, setCurrency] = useState(course.currency);
  const [status, setStatus] = useState(course.status);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    // TODO(db): server action → db.update(courses).set({...}).where(eq(id))
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setSaved(true);
  }

  return (
    <form onSubmit={save} className="space-y-5">
      <Card>
        <CardTitle className="mb-5">Detalles del curso</CardTitle>
        <div className="space-y-4">
          <div>
            <Label>Título</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Subtítulo</Label>
            <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>
          <div>
            <Label>Descripción</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm outline-none transition-colors focus:border-[var(--color-violet)]"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-5">Portada</CardTitle>
        <label className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center transition-colors hover:border-[var(--color-violet)]">
          <ImagePlus className="size-7 text-[var(--color-muted)]" />
          <p className="mt-2 text-sm font-medium">Sube una imagen de portada</p>
          <p className="text-xs text-[var(--color-muted)]">JPG, PNG · 1280×720</p>
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </Card>

      <Card>
        <CardTitle className="mb-5">Precio y publicación</CardTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label>Precio</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" />
          </div>
          <div>
            <Label>Moneda</Label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm outline-none focus:border-[var(--color-violet)]"
            >
              {["USD", "MXN", "COP", "EUR"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Estado</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CourseVM["status"])}
              className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm outline-none focus:border-[var(--color-violet)]"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : null} Guardar cambios
        </Button>
        {saved ? (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--color-lime)]">
            <Check className="size-3.5" /> Guardado
          </span>
        ) : null}
      </div>
    </form>
  );
}

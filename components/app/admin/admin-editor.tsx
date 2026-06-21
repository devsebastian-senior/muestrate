"use client";

import { useState } from "react";
import { Plus, Video, GripVertical, Upload, Trash2, X } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

type Lesson = { id: string; title: string; hasVideo: boolean };
type Module = { id: string; title: string; lessons: Lesson[] };

const INITIAL: Module[] = [
  {
    id: "m1",
    title: "Fundamentos y mentalidad",
    lessons: [
      { id: "l1", title: "Bienvenida y mentalidad", hasVideo: true },
      { id: "l2", title: "Define tu propuesta de valor", hasVideo: true },
      { id: "l3", title: "Tu cliente ideal", hasVideo: false },
    ],
  },
  {
    id: "m2",
    title: "Estrategia de contenido",
    lessons: [{ id: "l4", title: "El framework de contenido viral", hasVideo: false }],
  },
];

let counter = 100;
const nextId = () => `x${++counter}`;

export function AdminEditor() {
  const [modules, setModules] = useState<Module[]>(INITIAL);
  const [uploadFor, setUploadFor] = useState<string | null>(null);

  function addModule() {
    setModules((m) => [...m, { id: nextId(), title: "Nuevo módulo", lessons: [] }]);
  }
  function addLesson(moduleId: string) {
    setModules((m) =>
      m.map((mod) =>
        mod.id === moduleId
          ? { ...mod, lessons: [...mod.lessons, { id: nextId(), title: "Nueva lección", hasVideo: false }] }
          : mod,
      ),
    );
  }
  function removeLesson(moduleId: string, lessonId: string) {
    setModules((m) =>
      m.map((mod) =>
        mod.id === moduleId ? { ...mod, lessons: mod.lessons.filter((l) => l.id !== lessonId) } : mod,
      ),
    );
  }
  function renameModule(id: string, title: string) {
    setModules((m) => m.map((mod) => (mod.id === id ? { ...mod, title } : mod)));
  }
  function renameLesson(moduleId: string, lessonId: string, title: string) {
    setModules((m) =>
      m.map((mod) =>
        mod.id === moduleId
          ? { ...mod, lessons: mod.lessons.map((l) => (l.id === lessonId ? { ...l, title } : l)) }
          : mod,
      ),
    );
  }

  return (
    <div className="space-y-5">
      {modules.map((mod, mi) => (
        <Card key={mod.id} className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <GripVertical className="size-4 text-[var(--color-muted)]" />
            <span className="font-mono text-sm text-gradient">
              {String(mi + 1).padStart(2, "0")}
            </span>
            <input
              value={mod.title}
              onChange={(e) => renameModule(mod.id, e.target.value)}
              className="flex-1 bg-transparent text-lg font-semibold outline-none focus:text-[var(--color-cyan)]"
            />
          </div>

          <div className="space-y-2">
            {mod.lessons.map((l) => (
              <div
                key={l.id}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
              >
                <Video
                  className={`size-4 shrink-0 ${l.hasVideo ? "text-[var(--color-lime)]" : "text-[var(--color-muted)]"}`}
                />
                <input
                  value={l.title}
                  onChange={(e) => renameLesson(mod.id, l.id, e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                <Button variant="outline" size="sm" onClick={() => setUploadFor(l.id)}>
                  <Upload className="size-3.5" /> {l.hasVideo ? "Reemplazar" : "Subir video"}
                </Button>
                <button
                  onClick={() => removeLesson(mod.id, l.id)}
                  className="grid size-8 place-items-center rounded-lg text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-fuchsia)]"
                  aria-label="Eliminar"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addLesson(mod.id)} className="mt-1">
              <Plus className="size-4" /> Añadir lección
            </Button>
          </div>
        </Card>
      ))}

      <Button variant="glass" onClick={addModule}>
        <Plus className="size-4" /> Añadir módulo
      </Button>

      {uploadFor ? <UploadModal onClose={() => setUploadFor(null)} /> : null}
    </div>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative z-10 w-full max-w-lg p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]"
        >
          <X className="size-4" />
        </button>
        <div className="mb-4 flex items-center gap-2 text-[var(--color-cyan)]">
          <Upload className="size-5" />
          <CardTitle>Subir video</CardTitle>
        </div>

        <label className="grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center transition-colors hover:border-[var(--color-violet)]">
          <Upload className="size-8 text-[var(--color-muted)]" />
          <p className="mt-3 text-sm font-medium">Arrastra tu video o haz clic</p>
          <p className="mt-1 text-xs text-[var(--color-muted)]">MP4, MOV · hasta 5 GB</p>
          <input type="file" accept="video/*" className="hidden" />
        </label>

        <div className="mt-4">
          <Label>O pega un enlace</Label>
          <Input placeholder="https://…" />
        </div>

        <p className="mt-4 text-xs text-[var(--color-muted)]">
          En modo demo no se sube. Al conectar Bunny Stream, el archivo se sube directo al CDN
          (TUS resumible) y se guarda el <span className="font-mono">videoId</span> en la lección.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onClose}>Subir</Button>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { FileText, Link2, FileArchive, NotebookPen, Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { LessonDetailVM } from "@/lib/data/types";

const ICON = { pdf: FileText, link: Link2, zip: FileArchive } as const;

export function LessonTabs({ resources }: { resources: LessonDetailVM["resources"] }) {
  return (
    <Tabs defaultValue="recursos">
      <TabsList>
        <TabsTrigger value="recursos">Recursos</TabsTrigger>
        <TabsTrigger value="notas">Mis notas</TabsTrigger>
        <TabsTrigger value="transcripcion">Transcripción</TabsTrigger>
      </TabsList>

      <TabsContent value="recursos">
        {resources.length ? (
          <div className="space-y-2">
            {resources.map((r) => {
              const Icon = ICON[r.type];
              return (
                <a
                  key={r.label}
                  href={r.href}
                  className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm transition-colors hover:border-[var(--color-violet)]"
                >
                  <Icon className="size-5 text-[var(--color-cyan)]" />
                  <span className="flex-1">{r.label}</span>
                  <span className="text-xs text-[var(--color-muted)]">Descargar</span>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-muted)]">Esta lección no tiene recursos.</p>
        )}
      </TabsContent>

      <TabsContent value="notas">
        <NotesEditor />
      </TabsContent>

      <TabsContent value="transcripcion">
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          La transcripción aparecerá aquí cuando el video esté subido y procesado. Se genera
          automáticamente con el proveedor de video (Bunny/Mux) y se indexa para búsqueda.
        </p>
      </TabsContent>
    </Tabs>
  );
}

function NotesEditor() {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setSaved(false);
        }}
        placeholder="Escribe tus notas de esta lección…"
        rows={6}
        className="w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm outline-none transition-colors focus:border-[var(--color-violet)]"
      />
      <div className="mt-3 flex items-center gap-3">
        <Button size="sm" onClick={() => setSaved(true)}>
          Guardar notas
        </Button>
        {saved ? (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--color-lime)]">
            <Check className="size-3.5" /> Guardado (local · se persiste al conectar DB)
          </span>
        ) : null}
        <NotebookPen className="ml-auto size-4 text-[var(--color-muted)]" />
      </div>
    </div>
  );
}

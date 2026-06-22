/**
 * Tipos y utilidades de usuario SIN dependencias de servidor.
 * Seguro de importar desde componentes cliente (no toca next/headers ni DB).
 */
export interface AppUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  isAdmin: boolean;
  hasAccess: boolean; // tiene entitlement activo (puede entrar al curso)
}

export const DEMO_USER: AppUser = {
  id: "demo",
  email: "demo@muestrate.com",
  name: "Alumno Demo",
  avatarUrl: null,
  isAdmin: true, // en demo mostramos también el panel admin
  hasAccess: true,
};

/** Iniciales para el avatar fallback. */
export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

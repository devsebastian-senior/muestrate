/**
 * Registro de proveedor de video activo.
 * Cambia aquí para migrar Bunny → Mux sin tocar el resto del código.
 */
import { bunnyProvider } from "./bunny";
import type { VideoProvider } from "./provider";

export const video: VideoProvider = bunnyProvider;

export * from "./provider";

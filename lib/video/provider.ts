/**
 * Contrato de proveedor de video.
 * Hoy: Bunny Stream. Mañana: Mux (solo implementas esta interfaz y cambias el registro).
 */

export interface SignedPlayback {
  /** URL del iframe embed firmado (player listo de Bunny). */
  embedUrl: string;
  /** URL HLS firmada (para player propio tipo hls.js / Vidstack). */
  hlsUrl: string;
  /** Poster / thumbnail. */
  thumbnailUrl: string;
  /** Epoch (segundos) en que expira la firma. */
  expires: number;
}

export interface CreatedVideo {
  videoId: string;
  /** Endpoint y headers para subir el archivo (PUT/TUS) desde el panel admin. */
  uploadUrl: string;
  uploadHeaders: Record<string, string>;
}

export interface VideoProvider {
  readonly id: "bunny" | "mux";
  /** Genera URLs de reproducción firmadas con expiración (acceso solo para quien pagó). */
  getSignedPlayback(videoId: string, ttlSeconds?: number): SignedPlayback;
  /** Crea un contenedor de video y devuelve a dónde subir el archivo. */
  createVideo(title: string): Promise<CreatedVideo>;
}

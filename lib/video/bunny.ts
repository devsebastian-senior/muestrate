/**
 * Implementación Bunny Stream.
 *
 * Seguridad: la reproducción usa Token Authentication. El token es un hash
 * SHA256 de (clave_secreta + ruta + expiración). Sin token válido y no expirado,
 * el CDN rechaza la petición → un alumno no puede compartir un .m3u8 público.
 *
 * Requiere activar "Token Authentication" en la Video Library de Bunny y usar
 * BUNNY_STREAM_TOKEN_AUTH_KEY (la "Token Authentication Key" de esa library).
 *
 * Ref formato token embed Bunny:
 *   token = sha256_hex(tokenAuthKey + videoId + expires)
 *   embed = https://iframe.mediadelivery.net/embed/{lib}/{videoId}?token=..&expires=..
 */
import { createHash } from "node:crypto";
import type { CreatedVideo, SignedPlayback, VideoProvider } from "./provider";

const IFRAME_BASE = "https://iframe.mediadelivery.net/embed";
const TUS_ENDPOINT = "https://video.bunnycdn.com/tusupload";

function cfg() {
  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID;
  const apiKey = process.env.BUNNY_STREAM_API_KEY;
  const cdnHostname = process.env.BUNNY_STREAM_CDN_HOSTNAME;
  const tokenKey = process.env.BUNNY_STREAM_TOKEN_AUTH_KEY;
  if (!libraryId || !cdnHostname) {
    throw new Error("Bunny Stream no configurado (revisa BUNNY_STREAM_* en .env.local)");
  }
  return { libraryId, apiKey, cdnHostname, tokenKey };
}

export const bunnyProvider: VideoProvider = {
  id: "bunny",

  getSignedPlayback(videoId: string, ttlSeconds = 60 * 60 * 4): SignedPlayback {
    const { libraryId, cdnHostname, tokenKey } = cfg();
    const expires = Math.floor(Date.now() / 1000) + ttlSeconds;

    // Token para el iframe embed.
    const embedToken = tokenKey
      ? createHash("sha256").update(tokenKey + videoId + expires).digest("hex")
      : "";
    const embedQuery = tokenKey ? `?token=${embedToken}&expires=${expires}` : "";

    // Token para HLS directo (firma de la ruta del playlist).
    const hlsPath = `/${videoId}/playlist.m3u8`;
    const hlsToken = tokenKey
      ? createHash("sha256").update(tokenKey + hlsPath + expires).digest("hex")
      : "";
    const hlsQuery = tokenKey ? `?token=${hlsToken}&expires=${expires}` : "";

    return {
      embedUrl: `${IFRAME_BASE}/${libraryId}/${videoId}${embedQuery}`,
      hlsUrl: `https://${cdnHostname}${hlsPath}${hlsQuery}`,
      thumbnailUrl: `https://${cdnHostname}/${videoId}/thumbnail.jpg`,
      expires,
    };
  },

  async createVideo(title: string): Promise<CreatedVideo> {
    const { libraryId, apiKey } = cfg();
    if (!apiKey) throw new Error("BUNNY_STREAM_API_KEY requerida para subir videos");

    // 1. Crea el contenedor de video → devuelve el GUID.
    const res = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
      method: "POST",
      headers: { AccessKey: apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error(`Bunny createVideo falló: ${res.status}`);
    const data = (await res.json()) as { guid: string };

    // 2. Devuelve datos para subida resumible (TUS) desde el panel admin.
    return {
      videoId: data.guid,
      uploadUrl: TUS_ENDPOINT,
      uploadHeaders: {
        AuthorizationSignature: "", // se calcula en el cliente de subida (TUS)
        LibraryId: libraryId,
        VideoId: data.guid,
      },
    };
  },
};

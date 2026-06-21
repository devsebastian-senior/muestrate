/**
 * Envío del email de acceso tras pago confirmado.
 * Usa la API REST de Resend (sin SDK extra). Si no hay RESEND_API_KEY,
 * loguea el enlace en consola (útil en dev / Fase 0).
 */
export async function sendAccessEmail(params: {
  to: string;
  courseTitle: string;
  magicLink: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Muéstrate <onboarding@resend.dev>";

  if (!apiKey) {
    console.log(`[email] (sin Resend) Acceso para ${params.to}: ${params.magicLink}`);
    return;
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;color:#0b0d1c">
      <h1 style="font-size:22px">¡Bienvenido a ${params.courseTitle}! 🎉</h1>
      <p>Tu pago fue confirmado. Ya tienes acceso de por vida al curso.</p>
      <p>Entra con este enlace seguro (no requiere contraseña):</p>
      <p style="margin:28px 0">
        <a href="${params.magicLink}"
           style="background:#7c5cff;color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:600">
          Entrar al curso
        </a>
      </p>
      <p style="color:#666;font-size:13px">Si el botón no funciona, copia y pega:<br>${params.magicLink}</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: params.to,
      subject: `Tu acceso a ${params.courseTitle}`,
      html,
    }),
  });

  if (!res.ok) console.error(`[email] Resend falló: ${res.status} ${await res.text()}`);
}

/**
 * Correo de confirmación de preventa. HTML con tablas y estilos en línea
 * para que se vea bien en Gmail, Outlook y Apple Mail.
 */

export type DatosCorreo = {
  email: string;
  nombre: string | null;
  universidad: string | null;
  sitio: string; // URL pública del sitio, sin / final
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function construirCorreo({ email, nombre, universidad, sitio }: DatosCorreo) {
  const saludo = nombre ? `Hola, ${nombre}. Ya estás en la lista.` : 'Hola. Ya estás en la lista.';
  const desde = universidad ? ` desde ${universidad}` : '';
  const subject = nombre ? `${nombre}, ya estás en la lista de De Raíz` : 'Ya estás en la lista de De Raíz';
  const logo = `${sitio}/logo-wordmark.png`;
  const separa = `${sitio}/separa`;

  const p = (t: string) => `<p style="margin:0 0 18px;font-size:17px;line-height:1.6;color:#33523F;">${t}</p>`;
  const fila = (a: string, b: string, borde: boolean) =>
    `<tr><td style="padding:14px 0;font-size:15px;color:#10301F;${borde ? 'border-top:1px solid #EEF4F0;' : ''}">${a}</td><td align="right" style="padding:14px 0;font-size:15px;color:#4A6656;${borde ? 'border-top:1px solid #EEF4F0;' : ''}">${b}</td></tr>`;

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#EEF6F1;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Gracias por contribuir a De Raíz. Te avisaremos cuando comience la producción.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF6F1;">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:20px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;">
    <tr><td align="center" style="padding:44px 24px;background:#CDEEF8;background-image:linear-gradient(180deg,#8ED2F2 0%,#CDEEF8 60%,#E9F7EF 100%);">
      <img src="${logo}" width="180" alt="De Raíz" style="display:block;width:180px;max-width:60%;height:auto;border:0;">
    </td></tr>
    <tr><td style="padding:40px 44px 36px;">
      <h1 style="margin:0 0 20px;font-size:30px;line-height:1.15;font-weight:600;letter-spacing:-0.02em;color:#10301F;">${esc(saludo)}</h1>
      ${p(`Gracias por contribuir a De Raíz${esc(desde)}. Tu correo <strong style="color:#10301F;">${esc(email)}</strong> quedó registrado en la preventa.`)}
      ${p('Estás contemplado para recibir tu kit en cuanto comience su producción. Antes de fabricar te escribiremos para confirmar tu pedido y la entrega en tu campus.')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 24px;border-top:1px solid #DDE9E1;border-bottom:1px solid #DDE9E1;">
        ${fila('Tote', 'pantalón y playera reutilizados', false)}
        ${fila('Base para laptop', 'plástico y fibra reciclados', true)}
        ${fila('Libreta', 'hojas recicladas engargoladas', true)}
      </table>
      ${p('Tu registro nos dice cuántos kits fabricar, así no producimos de más ni desperdiciamos material. Gracias por ayudar a que lo que se tira tenga una segunda vida.')}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 26px;"><tr><td style="border-radius:999px;background:#1A763C;">
        <a href="${separa}" style="display:inline-block;padding:15px 26px;font-size:16px;color:#FFFFFF;text-decoration:none;border-radius:999px;">Aprende a separar en 2 minutos</a>
      </td></tr></table>
      <p style="margin:0;font-size:16px;color:#10301F;">El equipo de De Raíz</p>
    </td></tr>
  </table>
  <p style="max-width:560px;margin:20px auto 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#4A6656;text-align:center;">Recibiste este correo porque registraste esta dirección en la preventa de De Raíz. Si no fuiste tú, ignóralo y no te volveremos a escribir. Hecho en la CDMX.</p>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    saludo,
    '',
    `Gracias por contribuir a De Raíz${desde}. Tu correo ${email} quedó registrado en la preventa.`,
    '',
    'Estás contemplado para recibir tu kit en cuanto comience su producción. Antes de fabricar te escribiremos para confirmar tu pedido y la entrega en tu campus.',
    '',
    'Tu kit: tote, base para laptop y libreta, hechas con material rescatado.',
    '',
    'Tu registro nos dice cuántos kits fabricar, así no producimos de más ni desperdiciamos material.',
    '',
    `Aprende a separar en 2 minutos: ${separa}`,
    '',
    'El equipo de De Raíz'
  ].join('\n');

  return { subject, html, text };
}

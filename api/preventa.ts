import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { validarCorreo } from '../src/lib/institucional.js';
import { construirCorreo } from './_lib/correo.js';

/**
 * POST /api/preventa  { email }
 * Valida que sea correo institucional, lo registra (si hay DATABASE_URL)
 * y manda el correo de confirmación personalizado con Resend.
 *
 * Variables de entorno:
 *   RESEND_API_KEY   (requerida)
 *   FROM_EMAIL       (requerida) p. ej. "De Raíz <hola@deraiz.mx>", dominio verificado en Resend
 *   SITE_URL         URL pública del sitio, p. ej. https://facu100201.github.io/De-Ra-z
 *   ALLOWED_ORIGINS  orígenes permitidos para CORS, separados por coma
 *   REPLY_TO         correo al que llegan las respuestas
 *   DATABASE_URL     Postgres (Neon). Si está, guarda registros y evita duplicados
 *   NOTIFY_TO        si está, avisa al equipo de cada registro nuevo
 *   EXTRA_DOMAINS    dominios institucionales extra, separados por coma
 */

const list = (v?: string) => (v ?? '').split(',').map((s) => s.trim()).filter(Boolean);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origins = list(process.env.ALLOWED_ORIGINS || 'https://facu100201.github.io,http://localhost:5173');
  const origin = String(req.headers.origin ?? '');
  if (origins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Método no permitido.' });
  if (origin && !origins.includes(origin)) return res.status(403).json({ ok: false, error: 'Origen no permitido.' });

  const body = (typeof req.body === 'string' ? safeJson(req.body) : req.body) ?? {};
  // Campo trampa: si un bot lo llena, respondemos ok sin hacer nada
  if (body.empresa) return res.status(200).json({ ok: true });

  const v = validarCorreo(String(body.email ?? ''), list(process.env.EXTRA_DOMAINS));
  if (!v.ok) return res.status(422).json({ ok: false, error: v.error });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Falta RESEND_API_KEY o FROM_EMAIL');
    return res.status(500).json({ ok: false, error: 'La preventa no está configurada todavía.' });
  }

  try {
    // Registro y deduplicación (opcional)
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`
        insert into preventa (email, dominio, universidad)
        values (${v.email}, ${v.dominio}, ${v.universidad})
        on conflict (email) do nothing
        returning id`;
      if (rows.length === 0) return res.status(200).json({ ok: true, yaRegistrado: true });
    }

    const sitio = (process.env.SITE_URL || 'https://facu100201.github.io/De-Ra-z').replace(/\/$/, '');
    const correo = construirCorreo({ email: v.email, nombre: v.nombre, universidad: v.universidad, sitio });
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: v.email,
      subject: correo.subject,
      html: correo.html,
      text: correo.text,
      replyTo: process.env.REPLY_TO || undefined
    });
    if (error) {
      console.error('Resend:', error);
      return res.status(502).json({ ok: false, error: 'No pudimos enviar el correo. Intenta de nuevo en un momento.' });
    }

    if (process.env.NOTIFY_TO) {
      await resend.emails
        .send({ from, to: list(process.env.NOTIFY_TO), subject: `Nuevo registro en preventa: ${v.email}`, text: `${v.email}${v.universidad ? ` (${v.universidad})` : ''}` })
        .catch((e) => console.error('Aviso al equipo:', e));
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: 'Algo falló de nuestro lado. Intenta de nuevo.' });
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return null; }
}

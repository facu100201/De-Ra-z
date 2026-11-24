/**
 * Validación de correos institucionales. La usan el formulario y la API,
 * así las reglas no se desincronizan.
 */

const PERSONALES = ['gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.es', 'outlook.com', 'outlook.es', 'live.com', 'live.com.mx', 'yahoo.com', 'yahoo.com.mx', 'icloud.com', 'me.com', 'proton.me', 'protonmail.com', 'aol.com'];

/** Dominio → cómo nombrarla en el correo ("desde la UNAM") */
export const UNIVERSIDADES: Record<string, string> = {
  'unam.mx': 'la UNAM',
  'ipn.mx': 'el IPN',
  'uam.mx': 'la UAM',
  'tec.mx': 'el Tec',
  'itesm.mx': 'el Tec',
  'ibero.mx': 'la Ibero',
  'anahuac.mx': 'la Anáhuac',
  'itam.mx': 'el ITAM',
  'lasalle.mx': 'La Salle',
  'ulsa.mx': 'La Salle',
  'up.edu.mx': 'la Panamericana',
  'udg.mx': 'la UdeG',
  'uanl.mx': 'la UANL',
  'buap.mx': 'la BUAP',
  'udlap.mx': 'la UDLAP',
  'uaemex.mx': 'la UAEMéx',
  'uacm.edu.mx': 'la UACM',
  'uvmnet.edu': 'la UVM',
  'unitec.edu.mx': 'UNITEC'
};

const coincide = (dom: string, base: string) => dom === base || dom.endsWith('.' + base);

export type Resultado =
  | { ok: true; email: string; dominio: string; nombre: string | null; universidad: string | null }
  | { ok: false; error: string };

export function validarCorreo(raw: string, extras: string[] = []): Resultado {
  const email = raw.trim().toLowerCase();
  if (email.length > 254 || !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(email)) {
    return { ok: false, error: 'Escribe un correo válido.' };
  }
  const [local, dominio] = email.split('@');
  if (PERSONALES.some((d) => coincide(dominio, d))) {
    return { ok: false, error: 'Usa el correo de tu universidad, no uno personal.' };
  }
  const uniKey = Object.keys(UNIVERSIDADES).find((d) => coincide(dominio, d));
  const esEdu = /\.edu(\.[a-z]{2})?$/.test(dominio);
  const extra = extras.some((d) => coincide(dominio, d));
  if (!uniKey && !esEdu && !extra) {
    return { ok: false, error: 'Ese dominio no parece de una universidad. Usa tu correo institucional.' };
  }
  return { ok: true, email, dominio, nombre: adivinarNombre(local), universidad: uniKey ? UNIVERSIDADES[uniKey] : null };
}

/** "valeria.ruiz" → "Valeria". Si parece matrícula o algo raro, no inventa nada. */
export function adivinarNombre(local: string): string | null {
  const m = /^([a-záéíóúñü]{2,20})[._-][a-záéíóúñü]/i.exec(local);
  if (!m) return null;
  const n = m[1].toLowerCase();
  return n.charAt(0).toUpperCase() + n.slice(1);
}

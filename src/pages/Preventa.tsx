import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Pagina } from '../components/Navegacion';
import { validarCorreo } from '../lib/institucional';

const API = import.meta.env.VITE_PREVENTA_API as string | undefined;

type Estado = 'formulario' | 'enviando' | 'listo';

export default function Preventa() {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [estado, setEstado] = useState<Estado>('formulario');
  const [yaEstaba, setYaEstaba] = useState(false);
  const [trampa, setTrampa] = useState('');

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (estado === 'enviando') return;
    const v = validarCorreo(correo);
    if (!v.ok) { setError(v.error); return; }
    if (!API) { setError('La preventa todavía no está conectada. Vuelve en unos días.'); return; }
    setError('');
    setEstado('enviando');
    try {
      const r = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v.email, empresa: trampa })
      });
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string; yaRegistrado?: boolean };
      if (!r.ok || !data.ok) throw new Error(data.error || 'No pudimos registrar tu correo. Intenta de nuevo.');
      setCorreo(v.email);
      setYaEstaba(Boolean(data.yaRegistrado));
      setEstado('listo');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos registrar tu correo. Intenta de nuevo.');
      setEstado('formulario');
    }
  }

  return (
    <Pagina>
      {estado !== 'listo' ? (
        <section style={{ maxWidth: 680, margin: '0 auto', padding: '56px 20px 130px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
          <p className="ey">Preventa universitaria</p>
          <h1 className="display">Aparta tu kit.</h1>
          <p className="lead">Déjanos tu correo institucional. Te avisamos cuando arranque la producción, sin pagar nada hoy.</p>
          <form onSubmit={enviar} noValidate aria-label="Preventa" style={{ width: '100%', maxWidth: 540, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
            <label htmlFor="pvCorreo" style={{ fontSize: 14, color: 'var(--ink-3)', paddingLeft: 22 }}>Correo institucional</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <input
                id="pvCorreo"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="off"
                spellCheck={false}
                required
                placeholder="tu.nombre@alumno.unam.mx"
                aria-describedby="pvAyuda"
                aria-invalid={error ? true : undefined}
                value={correo}
                onChange={(e) => { setCorreo(e.target.value); setError(''); }}
                style={{ flex: '1 1 260px', minHeight: 56, padding: '0 22px', borderRadius: 999, border: `1px solid ${error ? '#C2410C' : 'rgba(16,48,31,.18)'}`, background: 'rgba(255,255,255,.85)', font: '400 17px var(--font)', color: 'var(--ink)', boxShadow: '0 8px 24px rgba(14,72,70,.08)' }}
              />
              <button type="submit" className="btn" disabled={estado === 'enviando'} style={{ flex: '1 1 140px' }}>
                {estado === 'enviando' ? 'Enviando…' : 'Apartar mi kit'}
              </button>
            </div>
            {/* Campo trampa para bots: invisible para personas */}
            <input type="text" name="empresa" tabIndex={-1} autoComplete="off" value={trampa} onChange={(e) => setTrampa(e.target.value)} className="sr-only" aria-hidden="true" />
            {error && <p role="alert" style={{ paddingLeft: 22, fontSize: 15, color: '#A3400A' }}>{error}</p>}
            <p id="pvAyuda" className="small" style={{ paddingLeft: 22 }}>Solo correos de universidad: .edu.mx, unam.mx, ipn.mx, uam.mx y similares. Nada de spam.</p>
          </form>
          <p className="small" style={{ marginTop: 8 }}>Al registrarte aceptas nuestro <Link to="/nosotros#politicas">aviso de privacidad</Link>.</p>
        </section>
      ) : (
        <section style={{ maxWidth: 640, margin: '0 auto', padding: '64px 20px 130px', display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center', textAlign: 'center' }}>
          <div className="pop" aria-hidden="true" style={{ width: 96, height: 96, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--green)', background: 'rgba(47,161,84,.08)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A763C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /></svg>
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 11vw, 80px)', lineHeight: 1 }}>{yaEstaba ? 'Ya estabas en la lista.' : 'Revisa tu correo.'}</h1>
          <p role="status" className="lead" style={{ maxWidth: 560 }}>
            {yaEstaba
              ? <>Tu correo <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>{correo}</strong> ya estaba registrado. Te escribiremos cuando arranque la producción.</>
              : <>Ya estás en la lista. Te mandamos la confirmación a <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>{correo}</strong>. Si no llega en unos minutos, búscala en spam o promociones.</>}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26, justifyContent: 'center' }}>
            <Link className="lk" to="/separa">Mientras, aprende a separar →</Link>
            <button type="button" className="lk" onClick={() => { setEstado('formulario'); setCorreo(''); setYaEstaba(false); }}>Usar otro correo</button>
          </div>
        </section>
      )}
    </Pagina>
  );
}

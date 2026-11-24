import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Pagina } from '../components/Navegacion';
import { validarCorreo } from '../lib/institucional';

// Endpoint en Vercel. Se puede sobrescribir con VITE_PREVENTA_API.
const API = import.meta.env.VITE_PREVENTA_API || 'https://de-raiz-beta.vercel.app/api/preventa';

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
        <section className="sec" style={{ maxWidth: 600, margin: '0 auto', paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
          <p className="ey">Preventa universitaria</p>
          <h1 className="display">Aparta tu kit.</h1>
          <p className="lead">Déjanos tu correo institucional. Te avisamos cuando arranque la producción, sin pagar nada hoy.</p>
          <form onSubmit={enviar} noValidate aria-label="Preventa" style={{ width: '100%', maxWidth: 480, marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            <label htmlFor="pvCorreo" style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-3)', paddingLeft: 18 }}>Correo institucional</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
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
                style={{ flex: '1 1 240px', minHeight: 44, padding: '0 18px', borderRadius: 999, border: `1px solid ${error ? '#C2410C' : 'rgba(28,46,34,.18)'}`, background: 'rgba(255,255,255,.85)', font: '400 var(--fs-base) var(--font)', color: 'var(--ink)', boxShadow: '0 6px 18px rgba(28,46,34,.07)' }}
              />
              <button type="submit" className="btn" disabled={estado === 'enviando'} style={{ flex: '1 1 130px' }}>
                {estado === 'enviando' ? 'Enviando…' : 'Apartar mi kit'}
              </button>
            </div>
            {/* Campo trampa para bots: invisible para personas */}
            <input type="text" name="empresa" tabIndex={-1} autoComplete="off" value={trampa} onChange={(e) => setTrampa(e.target.value)} className="sr-only" aria-hidden="true" />
            {error && <p role="alert" style={{ paddingLeft: 18, fontSize: 'var(--fs-sm)', color: '#A3400A' }}>{error}</p>}
            <p id="pvAyuda" className="small" style={{ paddingLeft: 18 }}>Solo correos de universidad: .edu.mx, unam.mx, ipn.mx, uam.mx y similares. Nada de spam.</p>
          </form>
          <p className="small" style={{ marginTop: 6 }}>Al registrarte aceptas nuestro <Link to="/nosotros#politicas">aviso de privacidad</Link>.</p>
        </section>
      ) : (
        <section className="sec" style={{ maxWidth: 560, margin: '0 auto', paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', textAlign: 'center' }}>
          <div className="pop" aria-hidden="true" style={{ width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--green)', background: 'rgba(47,107,58,.07)', marginBottom: 6 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2F6B3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /></svg>
          </div>
          <h1 className="display">{yaEstaba ? 'Ya estabas en la lista.' : 'Revisa tu correo.'}</h1>
          <p role="status" className="lead" style={{ maxWidth: 460 }}>
            {yaEstaba
              ? <>Tu correo <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>{correo}</strong> ya estaba registrado. Te escribiremos cuando arranque la producción.</>
              : <>Ya estás en la lista. Te mandamos la confirmación a <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>{correo}</strong>. Si no llega en unos minutos, búscala en spam o promociones.</>}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, justifyContent: 'center', marginTop: 6 }}>
            <Link className="lk" to="/separa">Mientras, aprende a separar</Link>
            <button type="button" className="lk" onClick={() => { setEstado('formulario'); setCorreo(''); setYaEstaba(false); }}>Usar otro correo</button>
          </div>
        </section>
      )}
    </Pagina>
  );
}

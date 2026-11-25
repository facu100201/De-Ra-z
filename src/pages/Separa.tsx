import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Pagina } from '../components/Navegacion';
import JuegoSepara from '../components/juego/JuegoSepara';

const guia = [
  { t: 'Verde', c: '#2E9A4B', d: 'Comida, cáscaras, café y té, jardín.' },
  { t: 'Gris', c: '#6B7785', d: 'Papel, cartón, PET, latas, vidrio, textiles. Limpio, seco y aplastado.' },
  { t: 'Naranja', c: '#E0700F', d: 'Unicel, colillas, frituras, sanitarios.' }
];

export default function Separa() {
  return (
    <Pagina>
      <section className="wrap" style={{ position: 'relative', padding: '24px 20px var(--sp-section)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
        <div className="bub px" aria-hidden="true" style={{ '--p': '60px', width: 36, height: 36, right: '8%', top: 96 } as CSSProperties} />
        <div className="bub px" aria-hidden="true" style={{ '--p': '80px', width: 20, height: 20, left: '5%', top: 210 } as CSSProperties} />
        <p className="ey">Separa bien en la CDMX</p>
        <h1 className="display">¿A qué bote va?</h1>
        <p className="lead" style={{ maxWidth: 420, marginBottom: 10 }}>Desde 2026 separar es obligatorio en la CDMX. Aprende jugando: atrapa cada residuo en su bote.</p>
        <JuegoSepara />
        <Link className="lk" to="/ciclo" style={{ marginTop: 10 }}>Sigue: cierra el ciclo</Link>
      </section>

      <section className="wrap" style={{ padding: '0 20px 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '0 32px' }}>
        {guia.map((g) => (
          <div key={g.t} className="rv" style={{ padding: '14px 0 18px', borderTop: `2px solid ${g.c}` }}>
            <h2 className="h3">{g.t}</h2>
            <p style={{ marginTop: 6, fontSize: 'var(--fs-base)', lineHeight: 1.5, color: 'var(--ink-2)' }}>{g.d}</p>
          </div>
        ))}
      </section>
      <p className="small wrap" style={{ marginTop: -40, paddingBottom: 'var(--sp-section)' }}>Basado en la NADF-024-AMBT-2013. Revisa los días de recolección de tu alcaldía.</p>
    </Pagina>
  );
}

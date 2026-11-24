import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arte, { type Pieza } from '../components/Arte';
import CiudadFondo from '../components/CiudadFondo';
import { BarraMovil, Pagina } from '../components/Navegacion';

const piezas: { id: Pieza; nombre: string; sub: string; delay: string }[] = [
  { id: 'tote', nombre: 'Tote patchwork', sub: 'Retazos de mezclilla y algodón', delay: '0s' },
  { id: 'base', nombre: 'Base para laptop', sub: 'Plástico y fibra reciclados', delay: '-2s' },
  { id: 'libreta', nombre: 'Libreta', sub: 'Papel posconsumo y cartón', delay: '-4s' }
];

const pasos = [
  { n: '01', t: 'Separas.', c: '#1A763C' },
  { n: '02', t: 'Recuperamos.', c: '#0B6A86' },
  { n: '03', t: 'Transformamos.', c: '#B4560B' },
  { n: '04', t: 'Nos lo regresas.', c: '#5B3FC4', gt: true }
];

const marquee = (
  <span style={{ paddingRight: 48 }}>
    Retazos <span style={{ color: 'var(--green)' }}>→ Tote bag</span> · Cartón <span style={{ color: 'var(--green)' }}>→ Pastas</span> · Papel{' '}
    <span style={{ color: 'var(--green)' }}>→ Libreta</span> · Plástico <span style={{ color: 'var(--green)' }}>→ Base laptop</span> ·{' '}
  </span>
);

const bub = (s: CSSProperties & { '--p'?: string }) => <div className="bub px" aria-hidden="true" style={s as CSSProperties} />;

export default function Inicio() {
  return (
    <Pagina sky={false} barraEnHero>
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 'max(780px, min(100svh, 940px))', display: 'flex', flexDirection: 'column' }}>
        <CiudadFondo />
        <BarraMovil />
        <div className="nav-d" aria-hidden="true" style={{ height: 78 }} />
        <div className="wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p className="ey" style={{ color: '#0F5427' }}>Kit universitario · CDMX</p>
          <h1 className="display" style={{ maxWidth: 760 }}>Lo que tiras puede tener una segunda vida.</h1>
          <p className="lead" style={{ color: '#1D3D2B', maxWidth: 420 }}>Tote, base para laptop y libreta, hechas con material rescatado.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22 }}>
            <Link className="btn" to="/preventa">Aparta tu kit</Link>
            <Link className="lk" to="/kit">Ver el kit →</Link>
          </div>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(244,250,242,0), var(--page))' }} />
      </section>

      <div style={{ borderTop: '1px solid rgba(16,48,31,.12)', borderBottom: '1px solid rgba(16,48,31,.12)', overflow: 'hidden', background: 'rgba(255,255,255,.45)' }}>
        <p className="sr-only">Retazos se vuelven tote bag; cartón, pastas; papel, libreta; plástico, base para laptop.</p>
        <div className="mq" aria-hidden="true" style={{ display: 'flex', width: 'max-content', padding: '18px 0', fontSize: 26, whiteSpace: 'nowrap' }}>
          {marquee}{marquee}
        </div>
      </div>

      <section className="wrap" style={{ position: 'relative', padding: '120px 20px 110px', textAlign: 'center' }}>
        {bub({ '--p': '140px', width: 90, height: 90, left: '6%', top: 60 })}
        {bub({ '--p': '60px', width: 40, height: 40, right: '12%', top: 120 })}
        {bub({ '--p': '200px', width: 64, height: 64, right: '4%', bottom: 40 })}
        <p className="px gt" style={{ '--p': '50px', fontWeight: 500, fontSize: 'clamp(132px, 38vw, 340px)', lineHeight: 0.9, letterSpacing: '-.05em' } as CSSProperties}>14%</p>
        <p className="rv" style={{ margin: '18px auto 0', maxWidth: 520, fontSize: 'clamp(24px, 5.6vw, 36px)', lineHeight: 1.2 }}>
          es lo único que se recicla en México. Lo demás, nosotros lo vemos como materia prima.
        </p>
        <p className="small" style={{ marginTop: 18, fontSize: 12 }}>Fuente: UNAM Global</p>
      </section>

      <section className="wrap" style={{ padding: '40px 20px 100px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 className="h2 rv">Tres piezas que sí usas.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '44px 28px' }}>
          {piezas.map((p) => (
            <Link key={p.id} to={`/kit?pieza=${p.id}`} className="rv" style={{ textDecoration: 'none', color: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
              <div className="fl" style={{ width: '72%', maxWidth: 260, animationDelay: p.delay }}><Arte pieza={p.id} decorativa /></div>
              <h3 style={{ fontSize: 26 }}>{p.nombre}</h3>
              <span style={{ fontSize: 15, color: 'var(--ink-2)' }}>{p.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ padding: '40px 20px 100px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <p className="ey">El ciclo</p>
        <ol className="hl-list">
          {pasos.map((s) => (
            <li key={s.n} className="rv" style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '14px 0' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: s.c }}>{s.n}</span>
              <span className={s.gt ? 'gt' : undefined} style={{ fontSize: 'clamp(36px, 9vw, 72px)', lineHeight: 1.05, letterSpacing: '-.04em' }}>{s.t}</span>
            </li>
          ))}
        </ol>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26 }}>
          <Link className="lk" to="/ciclo">Cómo cerramos el ciclo →</Link>
          <Link className="lk" to="/separa">Aprende a separar →</Link>
        </div>
      </section>

      <section className="wrap" style={{ position: 'relative', padding: '60px 20px 130px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center' }}>
        {bub({ '--p': '90px', width: 120, height: 120, left: -30, top: 20 })}
        <h2 className="display rv">Aparta el tuyo.</h2>
        <p style={{ fontSize: 17, color: 'var(--ink-2)' }}>Solo con tu correo institucional. Sin pagar nada hoy.</p>
        <Link className="btn" to="/preventa">Ir a la preventa</Link>
      </section>
    </Pagina>
  );
}

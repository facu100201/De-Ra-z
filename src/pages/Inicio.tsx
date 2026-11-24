import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arte, { type Pieza } from '../components/Arte';
import Marquee from '../components/Marquee';
import { Pagina } from '../components/Navegacion';
import ScrollExpand from '../components/ScrollExpand';

const piezas: { id: Pieza; nombre: string; sub: string; delay: string }[] = [
  { id: 'tote', nombre: 'Tote patchwork', sub: 'Retazos de mezclilla y algodón', delay: '0s' },
  { id: 'base', nombre: 'Base para laptop', sub: 'Plástico y fibra reciclados', delay: '-2s' },
  { id: 'libreta', nombre: 'Libreta', sub: 'Papel posconsumo y cartón', delay: '-4s' }
];

const pasos = [
  { n: '01', t: 'Separas.', c: '#2F6B3A' },
  { n: '02', t: 'Recuperamos.', c: '#8A6236' },
  { n: '03', t: 'Transformamos.', c: '#A4561A' },
  { n: '04', t: 'Nos lo regresas.', c: '#5E7A3A', gt: true }
];

const materiales = [
  ['Retazos', 'Tote bag'],
  ['Cartón', 'Pastas'],
  ['Papel', 'Libreta'],
  ['Plástico', 'Base laptop']
].map(([de, a]) => (
  <>
    {de} <span style={{ color: 'var(--green)' }}>→ {a}</span>
  </>
));

const bub = (s: CSSProperties & { '--p'?: string }) => <div className="bub px" aria-hidden="true" style={s as CSSProperties} />;

export default function Inicio() {
  return (
    <Pagina sky={false} flush>
      <ScrollExpand
        src={`${import.meta.env.BASE_URL}hero.webp`}
        alt="Bolsa de papel kraft, hojas verdes, frascos de vidrio ámbar y un sobre sobre un fondo verde claro"
        scrollHint="Desliza para abrir"
        title={<h1 className="display" style={{ maxWidth: 640 }}>Lo que tiras puede tener una segunda vida.</h1>}
      >
        <p className="ey" style={{ color: 'var(--leaf-dark)' }}>Kit universitario, hecho en la CDMX</p>
        <h2 className="h2" style={{ maxWidth: 560, marginTop: 12 }}>Tote, base para laptop y libreta, hechas con material rescatado.</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 24 }}>
          <Link className="btn" to="/preventa">Aparta tu kit</Link>
          <Link className="lk" to="/kit">Ver el kit</Link>
        </div>
      </ScrollExpand>

      <Marquee
        items={materiales}
        label="Retazos se vuelven tote bag; cartón, pastas; papel, libreta; plástico, base para laptop."
        duration={60}
        repeat={6}
        style={{ background: 'var(--paper)', padding: '12px 0', fontSize: 17, letterSpacing: '-.01em' }}
      />

      <section className="wrap sec" style={{ position: 'relative', textAlign: 'center' }}>
        {bub({ '--p': '100px', width: 60, height: 60, left: '6%', top: 40 })}
        {bub({ '--p': '50px', width: 28, height: 28, right: '12%', top: 90 })}
        {bub({ '--p': '140px', width: 44, height: 44, right: '4%', bottom: 30 })}
        <p className="px gt stat" style={{ '--p': '36px' } as CSSProperties}>14%</p>
        <p className="rv body-lg" style={{ margin: '14px auto 0', maxWidth: 440 }}>
          es lo único que se recicla en México. Lo demás, nosotros lo vemos como materia prima.
        </p>
        <p className="small" style={{ marginTop: 14 }}>Fuente: UNAM Global</p>
      </section>

      <section className="wrap sec" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <h2 className="h2 rv">Tres piezas que sí usas.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px 24px' }}>
          {piezas.map((p) => (
            <Link key={p.id} to={`/kit?pieza=${p.id}`} className="rv" style={{ textDecoration: 'none', color: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
              <div className="fl" style={{ width: '56%', maxWidth: 176, marginBottom: 4, animationDelay: p.delay }}><Arte pieza={p.id} decorativa /></div>
              <h3 className="h3">{p.nombre}</h3>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-2)' }}>{p.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p className="ey">El ciclo</p>
        <ol className="hl-list">
          {pasos.map((s) => (
            <li key={s.n} className="rv" style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '10px 0' }}>
              <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 500, color: s.c }}>{s.n}</span>
              <span className={s.gt ? 'gt' : undefined} style={{ fontSize: 'clamp(24px, 5.4vw, 40px)', lineHeight: 1.1, letterSpacing: '-.035em' }}>{s.t}</span>
            </li>
          ))}
        </ol>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26 }}>
          <Link className="lk" to="/ciclo">Cómo cerramos el ciclo</Link>
          <Link className="lk" to="/separa">Aprende a separar</Link>
        </div>
      </section>

      <section className="wrap sec" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
        {bub({ '--p': '70px', width: 72, height: 72, left: 0, top: 30 })}
        <h2 className="display rv">Aparta el tuyo.</h2>
        <p style={{ fontSize: 'var(--fs-md)', color: 'var(--ink-2)', marginBottom: 6 }}>Solo con tu correo institucional. Sin pagar nada hoy.</p>
        <Link className="btn" to="/preventa">Ir a la preventa</Link>
      </section>
    </Pagina>
  );
}

import type { CSSProperties } from 'react';
import Arte from '../components/Arte';
import { Pagina } from '../components/Navegacion';

const CONTACTO = import.meta.env.VITE_CONTACTO ?? 'hola@deraiz.mx';

const nodos = [
  { t: 'Separas', left: '50%', top: '15.8%', bg: 'radial-gradient(circle at 35% 28%, #A9CF8F, #2F6B3A 70%)' },
  { t: 'Recupe­ramos', left: '84.2%', top: '50%', bg: 'radial-gradient(circle at 35% 28%, #E2C9A6, #8A6236 70%)' },
  { t: 'Transfor­mamos', left: '50%', top: '84.2%', bg: 'radial-gradient(circle at 35% 28%, #F0C38E, #A4561A 70%)' },
  { t: 'Regresas', left: '15.8%', top: '50%', bg: 'radial-gradient(circle at 35% 28%, #C9D7A8, #5E7A3A 70%)' }
];

const pasos = [
  { n: '01', c: '#2F6B3A', t: 'Tráelo a un punto De Raíz', d: 'En tu campus o en una entrega.' },
  { n: '02', c: '#8A6236', t: 'Primero, lo reparamos', d: 'Si una costura o un encastre tiene arreglo.' },
  { n: '03', c: '#A4561A', t: 'Si no, lo separamos', d: 'Cada material va a su reciclaje.' },
  { n: '04', c: '#5E7A3A', t: 'Te llevas un descuento', d: 'En tu siguiente kit.' }
];

export default function Ciclo() {
  return (
    <Pagina>
      <section className="wrap" style={{ padding: '24px 20px var(--sp-section)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '32px 56px' }}>
        <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p className="ey">Cierra el ciclo</p>
          <h1 className="display">Nada debería terminar en la basura.</h1>
          <p className="lead" style={{ maxWidth: 380 }}>Regrésanos tu kit al final de su vida y te damos un descuento en el siguiente.</p>
        </div>
        <div style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}>
          <div aria-hidden="true" style={{ position: 'relative', width: 'min(100%, 480px)', aspectRatio: '1', containerType: 'inline-size' }}>
            <div style={{ position: 'absolute', inset: '14.2%', borderRadius: '50%', border: '2px dashed rgba(47,107,58,.3)' }} />
            <div className="fl" style={{ position: 'absolute', left: '31.6%', top: '31.6%', width: '36.8%' }}><Arte pieza="tote" decorativa /></div>
            <div className="sp" style={{ position: 'absolute', inset: 0 }}>
              {nodos.map((n) => (
                <div key={n.t} className="node" style={{ position: 'absolute', left: n.left, top: n.top, width: '28.4%', aspectRatio: '1', transform: 'translate(-50%, -50%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6%', textAlign: 'center', fontSize: 'clamp(11px, 3.5cqw, 16px)', fontWeight: 500, lineHeight: 1.1, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,.35)', background: n.bg, boxShadow: 'inset 0 -10px 16px rgba(0,0,0,.2), inset 0 8px 12px rgba(255,255,255,.5), 0 14px 28px rgba(28,46,34,.22)' }}>
                  <span>{n.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'var(--sp-section)' }}>
        <h2 className="h2 rv" style={{ marginBottom: 18 }}>Cómo regresarlo.</h2>
        <ol className="hl-list">
          {pasos.map((p) => (
            <li key={p.n} className="rv" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0, 1fr)', gap: 10, padding: '14px 0' }}>
              <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 500, color: p.c, paddingTop: 3 }}>{p.n}</span>
              <div>
                <h3 className="h3">{p.t}</h3>
                <p style={{ marginTop: 2, fontSize: 'var(--fs-sm)', color: 'var(--ink-2)' }}>{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap sec" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="bub px" aria-hidden="true" style={{ '--p': '80px', width: 52, height: 52, left: '6%', top: 30 } as CSSProperties} />
        <div className="bub px" aria-hidden="true" style={{ '--p': '40px', width: 24, height: 24, right: '10%', top: 80 } as CSSProperties} />
        <p className="px gt stat" style={{ '--p': '30px' } as CSSProperties}>0 kg</p>
        <p className="rv body-lg" style={{ margin: '12px auto 0', maxWidth: 420 }}>rescatados por ahora. Empezamos a contar con el primer lote.</p>
        <div style={{ marginTop: 22 }}><a className="lk" href={`mailto:${CONTACTO}?subject=Punto%20de%20acopio%20en%20mi%20campus`}>Quiero un punto de acopio en mi campus</a></div>
      </section>
    </Pagina>
  );
}

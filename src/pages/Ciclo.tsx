import type { CSSProperties } from 'react';
import Arte from '../components/Arte';
import { Pagina } from '../components/Navegacion';

const CONTACTO = import.meta.env.VITE_CONTACTO ?? 'hola@deraiz.mx';

const nodos = [
  { t: 'Separas', left: '50%', top: 38, bg: 'radial-gradient(circle at 35% 28%, #9BE3A9, #1F8243 70%)' },
  { t: 'Recupe­ramos', left: 202, top: '50%', bg: 'radial-gradient(circle at 35% 28%, #9FE4F5, #0B6A86 70%)' },
  { t: 'Transfor­mamos', left: '50%', top: 202, bg: 'radial-gradient(circle at 35% 28%, #F9DA8A, #B4560B 70%)' },
  { t: 'Regresas', left: 38, top: '50%', bg: 'radial-gradient(circle at 35% 28%, #C7B6F7, #5B3FC4 70%)' }
];

const pasos = [
  { n: '01', c: '#1A763C', t: 'Tráelo a un punto De Raíz', d: 'En tu campus o en una entrega.' },
  { n: '02', c: '#0B6A86', t: 'Primero, lo reparamos', d: 'Si una costura o un encastre tiene arreglo.' },
  { n: '03', c: '#B4560B', t: 'Si no, lo separamos', d: 'Cada material va a su reciclaje.' },
  { n: '04', c: '#5B3FC4', t: 'Te llevas un descuento', d: 'En tu siguiente kit.' }
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
        <div style={{ flex: '1 1 260px', display: 'flex', justifyContent: 'center' }}>
          <div aria-hidden="true" style={{ position: 'relative', width: 240, height: 240 }}>
            <div style={{ position: 'absolute', inset: 34, borderRadius: '50%', border: '2px dashed rgba(11,106,134,.35)' }} />
            <div className="fl" style={{ position: 'absolute', left: '50%', top: '50%', width: 88, margin: '-44px 0 0 -44px' }}><Arte pieza="tote" decorativa /></div>
            <div className="sp" style={{ position: 'absolute', inset: 0 }}>
              {nodos.map((n) => (
                <div key={n.t} className="node" style={{ position: 'absolute', left: n.left, top: n.top, width: 68, height: 68, margin: '-34px 0 0 -34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 10.5, fontWeight: 500, lineHeight: 1.1, color: '#fff', textShadow: '0 1px 1px rgba(0,0,0,.35)', background: n.bg, boxShadow: 'inset 0 -6px 10px rgba(0,0,0,.2), inset 0 5px 7px rgba(255,255,255,.5), 0 8px 16px rgba(16,48,31,.2)' }}>
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

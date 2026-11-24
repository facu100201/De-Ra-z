import type { CSSProperties } from 'react';
import Arte from '../components/Arte';
import { Pagina } from '../components/Navegacion';

const CONTACTO = import.meta.env.VITE_CONTACTO ?? 'hola@deraiz.mx';

const nodos = [
  { t: 'Separas', left: '50%', top: 48, bg: 'radial-gradient(circle at 35% 28%, #9BE3A9, #1F8243 70%)' },
  { t: 'Recupe­ramos', left: 252, top: '50%', bg: 'radial-gradient(circle at 35% 28%, #9FE4F5, #0B6A86 70%)' },
  { t: 'Transfor­mamos', left: '50%', top: 252, bg: 'radial-gradient(circle at 35% 28%, #F9DA8A, #B4560B 70%)' },
  { t: 'Regresas', left: 48, top: '50%', bg: 'radial-gradient(circle at 35% 28%, #C7B6F7, #5B3FC4 70%)' }
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
      <section className="wrap" style={{ padding: '24px 20px 80px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px 56px' }}>
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p className="ey">Cierra el ciclo</p>
          <h1 className="display" style={{ fontSize: 'clamp(46px, 11vw, 88px)' }}>Nada debería terminar en la basura.</h1>
          <p className="lead" style={{ maxWidth: 420 }}>Regrésanos tu kit al final de su vida y te damos un descuento en el siguiente.</p>
        </div>
        <div style={{ flex: '1 1 320px', display: 'flex', justifyContent: 'center' }}>
          <div aria-hidden="true" style={{ position: 'relative', width: 300, height: 300 }}>
            <div style={{ position: 'absolute', inset: 42, borderRadius: '50%', border: '2px dashed rgba(11,106,134,.35)' }} />
            <div className="fl" style={{ position: 'absolute', left: '50%', top: '50%', width: 116, margin: '-58px 0 0 -58px' }}><Arte pieza="tote" decorativa /></div>
            <div className="sp" style={{ position: 'absolute', inset: 0 }}>
              {nodos.map((n) => (
                <div key={n.t} className="node" style={{ position: 'absolute', left: n.left, top: n.top, width: 84, height: 84, margin: '-42px 0 0 -42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 12, fontWeight: 500, lineHeight: 1.1, color: '#fff', textShadow: '0 1px 1px rgba(0,0,0,.35)', background: n.bg, boxShadow: 'inset 0 -8px 12px rgba(0,0,0,.2), inset 0 6px 8px rgba(255,255,255,.5), 0 10px 20px rgba(16,48,31,.22)' }}>
                  <span>{n.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ padding: '20px 20px 90px' }}>
        <h2 className="h2 rv" style={{ fontSize: 'clamp(34px, 8vw, 60px)', marginBottom: 26 }}>Cómo regresarlo.</h2>
        <ol className="hl-list">
          {pasos.map((p) => (
            <li key={p.n} className="rv" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0, 1fr)', gap: 12, padding: '20px 0' }}>
              <span style={{ fontWeight: 500, color: p.c }}>{p.n}</span>
              <div>
                <h3 style={{ fontSize: 22, letterSpacing: '-.02em' }}>{p.t}</h3>
                <p style={{ marginTop: 4, color: 'var(--ink-2)' }}>{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap" style={{ position: 'relative', padding: '60px 20px 130px', textAlign: 'center' }}>
        <div className="bub px" aria-hidden="true" style={{ '--p': '120px', width: 80, height: 80, left: '6%', top: 40 } as CSSProperties} />
        <div className="bub px" aria-hidden="true" style={{ '--p': '60px', width: 36, height: 36, right: '10%', top: 100 } as CSSProperties} />
        <p className="px gt" style={{ '--p': '40px', fontWeight: 500, fontSize: 'clamp(96px, 26vw, 240px)', lineHeight: 0.9, letterSpacing: '-.05em' } as CSSProperties}>0 kg</p>
        <p className="rv" style={{ margin: '16px auto 0', maxWidth: 480, fontSize: 'clamp(22px, 5vw, 32px)', lineHeight: 1.2 }}>rescatados por ahora. Empezamos a contar con el primer lote.</p>
        <div style={{ marginTop: 30 }}><a className="lk" href={`mailto:${CONTACTO}?subject=Punto%20de%20acopio%20en%20mi%20campus`}>Quiero un punto de acopio en mi campus →</a></div>
      </section>
    </Pagina>
  );
}

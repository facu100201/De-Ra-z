import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Arte, { type Pieza } from '../components/Arte';
import { Pagina } from '../components/Navegacion';

const data: Record<Pieza, { label: string; badge: string; name: string; desc: string; mat: string; evita: string; fin: string }> = {
  tote: { label: 'Tote', badge: 'Pieza 1 de 3 · única', name: 'Tote patchwork', desc: 'Retazos que los talleres desechan, cosidos en patchwork. No hay dos iguales.', mat: 'Algodón y mezclilla recuperados', evita: 'Que las mermas textiles lleguen a la basura', fin: 'Nos la regresas y sus telas se vuelven a usar' },
  base: { label: 'Base', badge: 'Pieza 2 de 3 · desarmable', name: 'Base para laptop', desc: 'Sube tu pantalla, cuida tu cuello y deja respirar a tu compu. Viaja plana en la mochila.', mat: 'Plástico y fibra reciclados', evita: 'Una base nueva de plástico virgen', fin: 'Se desarma y cada parte se recicla aparte' },
  libreta: { label: 'Libreta', badge: 'Pieza 3 de 3 · reciclable', name: 'Libreta', desc: 'Para tus apuntes de todos los días, con papel y cartón reciclados.', mat: 'Papel posconsumo y pastas de cartón', evita: 'Papel de fibra virgen', fin: 'Separas pastas y hojas: todo se recicla' }
};
const ids: Pieza[] = ['tote', 'base', 'libreta'];

const row: CSSProperties = { display: 'grid', gridTemplateColumns: '96px minmax(0, 1fr)', gap: 12, padding: '14px 0', borderTop: '1px solid var(--line)', fontSize: 16, lineHeight: 1.4 };
const dt: CSSProperties = { fontSize: 15, color: 'var(--ink-3)' };

export default function Kit() {
  const [params, setParams] = useSearchParams();
  const q = params.get('pieza') as Pieza | null;
  const sel: Pieza = q && ids.includes(q) ? q : 'tote';
  const p = data[sel];

  return (
    <Pagina>
      <div className="wrap" style={{ paddingTop: 12 }}>
        <div role="group" aria-label="Elige una pieza" style={{ display: 'flex', gap: 4, padding: 5, borderRadius: 999, maxWidth: 460, background: 'linear-gradient(180deg, rgba(255,255,255,.9), rgba(232,247,250,.7))', border: '1px solid #fff', boxShadow: '0 10px 26px rgba(14,72,70,.14), inset 0 1px 0 #fff' }}>
          {ids.map((id) => {
            const on = id === sel;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setParams({ pieza: id }, { replace: true })}
                style={{ flex: '1 1 0', minWidth: 0, minHeight: 44, borderRadius: 999, cursor: 'pointer', fontSize: 15, fontWeight: 500, border: on ? '1px solid var(--green)' : 0, color: on ? '#fff' : '#2E4A3C', background: on ? 'var(--green)' : 'transparent' }}
              >
                {data[id].label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="wrap" style={{ padding: '20px 20px 80px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px 48px' }}>
        <div style={{ flex: '1 1 340px', position: 'relative', display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 'min(88%, 440px)', aspectRatio: '1', transform: 'translate(-50%, -50%)', borderRadius: '50%', background: 'radial-gradient(circle at 34% 26%, #FFFFFF 0 10%, #DDF4FA 38%, #A9E0F2 75%, #8DD3EC 100%)', boxShadow: 'inset 0 -20px 40px rgba(14,106,134,.18), 0 40px 80px rgba(14,106,134,.18)' }} />
          <div className="bub px" aria-hidden="true" style={{ '--p': '70px', width: 54, height: 54, left: '4%', top: '6%' } as CSSProperties} />
          <div className="bub px" aria-hidden="true" style={{ '--p': '120px', width: 30, height: 30, right: '8%', bottom: '14%' } as CSSProperties} />
          <div key={sel} className="fl inn" style={{ position: 'relative', width: 'min(70%, 360px)' }}><Arte pieza={sel} /></div>
        </div>
        <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: 20 }} aria-live="polite">
          <p className="ey">{p.badge}</p>
          <h1 style={{ fontSize: 'clamp(44px, 10.5vw, 84px)', lineHeight: 1 }}>{p.name}</h1>
          <p className="lead" style={{ maxWidth: 440 }}>{p.desc}</p>
          <dl style={{ margin: 0, borderBottom: '1px solid var(--line)' }}>
            <div style={row}><dt style={dt}>Material</dt><dd style={{ margin: 0 }}>{p.mat}</dd></div>
            <div style={row}><dt style={dt}>Evita</dt><dd style={{ margin: 0 }}>{p.evita}</dd></div>
            <div style={row}><dt style={dt}>Al final</dt><dd style={{ margin: 0 }}>{p.fin}</dd></div>
          </dl>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}>
            <Link className="btn" to="/preventa">Apartar</Link>
            <span style={{ fontSize: 15, color: 'var(--ink-3)' }}>Preventa sin pago, solo con tu correo institucional</span>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 20px 130px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h2 className="rv" style={{ fontSize: 'clamp(40px, 10vw, 80px)', lineHeight: 1 }}>Cada pieza es única.</h2>
        <p className="rv lead" style={{ margin: '0 auto', maxWidth: 520 }}>Cambios de tono o textura no son defectos: son la marca del material rescatado. Y si algo se afloja, primero lo reparamos.</p>
      </section>
    </Pagina>
  );
}

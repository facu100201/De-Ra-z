import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Arte, { type Pieza } from '../components/Arte';
import { Pagina } from '../components/Navegacion';

const data: Record<Pieza, { label: string; badge: string; name: string; desc: string; mat: string; evita: string; fin: string }> = {
  tote: { label: 'Tote', badge: 'Pieza única', name: 'Tote patchwork', desc: 'Retazos que los talleres desechan, cosidos en patchwork. No hay dos iguales.', mat: 'Algodón y mezclilla recuperados', evita: 'Que las mermas textiles lleguen a la basura', fin: 'Nos la regresas y sus telas se vuelven a usar' },
  base: { label: 'Base', badge: 'Se arma sin pegamento', name: 'Base para laptop', desc: 'Sube tu pantalla, cuida tu cuello y deja respirar a tu compu. Viaja plana en la mochila.', mat: 'Plástico y fibra reciclados', evita: 'Una base nueva de plástico virgen', fin: 'Se desarma y cada parte se recicla aparte' },
  libreta: { label: 'Libreta', badge: 'Se recicla completa', name: 'Libreta', desc: 'Para tus apuntes de todos los días, con papel y cartón reciclados.', mat: 'Papel posconsumo y pastas de cartón', evita: 'Papel de fibra virgen', fin: 'Separas pastas y hojas: todo se recicla' }
};
const ids: Pieza[] = ['tote', 'base', 'libreta'];

const row: CSSProperties = { display: 'grid', gridTemplateColumns: '84px minmax(0, 1fr)', gap: 12, padding: '10px 0', borderTop: '1px solid var(--line)', fontSize: 'var(--fs-base)', lineHeight: 1.45 };
const dt: CSSProperties = { fontSize: 'var(--fs-sm)', color: 'var(--ink-3)' };

export default function Kit() {
  const [params, setParams] = useSearchParams();
  const q = params.get('pieza') as Pieza | null;
  const sel: Pieza = q && ids.includes(q) ? q : 'tote';
  const p = data[sel];

  return (
    <Pagina>
      <div className="wrap" style={{ paddingTop: 8 }}>
        <div role="group" aria-label="Elige una pieza" style={{ display: 'flex', gap: 2, padding: 4, borderRadius: 999, maxWidth: 360, background: 'linear-gradient(180deg, rgba(255,255,255,.9), rgba(232,247,250,.7))', border: '1px solid #fff', boxShadow: '0 10px 26px rgba(14,72,70,.14), inset 0 1px 0 #fff' }}>
          {ids.map((id) => {
            const on = id === sel;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setParams({ pieza: id }, { replace: true })}
                style={{ flex: '1 1 0', minWidth: 0, minHeight: 38, borderRadius: 999, cursor: 'pointer', fontSize: 'var(--fs-sm)', fontWeight: 500, border: on ? '1px solid var(--green)' : 0, color: on ? '#fff' : '#2E4A3C', background: on ? 'var(--green)' : 'transparent' }}
              >
                {data[id].label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="wrap" style={{ padding: '16px 20px var(--sp-section)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 48px' }}>
        <div style={{ flex: '1 1 300px', position: 'relative', display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 'min(80%, 340px)', aspectRatio: '1', transform: 'translate(-50%, -50%)', borderRadius: '50%', background: 'radial-gradient(circle at 34% 26%, #FFFFFF 0 10%, #DDF4FA 38%, #A9E0F2 75%, #8DD3EC 100%)', boxShadow: 'inset 0 -20px 40px rgba(14,106,134,.18), 0 40px 80px rgba(14,106,134,.18)' }} />
          <div className="bub px" aria-hidden="true" style={{ '--p': '50px', width: 38, height: 38, left: '6%', top: '6%' } as CSSProperties} />
          <div className="bub px" aria-hidden="true" style={{ '--p': '90px', width: 22, height: 22, right: '10%', bottom: '14%' } as CSSProperties} />
          <div key={sel} className="fl inn" style={{ position: 'relative', width: 'min(58%, 260px)' }}><Arte pieza={sel} /></div>
        </div>
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 14 }} aria-live="polite">
          <p className="ey">{p.badge}</p>
          <h1 className="display">{p.name}</h1>
          <p className="lead" style={{ maxWidth: 400 }}>{p.desc}</p>
          <dl style={{ margin: '4px 0', borderBottom: '1px solid var(--line)', maxWidth: 480 }}>
            <div style={row}><dt style={dt}>Material</dt><dd style={{ margin: 0 }}>{p.mat}</dd></div>
            <div style={row}><dt style={dt}>Evita</dt><dd style={{ margin: 0 }}>{p.evita}</dd></div>
            <div style={row}><dt style={dt}>Al final</dt><dd style={{ margin: 0 }}>{p.fin}</dd></div>
          </dl>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginTop: 6 }}>
            <Link className="btn" to="/preventa">Apartar</Link>
            <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-3)' }}>Preventa sin pago, solo con tu correo institucional</span>
          </div>
        </div>
      </section>

      <section className="sec" style={{ maxWidth: 720, margin: '0 auto', paddingLeft: 20, paddingRight: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 className="h2 rv">Cada pieza es única.</h2>
        <p className="rv lead" style={{ margin: '0 auto', maxWidth: 460 }}>Cambios de tono o textura no son defectos: son la marca del material rescatado. Y si algo se afloja, primero lo reparamos.</p>
      </section>
    </Pagina>
  );
}

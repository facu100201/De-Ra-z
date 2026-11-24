import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Pagina } from '../components/Navegacion';

type Bote = 'org' | 'rec' | 'nor';

const items: { name: string; bin: Bote; why: string }[] = [
  { name: 'Cáscara de naranja', bin: 'org', why: 'Restos de comida: al verde, y terminan como composta.' },
  { name: 'Botella de PET', bin: 'rec', why: 'Vacíala, aplástala y al gris.' },
  { name: 'Retazo de tela', bin: 'rec', why: 'Los textiles van al gris. Y si es algodón o mezclilla, nos sirve para una tote.' },
  { name: 'Bolsa de papitas', bin: 'nor', why: 'Es multicapa metalizada: casi nadie la recicla. Al naranja.' },
  { name: 'Caja de cartón', bin: 'rec', why: 'Seca y doblada, al gris. La parte con grasa ya no sirve.' },
  { name: 'Café con filtro', bin: 'org', why: 'Café y té, con todo y filtro de papel, van al verde.' },
  { name: 'Vaso de unicel', bin: 'nor', why: 'El unicel no se recicla en la ciudad: al naranja.' },
  { name: 'Colilla', bin: 'nor', why: 'No reciclable. Y nunca al suelo.' }
];

const botes: { id: Bote; label: string; c1: string; c2: string }[] = [
  { id: 'org', label: 'Orgánico', c1: '#B7F0BF', c2: '#2E9A4B' },
  { id: 'rec', label: 'Reciclable', c1: '#E6EBF0', c2: '#6B7785' },
  { id: 'nor', label: 'No reciclable', c1: '#FFD8A8', c2: '#E0700F' }
];

const guia = [
  { t: 'Verde', c: '#2E9A4B', d: 'Comida, cáscaras, café y té, jardín.' },
  { t: 'Gris', c: '#6B7785', d: 'Papel, cartón, PET, latas, vidrio, textiles. Limpio, seco y aplastado.' },
  { t: 'Naranja', c: '#E0700F', d: 'Unicel, colillas, frituras, sanitarios.' }
];

export default function Separa() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Bote | null>(null);
  const [score, setScore] = useState(0);
  const total = items.length;
  const finished = idx >= total;
  const item = items[Math.min(idx, total - 1)];
  const answered = picked !== null;
  const correct = answered && picked === item.bin;

  const elegir = (b: Bote) => {
    if (answered) return;
    setPicked(b);
    if (b === item.bin) setScore((s) => s + 1);
  };

  return (
    <Pagina>
      <section className="wrap" style={{ position: 'relative', padding: '24px 20px var(--sp-section)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
        <div className="bub px" aria-hidden="true" style={{ '--p': '60px', width: 36, height: 36, right: '8%', top: 96 } as CSSProperties} />
        <div className="bub px" aria-hidden="true" style={{ '--p': '80px', width: 20, height: 20, left: '5%', top: 210 } as CSSProperties} />
        <p className="ey">Separa bien en la CDMX</p>
        <h1 className="display">¿A qué bote va?</h1>
        <p className="lead" style={{ maxWidth: 400 }}>Desde 2026 separar es obligatorio en la CDMX. Aprende jugando: {finished ? 'terminaste' : `${idx + 1} de ${total}`}.</p>

        {!finished ? (
          <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, marginTop: 14 }}>
            <p key={idx} className="fl inn" style={{ padding: '12px 22px', borderRadius: 999, fontSize: 'clamp(20px, 4.4vw, 26px)', fontWeight: 500, letterSpacing: '-.025em', lineHeight: 1.2, background: 'linear-gradient(180deg, rgba(255,255,255,.92), rgba(232,247,250,.7))', border: '1px solid #fff', boxShadow: '0 10px 26px rgba(14,72,70,.12), inset 0 1px 0 #fff' }}>
              {item.name}
            </p>
            <div role="group" aria-label="Elige un bote" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
              {botes.map((b) => {
                const isPicked = picked === b.id;
                const isRight = answered && b.id === item.bin;
                const ring = isRight ? '0 0 0 3px #fff, 0 0 0 5px #1A763C, ' : isPicked ? '0 0 0 3px #fff, 0 0 0 5px #C2410C, ' : '';
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => elegir(b.id)}
                    disabled={answered}
                    style={{ minHeight: 108, padding: '6px 4px', border: 0, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--ink)', cursor: answered ? 'default' : 'pointer', opacity: answered && !isRight && !isPicked ? 0.4 : 1, transition: 'opacity .2s', fontSize: 'var(--fs-sm)', fontWeight: 500 }}
                  >
                    <span aria-hidden="true" style={{ width: 'min(68px, 19vw)', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle at 35% 28%, #fff 0 6%, ${b.c1} 22%, ${b.c2} 72%)`, boxShadow: `${ring}inset 0 -6px 10px rgba(0,0,0,.2), inset 0 5px 7px rgba(255,255,255,.5), 0 8px 18px rgba(16,48,31,.18)`, transform: isRight ? 'scale(1.08)' : 'none', transition: 'transform .35s cubic-bezier(.2,1.4,.4,1), box-shadow .2s' }} />
                    <span>{b.label}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <div role="status" className="inn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, maxWidth: 420 }}>
                <p style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-.03em', color: correct ? '#1A763C' : '#B4410B' }}>{correct ? '¡Exacto!' : 'Casi. Va en otro bote.'}</p>
                <p style={{ fontSize: 'var(--fs-base)', lineHeight: 1.5, color: 'var(--ink-2)' }}>{item.why}</p>
                <button type="button" className="btn" onClick={() => { setIdx(idx + 1); setPicked(null); }}>{idx === total - 1 ? 'Ver mi resultado' : 'Siguiente'}</button>
              </div>
            )}
          </div>
        ) : (
          <div className="inn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 14 }}>
            <span className="gt stat" style={{ fontSize: 'clamp(72px, 18vw, 128px)' }}>{score}/{total}</span>
            <p style={{ fontSize: 'var(--fs-md)', fontWeight: 500 }}>{score >= 7 ? 'Separas como experto.' : score >= 4 ? 'Vas bien. Repasa abajo.' : 'Dale otra vuelta.'}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
              <button type="button" className="btn" onClick={() => { setIdx(0); setPicked(null); setScore(0); }}>Jugar otra vez</button>
              <Link className="lk" to="/ciclo">Sigue: cierra el ciclo</Link>
            </div>
          </div>
        )}
      </section>

      <section className="wrap" style={{ padding: '0 20px var(--sp-section)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 32px' }}>
        {guia.map((g) => (
          <div key={g.t} className="rv" style={{ padding: '14px 0 18px', borderTop: `2px solid ${g.c}` }}>
            <h2 className="h3">{g.t}</h2>
            <p style={{ marginTop: 6, fontSize: 'var(--fs-base)', lineHeight: 1.5, color: 'var(--ink-2)' }}>{g.d}</p>
          </div>
        ))}
        <p className="small" style={{ gridColumn: '1 / -1', marginTop: 12 }}>Basado en la NADF-024-AMBT-2013. Revisa los días de recolección de tu alcaldía.</p>
      </section>
    </Pagina>
  );
}

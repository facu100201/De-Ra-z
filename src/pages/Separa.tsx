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
      <section className="wrap" style={{ position: 'relative', padding: '24px 20px 90px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, textAlign: 'center' }}>
        <div className="bub px" aria-hidden="true" style={{ '--p': '80px', width: 70, height: 70, left: '4%', top: 400 } as CSSProperties} />
        <div className="bub px" aria-hidden="true" style={{ '--p': '140px', width: 36, height: 36, right: '6%', top: 470 } as CSSProperties} />
        <p className="ey">Separa bien · CDMX</p>
        <h1 className="display">¿A qué bote va?</h1>
        <p className="lead" style={{ maxWidth: 420 }}>Desde 2026 separar es obligatorio en la CDMX. Aprende jugando: {finished ? 'terminaste' : `${idx + 1} de ${total}`}.</p>

        {!finished ? (
          <div style={{ width: '100%', maxWidth: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, marginTop: 10 }}>
            <p key={idx} className="fl inn" style={{ padding: '18px 30px', borderRadius: 999, fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, background: 'linear-gradient(180deg, rgba(255,255,255,.92), rgba(232,247,250,.7))', border: '1px solid #fff', boxShadow: '0 16px 36px rgba(14,72,70,.16), inset 0 1px 0 #fff' }}>
              {item.name}
            </p>
            <div role="group" aria-label="Elige un bote" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
              {botes.map((b) => {
                const isPicked = picked === b.id;
                const isRight = answered && b.id === item.bin;
                const ring = isRight ? '0 0 0 4px #fff, 0 0 0 7px #1A763C, ' : isPicked ? '0 0 0 4px #fff, 0 0 0 7px #C2410C, ' : '';
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => elegir(b.id)}
                    disabled={answered}
                    style={{ minHeight: 140, padding: '8px 4px', border: 0, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'var(--ink)', cursor: answered ? 'default' : 'pointer', opacity: answered && !isRight && !isPicked ? 0.4 : 1, transition: 'opacity .2s', fontSize: 15, fontWeight: 500 }}
                  >
                    <span aria-hidden="true" style={{ width: 'min(92px, 24vw)', aspectRatio: '1', borderRadius: '50%', background: `radial-gradient(circle at 35% 28%, #fff 0 6%, ${b.c1} 22%, ${b.c2} 72%)`, boxShadow: `${ring}inset 0 -8px 12px rgba(0,0,0,.2), inset 0 6px 8px rgba(255,255,255,.5), 0 12px 24px rgba(16,48,31,.2)`, transform: isRight ? 'scale(1.08)' : 'none', transition: 'transform .35s cubic-bezier(.2,1.4,.4,1), box-shadow .2s' }} />
                    <span>{b.label}</span>
                  </button>
                );
              })}
            </div>
            {answered && (
              <div role="status" className="inn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, maxWidth: 460 }}>
                <p style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-.03em', color: correct ? '#1A763C' : '#B4410B' }}>{correct ? '¡Exacto!' : 'Casi. Va en otro bote.'}</p>
                <p style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)' }}>{item.why}</p>
                <button type="button" className="btn" onClick={() => { setIdx(idx + 1); setPicked(null); }}>{idx === total - 1 ? 'Ver mi resultado' : 'Siguiente'}</button>
              </div>
            )}
          </div>
        ) : (
          <div className="inn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 10 }}>
            <span className="gt" style={{ fontSize: 'clamp(96px, 26vw, 180px)', fontWeight: 500, lineHeight: 0.9, letterSpacing: '-.05em' }}>{score}/{total}</span>
            <p style={{ fontSize: 18, fontWeight: 500 }}>{score >= 7 ? 'Separas como experto.' : score >= 4 ? 'Vas bien. Repasa abajo.' : 'Dale otra vuelta.'}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, justifyContent: 'center', alignItems: 'center' }}>
              <button type="button" className="btn" onClick={() => { setIdx(0); setPicked(null); setScore(0); }}>Jugar otra vez</button>
              <Link className="lk" to="/ciclo">Sigue: cierra el ciclo →</Link>
            </div>
          </div>
        )}
      </section>

      <section className="wrap" style={{ padding: '20px 20px 110px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0 36px' }}>
        {guia.map((g) => (
          <div key={g.t} className="rv" style={{ padding: '20px 0', borderTop: `3px solid ${g.c}` }}>
            <h2 style={{ fontSize: 28 }}>{g.t}</h2>
            <p style={{ marginTop: 8, fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)' }}>{g.d}</p>
          </div>
        ))}
        <p className="small" style={{ gridColumn: '1 / -1', marginTop: 18, fontSize: 12 }}>Basado en la NADF-024-AMBT-2013. Revisa los días de recolección de tu alcaldía.</p>
      </section>
    </Pagina>
  );
}

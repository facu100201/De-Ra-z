import { useState, type CSSProperties } from 'react';
import Marquee from '../components/Marquee';
import { logoCompleto, Pagina } from '../components/Navegacion';

const CONTACTO = import.meta.env.VITE_CONTACTO ?? 'hola@deraiz.mx';

const politicas = [
  { t: 'Piezas únicas', d: 'Usamos textiles, plásticos y cartón recuperados en México. Cada pieza puede variar en textura, tono o patrón: no es defecto, es la marca del material rescatado.' },
  { t: 'Calidad y resistencia', d: 'Costuras reforzadas en las totes y ensamble firme en las bases, pensados para computadora, cuadernos, termo y cables. Si algo se afloja, primero lo reparamos.' },
  { t: 'Producción local y ética', d: 'Diseñamos y confeccionamos en México, con condiciones de trabajo dignas y el mínimo de químicos, tintes agresivos y agua.' },
  { t: 'Cierra el ciclo', d: 'Al final de su vida útil, regrésanos tu producto. Separamos sus partes para reciclarlas y te damos un descuento en tu siguiente kit.' },
  { t: 'Aviso de privacidad', d: 'En la preventa solo pedimos tu correo institucional. Lo usamos para confirmarte tu registro y avisarte cuando arranque la producción; no lo compartimos ni lo vendemos. Si quieres que lo borremos, escríbenos y lo eliminamos.' }
];

const valores = [
  ['Sustentabilidad', '#2FA154'],
  ['Creatividad', '#D69A12'],
  ['Calidad', '#0B6A86'],
  ['Responsabilidad', '#5B3FC4'],
  ['Colaboración', '#C2410C'],
  ['Conciencia', '#5E8E12']
].map(([v, c]) => (
  <>
    {v} <span style={{ color: c, fontSize: '0.7em', verticalAlign: '0.12em' }}>●</span>
  </>
));

export default function Nosotros() {
  const [abierta, setAbierta] = useState(-1);
  return (
    <Pagina>
      <section className="wrap" style={{ padding: '24px 20px var(--sp-section)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '28px 56px' }}>
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p className="ey">Nosotros</p>
          <h1 className="display">Empezamos mirando nuestra propia uni.</h1>
          <p className="lead">Veíamos productos que nadie usaba y material que se tiraba sin razón. Hicimos lo contrario: tres cosas que sí usas, con lo que otros desechan.</p>
        </div>
        <div className="fl" style={{ flex: '0 1 220px', margin: '0 auto' }}>
          <img src={logoCompleto} alt="Logotipo De Raíz: una R de la que crece un brote" style={{ width: '100%', maxWidth: 220, height: 'auto' }} />
        </div>
      </section>

      <section className="sec" style={{ position: 'relative', maxWidth: 900, margin: '0 auto', paddingLeft: 20, paddingRight: 20, paddingTop: 0, textAlign: 'center' }}>
        <div className="bub px" aria-hidden="true" style={{ '--p': '70px', width: 48, height: 48, left: '4%', top: 0 } as CSSProperties} />
        <div className="bub px" aria-hidden="true" style={{ '--p': '36px', width: 22, height: 22, right: '10%', bottom: 40 } as CSSProperties} />
        <p className="px" style={{ '--p': '20px', fontWeight: 500, fontSize: 'clamp(30px, 6.6vw, 56px)', lineHeight: 1.05, letterSpacing: '-.04em' } as CSSProperties}>
          Nada nace para ser basura.
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 'var(--sp-section)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px 40px' }}>
        <div className="rv" style={{ padding: '16px 0', borderTop: '1px solid var(--line)' }}>
          <p className="ey">Misión</p>
          <p className="body-lg" style={{ marginTop: 8, fontSize: 19 }}>Convertir lo que se tira en productos útiles para estudiantes, y que sepan de dónde viene cada material.</p>
        </div>
        <div className="rv" style={{ padding: '16px 0', borderTop: '1px solid var(--line)' }}>
          <p className="ey" style={{ color: 'var(--aqua)' }}>Visión</p>
          <p className="body-lg" style={{ marginTop: 8, fontSize: 19 }}>Ser la marca escolar sustentable de las universidades de la CDMX. Elegida por su diseño.</p>
        </div>
      </section>

      <h2 className="sr-only">Valores</h2>
      <Marquee
        items={valores}
        sep=""
        label="Valores: sustentabilidad, creatividad, calidad, responsabilidad, colaboración y conciencia."
        duration={50}
        style={{ padding: '14px 0', fontSize: 'clamp(20px, 4.4vw, 28px)', letterSpacing: '-.025em' }}
      />

      <section id="politicas" className="sec" style={{ maxWidth: 760, margin: '0 auto', paddingLeft: 20, paddingRight: 20, scrollMarginTop: 90 }}>
        <h2 className="h2 rv" style={{ marginBottom: 16 }}>Políticas de compra.</h2>
        <div style={{ borderBottom: '1px solid var(--line)' }}>
          {politicas.map((p, i) => {
            const open = abierta === i;
            return (
              <div key={p.t} style={{ borderTop: '1px solid var(--line)' }}>
                <h3 style={{ letterSpacing: 0 }}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`pol-${i}`}
                    onClick={() => setAbierta(open ? -1 : i)}
                    style={{ width: '100%', minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 0', border: 0, background: 'transparent', cursor: 'pointer', textAlign: 'left', font: '500 var(--fs-md)/1.3 var(--font)', color: 'var(--ink)' }}
                  >
                    <span>{p.t}</span>
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A763C" strokeWidth="1.5" strokeLinecap="round" style={{ flex: 'none', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .25s ease' }}><path d="M5 12h14M12 5v14" /></svg>
                  </button>
                </h3>
                {open && <p id={`pol-${i}`} className="inn" style={{ padding: '0 0 16px', fontSize: 'var(--fs-base)', lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 600 }}>{p.d}</p>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 22 }}><a className="lk" href={`mailto:${CONTACTO}`}>¿Ya usas tu kit? Cuéntanos</a></div>
      </section>
    </Pagina>
  );
}

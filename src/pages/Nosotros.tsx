import { useState, type CSSProperties } from 'react';
import { logoCompleto, Pagina } from '../components/Navegacion';

const CONTACTO = import.meta.env.VITE_CONTACTO ?? 'hola@deraiz.mx';

const politicas = [
  { t: 'Piezas únicas', d: 'Usamos textiles, plásticos y cartón recuperados en México. Cada pieza puede variar en textura, tono o patrón: no es defecto, es la marca del material rescatado.' },
  { t: 'Calidad y resistencia', d: 'Costuras reforzadas en las totes y ensamble firme en las bases, pensados para computadora, cuadernos, termo y cables. Si algo se afloja, primero lo reparamos.' },
  { t: 'Producción local y ética', d: 'Diseñamos y confeccionamos en México, con condiciones de trabajo dignas y el mínimo de químicos, tintes agresivos y agua.' },
  { t: 'Cierra el ciclo', d: 'Al final de su vida útil, regrésanos tu producto. Separamos sus partes para reciclarlas y te damos un descuento en tu siguiente kit.' },
  { t: 'Aviso de privacidad', d: 'En la preventa solo pedimos tu correo institucional. Lo usamos para confirmarte tu registro y avisarte cuando arranque la producción; no lo compartimos ni lo vendemos. Si quieres que lo borremos, escríbenos y lo eliminamos.' }
];

const valores = (
  <span style={{ paddingRight: 40 }}>
    Sustentabilidad <span style={{ color: '#2FA154' }}>●</span> Creatividad <span style={{ color: '#D69A12' }}>●</span> Calidad <span style={{ color: '#0B6A86' }}>●</span> Responsabilidad{' '}
    <span style={{ color: '#5B3FC4' }}>●</span> Colaboración <span style={{ color: '#C2410C' }}>●</span> Conciencia <span style={{ color: '#5E8E12' }}>●</span>{' '}
  </span>
);

export default function Nosotros() {
  const [abierta, setAbierta] = useState(-1);
  return (
    <Pagina>
      <section className="wrap" style={{ padding: '24px 20px 70px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '36px 56px' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p className="ey">Nosotros</p>
          <h1 className="display" style={{ fontSize: 'clamp(46px, 11vw, 88px)' }}>Empezamos mirando nuestra propia uni.</h1>
          <p className="lead">Veíamos productos que nadie usaba y material que se tiraba sin razón. Hicimos lo contrario: tres cosas que sí usas, con lo que otros desechan.</p>
        </div>
        <div className="fl" style={{ flex: '0 1 300px', margin: '0 auto' }}>
          <img src={logoCompleto} alt="Logotipo De Raíz: una R de la que crece un brote" style={{ width: '100%', maxWidth: 300, height: 'auto' }} />
        </div>
      </section>

      <section style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '70px 20px 100px', textAlign: 'center' }}>
        <div className="bub px" aria-hidden="true" style={{ '--p': '110px', width: 80, height: 80, left: '4%', top: 20 } as CSSProperties} />
        <div className="bub px" aria-hidden="true" style={{ '--p': '50px', width: 34, height: 34, right: '10%', bottom: 40 } as CSSProperties} />
        <p className="px" style={{ '--p': '30px', fontWeight: 500, fontSize: 'clamp(44px, 11vw, 104px)', lineHeight: 1, letterSpacing: '-.045em' } as CSSProperties}>
          Nada nace para ser <span className="gt">basura.</span>
        </p>
      </section>

      <section className="wrap" style={{ padding: '0 20px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px 48px' }}>
        <div className="rv" style={{ padding: '22px 0', borderTop: '1px solid var(--line)' }}>
          <p className="ey">Misión</p>
          <p style={{ marginTop: 10, fontSize: 24, lineHeight: 1.25, letterSpacing: '-.02em' }}>Convertir lo que se tira en productos útiles para estudiantes, y que sepan de dónde viene cada material.</p>
        </div>
        <div className="rv" style={{ padding: '22px 0', borderTop: '1px solid var(--line)' }}>
          <p className="ey" style={{ color: 'var(--aqua)' }}>Visión</p>
          <p style={{ marginTop: 10, fontSize: 24, lineHeight: 1.25, letterSpacing: '-.02em' }}>Ser la marca escolar sustentable de las universidades de la CDMX. Elegida por su diseño.</p>
        </div>
      </section>

      <div style={{ borderTop: '1px solid rgba(16,48,31,.12)', borderBottom: '1px solid rgba(16,48,31,.12)', overflow: 'hidden' }}>
        <h2 className="sr-only">Valores: sustentabilidad, creatividad, calidad, responsabilidad, colaboración y conciencia</h2>
        <div className="mq" aria-hidden="true" style={{ display: 'flex', width: 'max-content', padding: '22px 0', fontSize: 'clamp(30px, 7vw, 48px)', letterSpacing: '-.03em', whiteSpace: 'nowrap', animationDuration: '36s' }}>
          {valores}{valores}
        </div>
      </div>

      <section id="politicas" style={{ maxWidth: 860, margin: '0 auto', padding: '90px 20px 110px', scrollMarginTop: 100 }}>
        <h2 className="rv" style={{ fontSize: 'clamp(34px, 8vw, 56px)', lineHeight: 1, marginBottom: 24 }}>Políticas de compra.</h2>
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
                    style={{ width: '100%', minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', border: 0, background: 'transparent', cursor: 'pointer', textAlign: 'left', font: '500 18px/1.3 var(--font)', color: 'var(--ink)' }}
                  >
                    <span>{p.t}</span>
                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A763C" strokeWidth="1.5" strokeLinecap="round" style={{ flex: 'none', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .25s ease' }}><path d="M5 12h14M12 5v14" /></svg>
                  </button>
                </h3>
                {open && <p id={`pol-${i}`} className="inn" style={{ padding: '0 0 20px', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 640 }}>{p.d}</p>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 30 }}><a className="lk" href={`mailto:${CONTACTO}`}>¿Ya usas tu kit? Cuéntanos →</a></div>
      </section>
    </Pagina>
  );
}

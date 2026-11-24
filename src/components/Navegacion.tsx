import type { CSSProperties, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

export type Seccion = 'inicio' | 'kit' | 'separa' | 'ciclo' | 'nosotros' | 'ninguna';

const BASE = import.meta.env.BASE_URL;
export const logo = `${BASE}logo-wordmark.png`;
export const logoCompleto = `${BASE}logo-full.png`;

const secciones: { id: Seccion; label: string; to: string; d: string }[] = [
  { id: 'inicio', label: 'Inicio', to: '/', d: 'M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4z' },
  { id: 'kit', label: 'El kit', to: '/kit', d: 'M6 8h12l-1 12H7zM9 8V7a3 3 0 0 1 6 0v1' },
  { id: 'separa', label: 'Separa', to: '/separa', d: 'M4 7h16M10 4h4M6.5 7l1 13h9l1-13M10 11v5M14 11v5' },
  { id: 'ciclo', label: 'Ciclo', to: '/ciclo', d: 'M4.5 9.5A8 8 0 0 1 19 8M19 4v4h-4M19.5 14.5A8 8 0 0 1 5 16M5 20v-4h4' },
  { id: 'nosotros', label: 'Nosotros', to: '/nosotros', d: 'M12 20v-7M12 13c0-3.5-2.5-6-6.5-6 0 3.5 2.5 6 6.5 6zM12 11c0-3.5 2.5-6 6.5-6 0 3.5-2.5 6-6.5 6z' }
];

const glass: CSSProperties = {
  background: 'rgba(255,255,255,.74)',
  border: '1px solid rgba(255,255,255,.95)',
  boxShadow: '0 12px 32px rgba(14,72,70,.12), inset 0 1px 0 #fff',
  backdropFilter: 'blur(18px) saturate(1.3)',
  WebkitBackdropFilter: 'blur(18px) saturate(1.3)'
};

/** Barra superior en móvil: logo + Nosotros + Preventa */
export function BarraMovil() {
  return (
    <header className="nav-m wrap" style={{ paddingTop: 14, paddingBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, position: 'relative', zIndex: 2 }}>
      <Link to="/" aria-label="De Raíz, ir al inicio" style={{ display: 'flex', alignItems: 'center', minHeight: 44 }}>
        <img src={logo} alt="De Raíz" style={{ height: 38, width: 'auto' }} />
      </Link>
      <nav aria-label="Principal" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Link to="/nosotros" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 12px', fontSize: 15, color: 'var(--ink)', textDecoration: 'none' }}>Nosotros</Link>
        <Link to="/preventa" className="btn btn--sm">Preventa</Link>
      </nav>
    </header>
  );
}

/** Barra superior desde 960px: fija arriba, de vidrio */
export function BarraDesktop({ superpuesta = false }: { superpuesta?: boolean }) {
  return (
    <div className="nav-d" style={{ position: 'sticky', top: 0, zIndex: 30, padding: '14px 20px 0', marginBottom: superpuesta ? -78 : 0, pointerEvents: 'none' }}>
      <header style={{ ...glass, pointerEvents: 'auto', maxWidth: 'var(--max)', margin: '0 auto', height: 64, padding: '0 10px 0 24px', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <Link to="/" aria-label="De Raíz, ir al inicio" style={{ display: 'flex', alignItems: 'center', minHeight: 44, flex: 'none' }}>
          <img src={logo} alt="De Raíz" style={{ height: 32, width: 'auto' }} />
        </Link>
        <nav aria-label="Principal">
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
            {secciones.map((s) => (
              <li key={s.id}>
                <NavLink
                  to={s.to}
                  end={s.to === '/'}
                  style={({ isActive }) => ({
                    display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 16px', borderRadius: 999,
                    fontSize: 15, textDecoration: 'none',
                    color: isActive ? 'var(--green-dark)' : '#2e4a3c',
                    fontWeight: isActive ? 500 : 400,
                    background: isActive ? 'rgba(47,161,84,.12)' : 'transparent'
                  })}
                >
                  {s.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/preventa" className="btn btn--sm" style={{ flex: 'none' }}>Aparta tu kit</Link>
      </header>
    </div>
  );
}

/** Dock inferior en móvil */
export function Dock() {
  return (
    <div className="dock" style={{ position: 'sticky', bottom: 12, zIndex: 20, display: 'flex', justifyContent: 'center', padding: '0 12px 12px' }}>
      <nav aria-label="Secciones" style={{ ...glass, width: 366, maxWidth: '100%', padding: 6, borderRadius: 999, display: 'flex', gap: 2, background: 'linear-gradient(180deg, rgba(255,255,255,.9), rgba(232,247,250,.72))' }}>
        {secciones.map((s) => (
          <NavLink
            key={s.id}
            to={s.to}
            end={s.to === '/'}
            style={({ isActive }) => ({
              flex: '1 1 0', minWidth: 0, minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 3, borderRadius: 999, textDecoration: 'none', fontSize: 11, letterSpacing: '.01em',
              color: isActive ? 'var(--green-dark)' : '#4a6656',
              background: isActive ? 'rgba(47,161,84,.12)' : 'transparent'
            })}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.d} /></svg>
            <span>{s.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function Pie() {
  const link: CSSProperties = { minHeight: 44, display: 'inline-flex', alignItems: 'center', color: 'var(--ink)', textDecoration: 'none' };
  return (
    <footer style={{ borderTop: '1px solid rgba(16,48,31,.12)', padding: '40px 0 28px' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={logo} alt="De Raíz" style={{ height: 34, width: 'auto' }} />
          <nav aria-label="Pie de página" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
            <Link to="/kit" style={link}>Kit</Link>
            <Link to="/separa" style={link}>Separa</Link>
            <Link to="/ciclo" style={link}>Ciclo</Link>
            <Link to="/nosotros#politicas" style={link}>Políticas</Link>
            <a href="https://instagram.com/" style={link}>Instagram</a>
            <a href="https://tiktok.com/" style={link}>TikTok</a>
          </nav>
        </div>
        <p className="small">© {new Date().getFullYear()} De Raíz · Hecho en la CDMX con lo que otros tiran.</p>
      </div>
    </footer>
  );
}

/** Estructura común: navbar desktop, contenido, pie y dock móvil */
export function Pagina({ children, sky = true, barraEnHero = false }: { children: ReactNode; sky?: boolean; barraEnHero?: boolean }) {
  return (
    <div className={sky ? 'page page--sky' : 'page'}>
      <a href="#contenido" className="sr-only">Saltar al contenido</a>
      <BarraDesktop superpuesta={barraEnHero} />
      {!barraEnHero && <BarraMovil />}
      <main id="contenido">{children}</main>
      <Pie />
      <Dock />
    </div>
  );
}

import { useEffect, useRef } from 'react';

/** Fondo 3D del hero. Three.js se carga aparte; mientras, se ve un degradado de cielo y pasto. */
export default function CiudadFondo() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('../lib/escenaCiudad')
      .then(({ crearCiudad }) => {
        if (cancelled || !canvas.current || !root.current) return;
        try { cleanup = crearCiudad(canvas.current, root.current); } catch { /* sin WebGL: queda el degradado */ }
      })
      .catch(() => {});
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <div
      ref={root}
      role="img"
      aria-label="Ciudad verde con torres de vidrio, colinas, un río y aerogeneradores bajo un cielo azul"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'linear-gradient(180deg, #58B7EC 0%, #A9DDF4 45%, #E4F5F5 68%, #8DCF6E 70%, #5DB052 100%)' }}
    >
      <canvas ref={canvas} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent as RMouseEvent, type PointerEvent as RPointerEvent } from 'react';
import { BOTES, DibujoBote, DibujoResiduo, RESIDUOS, nombreBote, type Bote, type Residuo } from './residuos';
import './juego.css';

type Fase = 'intro' | 'jugando' | 'pausa' | 'fin';
type Modo = 'cae' | 'entra' | 'espera';
type Jugada = { r: Residuo; ok: boolean };

const CARRILES: Bote[] = ['org', 'rec', 'nor'];
const TOTAL = RESIDUOS.length;
const T_ENTRA = 0.34;
const T_ESPERA = 0.26;
const ETIQUETA = 18; // alto del nombre bajo cada bote, en px
const CLAVE_RECORD = 'deraiz-separa-record';

const barajar = <T,>(a: T[]) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

const leerRecord = () => {
  try { return Number(localStorage.getItem(CLAVE_RECORD)) || 0; } catch { return 0; }
};
const guardarRecord = (n: number) => {
  try { localStorage.setItem(CLAVE_RECORD, String(n)); } catch { /* sin almacenamiento */ }
};

/** Medidas del tablero en px a partir de su ancho y alto */
function medir(W: number, H: number) {
  const col = W / 3;
  const boteH = Math.min(H * 0.25, col * 0.9 * 1.12);
  const S = Math.min(col * 0.6, 84, H * 0.16);
  const boca = H - ETIQUETA - boteH * 0.82; // borde de la tapa
  return { col, boteH, S, boca, inicio: -S - 8, atrapa: boca - S * 0.5 };
}

export default function JuegoSepara() {
  const [fase, setFase] = useState<Fase>('intro');
  const [orden, setOrden] = useState<Residuo[]>(RESIDUOS);
  const [k, setK] = useState(0);
  const [marcador, setMarcador] = useState({ puntos: 0, aciertos: 0, racha: 0 });
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);
  const [fin, setFin] = useState({ puntos: 0, aciertos: 0, mejorRacha: 0, record: 0, nuevo: false, fallas: [] as Residuo[] });
  const [dim, setDim] = useState({ S: 64, boteH: 90, col: 110 });
  const [toque, setToque] = useState(false); // solo táctil, sin mouse

  const tarjeta = useRef<HTMLDivElement>(null);
  const tablero = useRef<HTMLDivElement>(null);
  const pieza = useRef<HTMLDivElement>(null);
  const botes = useRef<(HTMLDivElement | null)[]>([]);
  const pops = useRef<(HTMLSpanElement | null)[]>([]);
  const btnJugar = useRef<HTMLButtonElement>(null);
  const btnOtra = useRef<HTMLButtonElement>(null);
  const faseRef = useRef<Fase>('intro');
  faseRef.current = fase;

  const g = useRef({
    orden: RESIDUOS as Residuo[], k: 0,
    carril: 1, x: 1, p: 0, modo: 'cae' as Modo, t: 0,
    rapido: false, soltar: false,
    puntos: 0, aciertos: 0, racha: 0, mejorRacha: 0, jugadas: [] as Jugada[],
    W: 0, H: 0, ultimo: 0, cerca: '', carrilDom: ''
  });

  useEffect(() => {
    const fino = window.matchMedia('(any-pointer: fine)').matches;
    const grueso = window.matchMedia('(any-pointer: coarse)').matches;
    setToque(grueso && !fino);
  }, []);

  /* Medidas del tablero */
  useLayoutEffect(() => {
    const el = tablero.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      g.current.W = width;
      g.current.H = height;
      const m = medir(width, height);
      setDim({ S: Math.round(m.S), boteH: Math.round(m.boteH), col: Math.round(m.col) });
      dibujar();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ─────────── Lógica ─────────── */

  function dibujar() {
    const s = g.current;
    const el = pieza.current;
    const tb = tablero.current;
    if (!el || !tb || !s.W) return;
    const m = medir(s.W, s.H);
    let y = m.inicio;
    let esc = 1;
    let op = 1;
    if (s.modo === 'cae') y = m.inicio + (m.atrapa - m.inicio) * s.p;
    else if (s.modo === 'entra') {
      const q = Math.min(1, s.t / T_ENTRA);
      const e = q * q;
      y = m.atrapa + e * m.boteH * 0.55;
      esc = 1 - 0.55 * e;
      op = 1 - e;
    } else op = 0;
    const x = m.col * (s.x + 0.5) - m.S / 2;
    const giro = (s.carril - s.x) * 16;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${giro.toFixed(1)}deg) scale(${esc.toFixed(3)})`;
    el.style.opacity = String(op);

    const cerca = (s.modo === 'cae' && s.p > 0.55) || s.modo === 'entra' ? String(s.carril) : '';
    if (cerca !== s.cerca) { s.cerca = cerca; tb.dataset.cerca = cerca; }
    const carril = String(s.carril);
    if (carril !== s.carrilDom) { s.carrilDom = carril; tb.dataset.carril = carril; }
  }

  function reiniciarAnim(el: Element | null | undefined, clase: string) {
    if (!el) return;
    el.classList.remove(clase);
    void (el as HTMLElement).offsetWidth;
    el.classList.add(clase);
  }

  function resolver() {
    const s = g.current;
    const r = s.orden[s.k];
    const bote = CARRILES[s.carril];
    const ok = r.bote === bote;
    let pts = 0;
    if (ok) {
      s.racha += 1;
      s.aciertos += 1;
      pts = 100 + Math.min(s.racha - 1, 5) * 20;
      s.puntos += pts;
      s.mejorRacha = Math.max(s.mejorRacha, s.racha);
    } else s.racha = 0;
    s.jugadas.push({ r, ok });
    s.modo = 'entra';
    s.t = 0;
    s.soltar = false;

    const pop = pops.current[s.carril];
    if (pop) {
      pop.textContent = ok ? `+${pts}` : '✕';
      pop.dataset.ok = String(ok);
      reiniciarAnim(pop, 'on');
    }
    reiniciarAnim(botes.current[s.carril], ok ? 'jg-traga' : 'jg-sacude');
    if (!ok) reiniciarAnim(botes.current[CARRILES.indexOf(r.bote)], 'jg-pista');

    setMarcador({ puntos: s.puntos, aciertos: s.aciertos, racha: s.racha });
    setAviso(ok
      ? { ok, texto: s.racha > 1 ? `¡Bien! Racha de ${s.racha}.` : '¡Bien! Al bote correcto.' }
      : { ok, texto: `${r.nombre} va en ${nombreBote(r.bote)}. ${r.porque}` });
  }

  function siguiente() {
    const s = g.current;
    s.k += 1;
    if (s.k >= TOTAL) { terminar(); return; }
    s.p = 0; s.modo = 'cae'; s.t = 0; s.carril = 1; s.x = 1; s.soltar = false;
    setK(s.k);
  }

  function terminar() {
    const s = g.current;
    const prev = leerRecord();
    const nuevo = s.puntos > prev;
    if (nuevo) guardarRecord(s.puntos);
    setFin({
      puntos: s.puntos, aciertos: s.aciertos, mejorRacha: s.mejorRacha,
      record: Math.max(prev, s.puntos), nuevo: nuevo && s.puntos > 0,
      fallas: s.jugadas.filter((j) => !j.ok).map((j) => j.r)
    });
    setFase('fin');
  }

  function paso(dt: number) {
    const s = g.current;
    if (s.modo === 'cae') {
      const dur = Math.max(2.3, 5.4 - s.k * 0.27);
      const mult = s.soltar ? 9 : s.rapido ? 3.4 : 1;
      s.p += (dt / dur) * mult;
      if (s.p >= 1) { s.p = 1; resolver(); }
    } else if (s.modo === 'entra') {
      s.t += dt;
      if (s.t >= T_ENTRA) { s.modo = 'espera'; s.t = 0; }
    } else {
      s.t += dt;
      if (s.t >= T_ESPERA) siguiente();
    }
    s.x += (s.carril - s.x) * (1 - Math.exp(-dt * 20));
  }

  /* Bucle de animación: solo corre mientras se juega */
  useEffect(() => {
    if (fase !== 'jugando') return;
    const s = g.current;
    let raf = 0;
    s.ultimo = performance.now();
    const cuadro = (ahora: number) => {
      const dt = Math.min(0.05, (ahora - s.ultimo) / 1000);
      s.ultimo = ahora;
      paso(dt);
      if (faseRef.current === 'jugando') dibujar();
      raf = requestAnimationFrame(cuadro);
    };
    raf = requestAnimationFrame(cuadro);
    return () => cancelAnimationFrame(raf);
  }, [fase]);

  /* ─────────── Controles ─────────── */

  const jugando = () => faseRef.current === 'jugando' && g.current.modo === 'cae';
  const mover = (d: number) => { if (jugando()) g.current.carril = Math.max(0, Math.min(2, g.current.carril + d)); };
  const irA = (c: number) => { if (jugando()) g.current.carril = Math.max(0, Math.min(2, c)); };
  const soltar = () => { if (jugando()) g.current.soltar = true; };
  const pausar = () => { if (faseRef.current === 'jugando') { g.current.rapido = false; setFase('pausa'); } };
  const seguir = () => { if (faseRef.current === 'pausa') setFase('jugando'); };

  function empezar() {
    const s = g.current;
    const o = barajar(RESIDUOS);
    Object.assign(s, {
      orden: o, k: 0, carril: 1, x: 1, p: 0, modo: 'cae', t: 0, rapido: false, soltar: false,
      puntos: 0, aciertos: 0, racha: 0, mejorRacha: 0, jugadas: [], cerca: '', carrilDom: ''
    });
    setOrden(o);
    setK(0);
    setMarcador({ puntos: 0, aciertos: 0, racha: 0 });
    setAviso(null);
    setFase('jugando');
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tarjeta.current?.scrollIntoView({ block: 'start', behavior: reducir ? 'auto' : 'smooth' });
  }

  /* Teclado */
  useEffect(() => {
    const abajo = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const f = faseRef.current;
      if (f === 'jugando') {
        switch (e.key) {
          case 'ArrowLeft': case 'a': case 'A': mover(-1); break;
          case 'ArrowRight': case 'd': case 'D': mover(1); break;
          case 'ArrowDown': case 's': case 'S': g.current.rapido = true; break;
          case ' ': case 'ArrowUp': case 'w': case 'W': if (!e.repeat) soltar(); break;
          case 'p': case 'P': case 'Escape': pausar(); break;
          default: return;
        }
        e.preventDefault();
      } else if (f === 'pausa' && (e.key === 'p' || e.key === 'P' || e.key === 'Escape')) {
        e.preventDefault();
        seguir();
      }
    };
    const arriba = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') g.current.rapido = false;
    };
    const oculta = () => { if (document.hidden) pausar(); };
    const blur = () => { g.current.rapido = false; };
    window.addEventListener('keydown', abajo);
    window.addEventListener('keyup', arriba);
    window.addEventListener('blur', blur);
    document.addEventListener('visibilitychange', oculta);
    return () => {
      window.removeEventListener('keydown', abajo);
      window.removeEventListener('keyup', arriba);
      window.removeEventListener('blur', blur);
      document.removeEventListener('visibilitychange', oculta);
    };
  }, []);

  /* Gestos sobre el tablero: deslizar para mover, hacia abajo para soltar, tocar un carril para ir ahí */
  const gesto = useRef<{ id: number; x0: number; y0: number; xr: number; movio: boolean } | null>(null);
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (faseRef.current !== 'jugando' || (e.pointerType === 'mouse' && e.button !== 0)) return;
    gesto.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, xr: e.clientX, movio: false };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const gs = gesto.current;
    if (!gs || gs.id !== e.pointerId) return;
    const umbral = Math.max(36, (g.current.W / 3) * 0.55);
    const dx = e.clientX - gs.xr;
    if (Math.abs(dx) >= umbral) {
      mover(dx > 0 ? 1 : -1);
      gs.xr = e.clientX;
      gs.movio = true;
    }
  };
  const onUp = (e: RPointerEvent<HTMLDivElement>) => {
    const gs = gesto.current;
    if (!gs || gs.id !== e.pointerId) return;
    gesto.current = null;
    const dx = e.clientX - gs.x0;
    const dy = e.clientY - gs.y0;
    if (gs.movio) return;
    if (dy > 40 && dy > Math.abs(dx)) { soltar(); return; }
    if (Math.abs(dx) > 24 && Math.abs(dx) > Math.abs(dy)) { mover(dx > 0 ? 1 : -1); return; }
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
      const r = e.currentTarget.getBoundingClientRect();
      irA(Math.floor(((e.clientX - r.left) / r.width) * 3));
    }
  };

  /* Botones del control: actúan al presionar, sin esperar el click */
  const boton = (accion: () => void) => ({
    onPointerDown: (e: RPointerEvent<HTMLButtonElement>) => { e.preventDefault(); accion(); },
    onClick: (e: RMouseEvent<HTMLButtonElement>) => { if (e.detail === 0) accion(); }
  });

  /* Foco al cambiar de fase */
  useEffect(() => {
    if (fase === 'fin') btnOtra.current?.focus({ preventScroll: true });
    if (fase === 'jugando') (document.activeElement as HTMLElement | null)?.blur?.();
  }, [fase]);

  /* Conteo animado del puntaje final */
  const [cuenta, setCuenta] = useState(0);
  useEffect(() => {
    if (fase !== 'fin') return;
    const meta = fin.puntos;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCuenta(meta); return; }
    let raf = 0;
    const t0 = performance.now();
    const f = (t: number) => {
      const q = Math.min(1, (t - t0) / 900);
      setCuenta(Math.round(meta * (1 - Math.pow(1 - q, 3))));
      if (q < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [fase, fin.puntos]);

  const actual = orden[Math.min(k, TOTAL - 1)];
  const sig = k + 1 < TOTAL ? orden[k + 1] : null;
  const enJuego = fase === 'jugando' || fase === 'pausa';
  const mensaje = fin.aciertos === TOTAL ? 'Perfecto. Separas como experto.'
    : fin.aciertos >= 9 ? 'Muy bien. Ya casi no fallas.'
    : fin.aciertos >= 5 ? 'Vas bien. Repasa los que se te fueron.'
    : 'Dale otra vuelta: se aprende rápido.';

  return (
    <div ref={tarjeta} className="jg-card" data-fase={fase}>
      {/* Marcador */}
      <div className="jg-hud">
        <dl className="jg-stats">
          <div><dt>Puntos</dt><dd>{marcador.puntos}</dd></div>
          <div><dt>Bien</dt><dd>{marcador.aciertos}<span>/{TOTAL}</span></dd></div>
          <div><dt>Racha</dt><dd>{marcador.racha}</dd></div>
        </dl>
        <div className="jg-sig" aria-hidden={!enJuego}>
          <span className="jg-sig-t">Sigue</span>
          <span className="jg-sig-d">{enJuego && sig ? <DibujoResiduo key={sig.id} id={sig.id} /> : null}</span>
          <span className="jg-sig-n">{enJuego ? (sig ? sig.nombre : 'Último') : '—'}</span>
        </div>
        <button
          type="button"
          className="jg-pausa"
          onClick={() => (fase === 'pausa' ? seguir() : pausar())}
          disabled={!enJuego}
          aria-label={fase === 'pausa' ? 'Continuar' : 'Pausar'}
        >
          {fase === 'pausa'
            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" fill="currentColor" /></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" /></svg>}
        </button>
      </div>

      {/* Tablero */}
      <div
        ref={tablero}
        className="jg-board"
        data-carril="1"
        role="group"
        aria-label="Tablero del juego"
        aria-describedby="jg-ayuda"
        style={{ '--S': `${dim.S}px`, '--boteH': `${dim.boteH}px`, '--col': `${dim.col}px`, '--etq': `${ETIQUETA}px` } as CSSProperties}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => { gesto.current = null; }}
      >
        <div className="jg-carriles" aria-hidden="true"><span /><span /><span /></div>
        <span className="bub jg-b1" aria-hidden="true" />
        <span className="bub jg-b2" aria-hidden="true" />

        <div ref={pieza} className="jg-pieza" aria-hidden="true" style={{ opacity: 0 }}>
          {enJuego && <DibujoResiduo key={actual.id + k} id={actual.id} />}
          {enJuego && <span className="jg-chip">{actual.nombre}</span>}
        </div>

        <div className="jg-botes">
          {BOTES.map((b, i) => (
            <div key={b.id} className="jg-bote" ref={(el) => { botes.current[i] = el; }}>
              <span className="jg-pop" ref={(el) => { pops.current[i] = el; }} aria-hidden="true" />
              <DibujoBote bote={b.id} />
              <span className="jg-bote-n">{b.nombre}</span>
            </div>
          ))}
        </div>

        {fase === 'intro' && (
          <div className="jg-over">
            <div className="jg-demo" aria-hidden="true">
              <span><DibujoResiduo id="naranja" /></span>
              <span><DibujoResiduo id="pet" /></span>
              <span><DibujoResiduo id="colilla" /></span>
            </div>
            <h2 className="jg-over-t">Que no caiga en el bote equivocado</h2>
            <p className="jg-over-p">Van a bajar {TOTAL} residuos, cada vez más rápido. Llévalos a su bote antes de que lleguen abajo.</p>
            <p className="jg-over-k">{toque ? 'Desliza o toca un carril para moverte. Desliza hacia abajo para soltar.' : 'Flechas ← → para mover, ↓ para acelerar y espacio para soltar.'}</p>
            <button ref={btnJugar} type="button" className="btn" onClick={empezar}>Jugar</button>
          </div>
        )}

        {fase === 'pausa' && (
          <div className="jg-over">
            <h2 className="jg-over-t">En pausa</h2>
            <p className="jg-over-p">Vas en {k + 1} de {TOTAL}.</p>
            <div className="jg-over-a">
              <button type="button" className="btn" onClick={seguir} autoFocus>Continuar</button>
              <button type="button" className="lk" onClick={empezar}>Empezar de nuevo</button>
            </div>
          </div>
        )}

        {fase === 'fin' && (
          <div className="jg-over jg-fin">
            <p className="jg-over-e">Tu puntaje</p>
            <p className="jg-score gt" aria-label={`${fin.puntos} puntos`}>{cuenta}</p>
            <p className="jg-over-p">{fin.aciertos} de {TOTAL} bien · mejor racha {fin.mejorRacha}</p>
            {fin.nuevo
              ? <p className="jg-record">Nuevo récord</p>
              : fin.record > 0 && <p className="jg-over-k">Récord: {fin.record}</p>}
            <p className="jg-over-m">{mensaje}</p>
            <button ref={btnOtra} type="button" className="btn" onClick={empezar}>Volver a jugar</button>
          </div>
        )}
      </div>

      {/* Aviso, repaso y ayuda */}
      <div className="jg-side">
        <p className="sr-only" aria-live="polite">{fase === 'jugando' ? `Cae: ${actual.nombre}` : ''}</p>
        {fase === 'fin' ? (
          fin.fallas.length ? (
            <div className="jg-repaso">
              <p className="jg-side-t">Repasa</p>
              <ul>
                {fin.fallas.map((r) => (
                  <li key={r.id}>
                    <span className="jg-repaso-d"><DibujoResiduo id={r.id} /></span>
                    <span><strong>{r.nombre}</strong> va en {nombreBote(r.bote)}. {r.porque}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : <p className="jg-aviso" data-ok="true">Sin un solo error. Así se separa.</p>
        ) : (
          <p className="jg-aviso" role="status" data-ok={aviso ? String(aviso.ok) : undefined}>
            {aviso ? aviso.texto : fase === 'intro' ? 'Verde para orgánicos, gris para reciclables y naranja para lo que ya no se recicla.' : 'Mueve el residuo a su bote.'}
          </p>
        )}
        <p id="jg-ayuda" className="jg-teclas">
          {toque
            ? 'Desliza a los lados o toca un carril. Desliza hacia abajo o usa “Soltar” para que caiga ya.'
            : <>Usa <kbd>←</kbd> <kbd>→</kbd> para mover, <kbd>↓</kbd> para acelerar, <kbd>Espacio</kbd> para soltar y <kbd>P</kbd> para pausar.</>}
        </p>
      </div>

      {/* Control en pantalla */}
      <div className="jg-pad" aria-label="Controles" role="group" hidden={!enJuego}>
        <button type="button" className="jg-pad-b" aria-label="Mover a la izquierda" {...boton(() => mover(-1))}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="jg-pad-b jg-pad-s" {...boton(soltar)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v13M6 11l6 6 6-6M6 20h12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Soltar
        </button>
        <button type="button" className="jg-pad-b" aria-label="Mover a la derecha" {...boton(() => mover(1))}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

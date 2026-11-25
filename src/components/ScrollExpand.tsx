/**
 * Adaptado de "Scroll Expand" de React Bits (https://reactbits.dev).
 * Copyright (c) 2026 David Haz. MIT + Commons Clause License Condition v1.0.
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * Cambios: título como ReactNode, velo claro configurable, tamaño inicial
 * distinto en móvil y sin modo de scroll interno (usa el scroll de la ventana).
 */
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type Props = {
  src: string;
  /** Versión vertical de la imagen para pantallas angostas (teléfono en vertical) */
  srcPortrait?: string;
  alt: string;
  title?: ReactNode;
  scrollHint?: string;
  /** Tamaño inicial del marco en % del escenario (desktop / móvil) */
  startWidth?: number;
  startHeight?: number;
  mobileStartWidth?: number;
  mobileStartHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  /** Altura de scroll para expandir, en pantallas */
  scrollDistance?: number;
  /** Pausa con el marco expandido antes de seguir, en pantallas */
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  children?: ReactNode;
};

export default function ScrollExpand({
  src,
  srcPortrait,
  alt,
  title,
  scrollHint,
  startWidth = 58,
  startHeight = 64,
  mobileStartWidth = 86,
  mobileStartHeight = 50,
  startRadius = 28,
  endRadius = 0,
  mediaZoom = 1.06,
  scrollDistance = 0.9,
  holdDistance = 0.25,
  smoothing = 0.1,
  overlayScrim = 1,
  children
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const cfg = useRef({ sw: startWidth, sh: startHeight });

  const conf = { startWidth, startHeight, mobileStartWidth, mobileStartHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim };
  const propsRef = useRef(conf);
  propsRef.current = conf;

  const apply = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;
    const e = smoothstep(0, 1, p);
    const w = cfg.current.sw + (100 - cfg.current.sw) * e;
    const h = cfg.current.sh + (100 - cfg.current.sh) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;
    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * smoothstep(0.5, 1, p)}`;
    if (titleRef.current) {
      const out = smoothstep(0.3, 0.75, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-24 * out}px, 0)`;
      titleRef.current.style.visibility = out > 0.99 ? 'hidden' : 'visible';
    }
    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
    }
    if (overlayRef.current) {
      const inn = smoothstep(0.7, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${16 * (1 - inn)}px, 0)`;
      overlayRef.current.style.visibility = inn < 0.01 ? 'hidden' : 'visible';
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, current = 0, target = 0, stageH = 0, running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = window.innerHeight;
      const mobile = window.innerWidth < 700;
      cfg.current = { sw: mobile ? c.mobileStartWidth : c.startWidth, sh: mobile ? c.mobileStartHeight : c.startHeight };
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;
    };
    const read = () => clamp(-track.getBoundingClientRect().top / (stageH * Math.max(0.01, propsRef.current.scrollDistance)), 0, 1);
    const tick = () => {
      const k = 1 - Math.exp(-1 / (60 * propsRef.current.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) { current = target; running = false; }
      apply(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      target = read();
      if (reduce || propsRef.current.smoothing <= 0) { current = target; apply(current); return; }
      if (!running) { running = true; if (!raf) raf = requestAnimationFrame(tick); }
    };
    const onResize = () => { measure(); target = read(); current = target; apply(current); };

    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [apply]);

  return (
    <div ref={trackRef} className="scroll-expand__track">
      <div ref={stageRef} className="scroll-expand__stage">
        <div ref={frameRef} className="scroll-expand__frame">
          <picture className="scroll-expand__picture">
            {srcPortrait && <source media="(max-aspect-ratio: 4/5)" srcSet={srcPortrait} />}
            <img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable={false} fetchPriority="high" />
          </picture>
          <div ref={scrimRef} className="scroll-expand__scrim" />
          {children && <div ref={overlayRef} className="scroll-expand__overlay">{children}</div>}
        </div>
        {title && <div ref={titleRef} className="scroll-expand__title">{title}</div>}
        {scrollHint && <div ref={hintRef} className="scroll-expand__hint" aria-hidden="true">{scrollHint}</div>}
      </div>
    </div>
  );
}

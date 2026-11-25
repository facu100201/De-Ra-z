import { useId, type ReactNode } from 'react';

export type Bote = 'org' | 'rec' | 'nor';

export type Residuo = { id: string; nombre: string; bote: Bote; porque: string };

export const RESIDUOS: Residuo[] = [
  { id: 'naranja', nombre: 'Cáscara de naranja', bote: 'org', porque: 'Restos de comida: al verde, y terminan como composta.' },
  { id: 'cafe', nombre: 'Café con filtro', bote: 'org', porque: 'Café y té, con todo y filtro de papel, van al verde.' },
  { id: 'platano', nombre: 'Cáscara de plátano', bote: 'org', porque: 'Cáscaras y restos de fruta van al verde.' },
  { id: 'manzana', nombre: 'Corazón de manzana', bote: 'org', porque: 'Restos de comida: al verde. Se vuelven composta.' },
  { id: 'pet', nombre: 'Botella de PET', bote: 'rec', porque: 'Vacíala, aplástala y al gris. Con botellas así hicimos el filamento de nuestra base para laptop.' },
  { id: 'carton', nombre: 'Caja de cartón', bote: 'rec', porque: 'Seca y doblada, al gris. La parte con grasa ya no sirve.' },
  { id: 'lata', nombre: 'Lata de aluminio', bote: 'rec', porque: 'Enjuagada y aplastada, al gris. El aluminio se recicla una y otra vez.' },
  { id: 'tela', nombre: 'Retazo de tela', bote: 'rec', porque: 'Los textiles van al gris. Y si es algodón o mezclilla, nos sirve para una tote.' },
  { id: 'papitas', nombre: 'Bolsa de papitas', bote: 'nor', porque: 'Es multicapa metalizada: casi nadie la recicla. Al naranja.' },
  { id: 'unicel', nombre: 'Vaso de unicel', bote: 'nor', porque: 'El unicel no se recicla en la ciudad: al naranja.' },
  { id: 'colilla', nombre: 'Colilla', bote: 'nor', porque: 'No reciclable. Y nunca al suelo.' },
  { id: 'panal', nombre: 'Pañal usado', bote: 'nor', porque: 'Los residuos sanitarios, como pañales y toallas, van al naranja.' }
];

export const BOTES: { id: Bote; nombre: string; c1: string; c2: string; c3: string }[] = [
  { id: 'org', nombre: 'Orgánico', c1: '#A6E3AE', c2: '#2E9A4B', c3: '#1C6633' },
  { id: 'rec', nombre: 'Reciclable', c1: '#EEF2F5', c2: '#8C98A5', c3: '#56606B' },
  { id: 'nor', nombre: 'No reciclable', c1: '#FFD29E', c2: '#E0700F', c3: '#9E4805' }
];

export const nombreBote = (b: Bote) => BOTES.find((x) => x.id === b)!.nombre;

/* ───────────────────────── Dibujos de residuos ───────────────────────── */

type Pinta = (u: (s: string) => string) => ReactNode;

const dibujos: Record<string, Pinta> = {
  naranja: (u) => (
    <>
      <defs>
        <radialGradient id={u('a')} cx=".38" cy=".25" r=".85">
          <stop offset="0" stopColor="#FFC56B" />
          <stop offset=".55" stopColor="#F48A1F" />
          <stop offset="1" stopColor="#CC5F0A" />
        </radialGradient>
      </defs>
      <path d="M9 33c2 21 17 35 33 35 16 0 29-14 29-33-4 2-8 2-11 0-6 10-16 15-27 12-9-3-15-9-17-15-2 1-5 2-7 1z" fill={`url(#${u('a')})`} />
      <path d="M15 34c3 7 9 12 17 14 11 3 21-1 27-11" fill="none" stroke="#FFF1D6" strokeWidth="3.2" strokeLinecap="round" />
      <g fill="#C85A08" opacity=".45">
        <circle cx="24" cy="54" r="1.1" /><circle cx="33" cy="60" r="1.1" /><circle cx="45" cy="61" r="1.1" /><circle cx="56" cy="55" r="1.1" /><circle cx="39" cy="54" r="1" /><circle cx="51" cy="49" r="1" />
      </g>
      <path d="M45 13c9-4 18 1 17 9-1 6-8 8-12 4" fill="none" stroke="#F48A1F" strokeWidth="7" strokeLinecap="round" />
      <path d="M46 12c7-2 13 1 14 6" fill="none" stroke="#FFE2B0" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 40c4 4 9 6 14 7" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  cafe: (u) => (
    <>
      <defs>
        <linearGradient id={u('a')} x1="0" x2="1">
          <stop offset="0" stopColor="#E9DCC0" /><stop offset=".45" stopColor="#FBF5E8" /><stop offset="1" stopColor="#E2D2B0" />
        </linearGradient>
      </defs>
      <path d="M12 25h56L48 69H32z" fill={`url(#${u('a')})`} stroke="#D8C49C" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M22 25l13 44M32 25l5 44M48 25l-5 44M58 25l-13 44" stroke="#D8C49C" strokeWidth="1" opacity=".8" />
      <path d="M13 25c3-9 14-14 27-14s24 5 27 14z" fill="#5A3A22" />
      <path d="M20 21c5-4 12-6 20-6" fill="none" stroke="#8A6040" strokeWidth="2" strokeLinecap="round" />
      <g fill="#3A2414"><circle cx="30" cy="20" r="1" /><circle cx="44" cy="17" r="1" /><circle cx="52" cy="21" r="1" /><circle cx="38" cy="22" r=".9" /></g>
      <path d="M12 25l3 2 3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2 3-2" fill="none" stroke="#E2D2B0" strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  platano: () => (
    <>
      <path d="M37 9h6l1 11h-8z" fill="#6E5220" />
      <path d="M39 20c-11 3-20 16-23 36 5 1 9-2 11-6 2-12 7-21 13-25z" fill="#F2C531" />
      <path d="M41 20c11 3 20 16 23 36-5 1-9-2-11-6-2-12-7-21-13-25z" fill="#E8B925" />
      <path d="M38 20c-4 15-3 32 2 48 5-16 6-33 2-48z" fill="#F9DB5C" />
      <path d="M38 21c-3 12-6 22-12 31" fill="none" stroke="#FFF3C4" strokeWidth="2" strokeLinecap="round" opacity=".9" />
      <path d="M43 21c3 12 6 22 12 31" fill="none" stroke="#FFF3C4" strokeWidth="2" strokeLinecap="round" opacity=".6" />
      <g fill="#7A5418" opacity=".7"><circle cx="24" cy="44" r="1.4" /><circle cx="57" cy="41" r="1.2" /><circle cx="40" cy="52" r="1.1" /><circle cx="29" cy="35" r="1" /></g>
      <path d="M16 56c2 1 4 1 5 0M59 56c2 1 4 0 5 0M38 66l2 3 2-3" fill="none" stroke="#5E4313" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  manzana: (u) => (
    <>
      <defs>
        <radialGradient id={u('a')} cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#FF8A7A" /><stop offset=".55" stopColor="#E0392B" /><stop offset="1" stopColor="#A61E16" />
        </radialGradient>
      </defs>
      <path d="M40 15c0-4 1-7 3-9" stroke="#6E4A20" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M43 9c4-4 10-4 13-1-4 3-9 4-13 1z" fill="#5FAF4E" />
      <path d="M22 17c0-5 8-6 18-6s18 1 18 6c0 6-7 10-12 12H34c-5-2-12-6-12-12z" fill={`url(#${u('a')})`} />
      <path d="M34 28c-4 9-4 20 0 30h12c4-10 4-21 0-30z" fill="#FFF4D8" />
      <path d="M34 28c-2 9-2 20 0 30" fill="none" stroke="#F0DDB0" strokeWidth="2" />
      <path d="M22 66c0 5 8 6 18 6s18-1 18-6c0-6-7-9-12-9H34c-5 0-12 3-12 9z" fill={`url(#${u('a')})`} />
      <g fill="#4A2A12"><ellipse cx="37.5" cy="40" rx="1.6" ry="2.6" /><ellipse cx="42.5" cy="45" rx="1.6" ry="2.6" /><ellipse cx="38.5" cy="49" rx="1.5" ry="2.4" /></g>
      <path d="M27 15c2-2 5-3 8-3" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  pet: (u) => (
    <g transform="rotate(-12 40 40)">
      <defs>
        <linearGradient id={u('a')} x1="0" x2="1">
          <stop offset="0" stopColor="#BFE6FA" /><stop offset=".4" stopColor="#F4FCFF" /><stop offset="1" stopColor="#8FCAEA" />
        </linearGradient>
      </defs>
      <rect x="33" y="5" width="14" height="9" rx="2.5" fill="#2F7FD0" />
      <path d="M33 9h14" stroke="#1F5FA8" strokeWidth="1" />
      <path d="M35 14h10v5c0 3 9 7 9 15v35a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6V34c0-8 9-12 9-15z" fill={`url(#${u('a')})`} stroke="#79B6D8" strokeWidth="1.4" />
      <rect x="26" y="40" width="28" height="14" fill="#5DB36A" />
      <path d="M26 44h28" stroke="#8ED39A" strokeWidth="1.4" />
      <path d="M31 30v8M31 57v12" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".85" />
      <path d="M27 66c4 3 9 3 13 0 4 3 9 3 13 0" fill="none" stroke="#79B6D8" strokeWidth="1.2" />
    </g>
  ),
  carton: () => (
    <>
      <path d="M8 29 40 16l32 13-32 13z" fill="#DDB47E" />
      <path d="M8 29v29l32 14V42z" fill="#C4925A" />
      <path d="M72 29v29L40 72V42z" fill="#A87642" />
      <path d="M21 23.7 27 21.2 59 34.3 53 36.8z" fill="#EBD6AC" />
      <path d="M53 36.8v5l6-2.5v-5z" fill="#E1C894" />
      <path d="M40 42v30" stroke="#8E6234" strokeWidth="1" />
      <g fill="none" stroke="#8A5E30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".7">
        <path d="M17 50v-7l-3 3M17 43l3 4" />
        <path d="M25 53v-7l-3 3M25 46l3 4" />
      </g>
      <path d="M8 29 40 42l32-13" fill="none" stroke="#F0D3A6" strokeWidth="1" opacity=".7" />
    </>
  ),
  lata: (u) => (
    <g transform="rotate(9 40 40)">
      <defs>
        <linearGradient id={u('a')} x1="0" x2="1">
          <stop offset="0" stopColor="#A9B2BC" /><stop offset=".35" stopColor="#F5F7F9" /><stop offset="1" stopColor="#8B95A0" />
        </linearGradient>
        <linearGradient id={u('b')} x1="0" x2="1">
          <stop offset="0" stopColor="#A82A1E" /><stop offset=".35" stopColor="#E5523F" /><stop offset="1" stopColor="#8E2218" />
        </linearGradient>
      </defs>
      <path d="M24 16h32v50c0 3-7 5-16 5s-16-2-16-5z" fill={`url(#${u('a')})`} />
      <rect x="24" y="28" width="32" height="26" fill={`url(#${u('b')})`} />
      <path d="M29 36c4-3 10-3 14 0s10 3 13 0" fill="none" stroke="#FFD0C8" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="40" cy="16" rx="16" ry="4.5" fill="#DCE2E7" stroke="#8B95A0" strokeWidth="1.2" />
      <ellipse cx="40" cy="16" rx="11" ry="2.8" fill="#C5CDD4" />
      <path d="M38 14.5h7a2 2 0 0 1 0 3h-7z" fill="#9AA4AE" />
      <path d="M29 20v44" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".8" />
    </g>
  ),
  tela: (u) => (
    <>
      <defs>
        <linearGradient id={u('a')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F70AE" /><stop offset="1" stopColor="#233C74" />
        </linearGradient>
        <pattern id={u('p')} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <path d="M0 0v4" stroke="#fff" strokeOpacity=".1" strokeWidth="1.4" />
        </pattern>
      </defs>
      <path d="M12 22l48-9 9 41-50 11z" fill={`url(#${u('a')})`} />
      <path d="M12 22l48-9 9 41-50 11z" fill={`url(#${u('p')})`} />
      <path d="M17.5 25.5l39.5-7.5 7.5 33.5-41 9z" fill="none" stroke="#E9B45A" strokeWidth="1.6" strokeDasharray="3 2.6" />
      <path d="M12 22l-4 1M12.8 27l-4.2.6M13.7 32l-4.3.3M14.6 37l-4.4.4M15.5 42l-4.2 1M16.4 47l-4.4.2M17.3 52l-4.2 1M18.2 57l-4.4.5" stroke="#3E5C98" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M30 34h16v12H30z" fill="#2C4884" stroke="#E9B45A" strokeWidth="1.2" strokeDasharray="2.4 2" transform="rotate(-11 38 40)" />
    </>
  ),
  papitas: (u) => (
    <>
      <defs>
        <linearGradient id={u('a')} x1="0" x2="1">
          <stop offset="0" stopColor="#C8341E" /><stop offset=".3" stopColor="#F2582F" /><stop offset=".55" stopColor="#FFB08A" /><stop offset=".7" stopColor="#E9472A" /><stop offset="1" stopColor="#B22A17" />
        </linearGradient>
        <linearGradient id={u('b')} x1="0" x2="1">
          <stop offset="0" stopColor="#9AA3AD" /><stop offset=".5" stopColor="#F1F4F6" /><stop offset="1" stopColor="#9AA3AD" />
        </linearGradient>
      </defs>
      <path d="M18 18h44l-2 6 3 5-3 20 3 15-3 5H18l-3-5 3-15-3-20 3-5z" fill={`url(#${u('a')})`} />
      <path d="M17 12h46v7H17zM17 68h46v6H17z" fill={`url(#${u('b')})`} />
      <path d="M21 12v7M25 12v7M29 12v7M33 12v7M37 12v7M41 12v7M45 12v7M49 12v7M53 12v7M57 12v7M61 12v7M21 68v6M25 68v6M29 68v6M33 68v6M37 68v6M41 68v6M45 68v6M49 68v6M53 68v6M57 68v6M61 68v6" stroke="#7C8590" strokeWidth=".8" opacity=".7" />
      <ellipse cx="40" cy="45" rx="13" ry="9" fill="#F6C766" transform="rotate(-14 40 45)" />
      <path d="M30 46c3-3 7-4 10-2s7 1 10-2" fill="none" stroke="#D9A23E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M26 24c6-2 12-2 18-1" fill="none" stroke="#FFE3D2" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M28 33l-4 30" stroke="#fff" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  unicel: (u) => (
    <>
      <defs>
        <linearGradient id={u('a')} x1="0" x2="1">
          <stop offset="0" stopColor="#E3E6DE" /><stop offset=".4" stopColor="#FFFFFF" /><stop offset="1" stopColor="#D5D9CF" />
        </linearGradient>
      </defs>
      <path d="M19 17h42l-7 53H26z" fill={`url(#${u('a')})`} stroke="#CDD2C6" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="16" y="11" width="48" height="8" rx="4" fill="#FFFFFF" stroke="#CDD2C6" strokeWidth="1.2" />
      <g fill="#C2C8BC" opacity=".8"><circle cx="30" cy="30" r=".9" /><circle cx="44" cy="27" r=".9" /><circle cx="37" cy="40" r=".9" /><circle cx="49" cy="42" r=".9" /><circle cx="33" cy="53" r=".9" /><circle cx="45" cy="58" r=".9" /><circle cx="27" cy="45" r=".8" /></g>
      <path d="M26 24l4 40" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 26h36" stroke="#DDE1D7" strokeWidth="1" />
    </>
  ),
  colilla: () => (
    <g transform="rotate(-24 40 40)">
      <rect x="14" y="34" width="22" height="13" rx="3" fill="#E39A43" />
      <g fill="#B8701F" opacity=".6"><circle cx="19" cy="38" r=".9" /><circle cx="25" cy="42" r=".9" /><circle cx="31" cy="38" r=".9" /><circle cx="21" cy="44" r=".8" /><circle cx="29" cy="44" r=".8" /></g>
      <path d="M36 34h20c2 0 3 2 4 4l1 2-1 2c-1 2-2 5-4 5H36z" fill="#F6F3EC" />
      <path d="M36 34v13" stroke="#D9B44A" strokeWidth="2" />
      <path d="M45 34l2 5-1 3 2 5M52 34l-1 6 2 7" fill="none" stroke="#DCD7CB" strokeWidth="1" />
      <path d="M58 35c3 1 5 3 5 5s-2 5-5 6c1-4 1-7 0-11z" fill="#8F8A82" />
      <path d="M17 37h16" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  panal: (u) => (
    <>
      <defs>
        <linearGradient id={u('a')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E2EAEF" />
        </linearGradient>
      </defs>
      <path d="M11 24c0-4 4-7 8-7h42c4 0 8 3 8 7v6c-9 2-15 10-17 22-1 7-6 12-12 12s-11-5-12-12c-2-12-8-20-17-22z" fill={`url(#${u('a')})`} stroke="#CBD7DF" strokeWidth="1.4" />
      <rect x="6" y="21" width="11" height="9" rx="3.5" fill="#8CC6E7" />
      <rect x="63" y="21" width="11" height="9" rx="3.5" fill="#8CC6E7" />
      <path d="M16 23h48" stroke="#BCD8EA" strokeWidth="3.4" strokeDasharray="2.2 2.6" />
      <g fill="#8CC6E7"><circle cx="30" cy="37" r="2" /><circle cx="44" cy="34" r="1.6" /><circle cx="38" cy="48" r="1.8" /><circle cx="50" cy="43" r="1.4" /></g>
      <path d="M26 31c3 2 5 6 6 11" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </>
  )
};

export function DibujoResiduo({ id, size, title }: { id: string; size?: number | string; title?: string }) {
  const base = useId().replace(/[^a-zA-Z0-9]/g, '');
  const u = (s: string) => `${base}${id}${s}`;
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {dibujos[id]?.(u)}
    </svg>
  );
}

/* ───────────────────────── Botes ───────────────────────── */

const iconos: Record<Bote, ReactNode> = {
  org: (
    <>
      <path d="M42 76c0-12 7-19 18-19 0 12-7 19-18 19z" fill="#2E9A4B" />
      <path d="M42 76l11-11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  rec: (
    <g fill="none" stroke="#56606B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M43 62a9 9 0 0 1 14-2" />
      <path d="M55 56l2.6 4.2-4.8.8" />
      <path d="M59 70a9 9 0 0 1-14 2" />
      <path d="M47 76l-2.6-4.2 4.8-.8" />
    </g>
  ),
  nor: (
    <g fill="none" stroke="#C4600C" strokeWidth="3" strokeLinecap="round">
      <circle cx="50" cy="66" r="8.5" />
      <path d="M44 72l12-12" />
    </g>
  )
};

export function DibujoBote({ bote }: { bote: Bote }) {
  const b = BOTES.find((x) => x.id === bote)!;
  const base = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = `${base}g`;
  const l = `${base}l`;
  return (
    <svg viewBox="0 0 100 112" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={g} x1="0" x2="1">
          <stop offset="0" stopColor={b.c2} /><stop offset=".3" stopColor={b.c1} /><stop offset=".62" stopColor={b.c2} /><stop offset="1" stopColor={b.c3} />
        </linearGradient>
        <linearGradient id={l} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={b.c1} /><stop offset="1" stopColor={b.c2} />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="108" rx="34" ry="3.6" fill="rgba(28,46,34,.16)" />
      <ellipse cx="50" cy="26" rx="37" ry="5" fill="rgba(20,30,24,.45)" />
      <path d="M13 26h74l-7 77a6 6 0 0 1-6 5H26a6 6 0 0 1-6-5z" fill={`url(#${g})`} />
      <path d="M36 34l1.5 64M50 34v64M64 34l-1.5 64" stroke="#fff" strokeOpacity=".18" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 34c1.6 22 3 44 4.6 64" stroke="#fff" strokeOpacity=".5" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="50" cy="66" r="15" fill="#fff" fillOpacity=".9" />
      {iconos[bote]}
      <g className="jg-lid">
        <rect x="6" y="15" width="88" height="13" rx="6.5" fill={`url(#${l})`} />
        <rect x="6" y="15" width="88" height="5" rx="2.5" fill="#fff" fillOpacity=".35" />
        <rect x="40" y="8" width="20" height="9" rx="4.5" fill="none" stroke={b.c3} strokeWidth="3.2" />
      </g>
    </svg>
  );
}

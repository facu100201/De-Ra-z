export type Pieza = 'tote' | 'base' | 'libreta';

const etiquetas: Record<Pieza, string> = {
  tote: 'Tote hecha con un pantalón azul marino reutilizado y correa de tela de playera gris',
  base: 'Soporte para laptop impreso en 3D en blanco, con mecanismo de tijera y niveles de altura',
  libreta: 'Libreta de hojas de papel reciclado engargoladas'
};

/** Ilustraciones de cada pieza, basadas en los prototipos reales */
export default function Arte({ pieza, decorativa = false }: { pieza: Pieza; decorativa?: boolean }) {
  const a11y = decorativa ? { 'aria-hidden': true as const } : { role: 'img', 'aria-label': etiquetas[pieza] };
  const style = { width: '100%', height: 'auto' };

  if (pieza === 'tote') {
    return (
      <svg viewBox="0 0 200 200" style={style} {...a11y}>
        <defs>
          <linearGradient id="dr2ToteBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2A3A5E" /><stop offset="1" stopColor="#18223A" /></linearGradient>
          <linearGradient id="dr2Strap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7C8899" /><stop offset=".5" stopColor="#6A7687" /><stop offset="1" stopColor="#7C8899" /></linearGradient>
        </defs>
        <ellipse cx="100" cy="190" rx="66" ry="6" fill="#1C2E22" opacity=".16" />
        <path d="M60 86 C46 50 52 8 94 6 C132 4 150 28 152 58 C153 70 151 80 148 88" fill="none" stroke="url(#dr2Strap)" strokeWidth="10" strokeLinecap="round" />
        <path d="M60 86 C46 50 52 8 94 6 C132 4 150 28 152 58 C153 70 151 80 148 88" fill="none" stroke="#97A2B1" strokeWidth="2" strokeLinecap="round" strokeDasharray="14 10" opacity=".7" />
        <path d="M148 40 q8 6 3 14 q-6 -3 -3 -14z" fill="#5C6878" />
        <path d="M40 92 H162 L167 172 Q167 180 159 180 H43 Q35 180 35 172 Z" fill="url(#dr2ToteBody)" />
        <rect x="38" y="80" width="126" height="13" rx="2" fill="#22304F" />
        <path d="M38 93 H164" stroke="#33446E" strokeWidth="1" strokeDasharray="2.5 2" />
        <path d="M38 82.5 H164" stroke="#33446E" strokeWidth="1" strokeDasharray="2.5 2" />
        <path d="M40 84 C70 80 96 90 122 84 C134 81 142 86 150 84" fill="none" stroke="#7C8899" strokeWidth="4" strokeLinecap="round" />
        <path d="M120 85 q4 8 -2 12 M124 86 q6 6 4 12" fill="none" stroke="#6A7687" strokeWidth="3" strokeLinecap="round" />
        <rect x="56" y="78" width="6" height="17" rx="1.5" fill="#26365C" stroke="#16203A" strokeWidth=".8" />
        <rect x="90" y="78" width="6" height="17" rx="1.5" fill="#26365C" stroke="#16203A" strokeWidth=".8" />
        <rect x="140" y="78" width="6" height="17" rx="1.5" fill="#26365C" stroke="#16203A" strokeWidth=".8" />
        <circle cx="110" cy="86.5" r="4.6" fill="#C98D6B" stroke="#94603F" strokeWidth="1" />
        <circle cx="110" cy="86.5" r="2.4" fill="none" stroke="#E3B394" strokeWidth=".8" />
        <path d="M110 94 V142 Q110 154 98 158" fill="none" stroke="#3A4A73" strokeWidth="1.4" />
        <path d="M104 94 V140 Q104 148 96 152" fill="none" stroke="#3A4A73" strokeWidth="1" strokeDasharray="2.5 2" />
        <path d="M46 96 Q58 118 50 146" fill="none" stroke="#3A4A73" strokeWidth="1.5" />
        <path d="M50 96 Q61 118 54 146" fill="none" stroke="#3A4A73" strokeWidth=".9" strokeDasharray="2.5 2" />
        <path d="M158 96 Q146 118 154 146" fill="none" stroke="#3A4A73" strokeWidth="1.5" />
        <path d="M154 96 Q143 118 150 146" fill="none" stroke="#3A4A73" strokeWidth=".9" strokeDasharray="2.5 2" />
        <circle cx="49" cy="100" r="1.6" fill="#C98D6B" />
        <path d="M38 174 H164" stroke="#33446E" strokeWidth="1" strokeDasharray="2.5 2" />
        <path d="M70 120 l30 30 M120 110 l24 24 M60 150 l14 14" stroke="#2F3F66" strokeWidth="1" opacity=".5" />
        <path d="M40 92 H162 L163 106 Q100 100 39 112 Z" fill="#fff" opacity=".05" />
      </svg>
    );
  }

  if (pieza === 'base') {
    return (
      <svg viewBox="0 0 200 200" style={style} {...a11y}>
        <ellipse cx="104" cy="186" rx="80" ry="6" fill="#1C2E22" opacity=".16" />
        <polygon points="38.0,160.0 194.0,160.0 194.0,150.0 190.0,150.0 186.0,144.0 182.0,150.0 178.0,150.0 174.0,144.0 170.0,150.0 166.0,150.0 162.0,144.0 158.0,150.0 154.0,150.0 150.0,144.0 146.0,150.0 142.0,150.0 138.0,144.0 134.0,150.0 86.0,150.0 56.0,138.0 46.0,134.0 38.0,142.0" fill="#E4E7DF" stroke="#8E978A" strokeWidth="1.2" strokeLinejoin="round" />
        <polygon points="38.0,160.0 194.0,160.0 194.0,156.0 38.0,156.0" fill="#D3D8CD" />
        <circle cx="50.0" cy="136.0" r="9" fill="#E4E7DF" stroke="#8E978A" strokeWidth="1.2" />
        <polygon points="40.0,132.3 189.4,75.0 194.4,88.1 45.0,145.4" fill="#E4E7DF" stroke="#8E978A" strokeWidth="1.2" strokeLinejoin="round" />
        <polygon points="43.6,141.7 193.0,84.3 194.4,88.1 45.0,145.4" fill="#D3D8CD" />
        <polygon points="120.2,106.9 183.7,82.5 185.0,85.8 121.5,110.2" fill="#BAC0B3" />
        <polygon points="37.2,119.5 48.4,115.2 53.5,128.2 42.2,132.5" fill="#E4E7DF" stroke="#8E978A" strokeWidth="1.2" strokeLinejoin="round" />
        <line x1="115.4" y1="110.9" x2="162.0" y2="146.0" stroke="#8E978A" strokeWidth="11" strokeLinecap="round" />
        <line x1="115.4" y1="110.9" x2="162.0" y2="146.0" stroke="#D3D8CD" strokeWidth="8.6" strokeLinecap="round" />
        <circle cx="115.4" cy="110.9" r="8" fill="#E4E7DF" stroke="#8E978A" strokeWidth="1.2" />
        <circle cx="115.4" cy="110.9" r="3.2" fill="#BAC0B3" />
        <circle cx="162.0" cy="146.0" r="3" fill="#BAC0B3" stroke="#8E978A" strokeWidth="1" />
        <line x1="34.0" y1="152.0" x2="50.0" y2="136.0" stroke="#A9B0B8" strokeWidth="3.2" strokeLinecap="round" /><line x1="34.0" y1="151.2" x2="50.0" y2="135.2" stroke="#E4E8EC" strokeWidth="1" strokeLinecap="round" />
        <line x1="99.4" y1="126.9" x2="115.4" y2="110.9" stroke="#A9B0B8" strokeWidth="3.2" strokeLinecap="round" /><line x1="99.4" y1="126.1" x2="115.4" y2="110.1" stroke="#E4E8EC" strokeWidth="1" strokeLinecap="round" />
        <polygon points="22.0,176.0 178.0,176.0 178.0,166.0 174.0,166.0 170.0,160.0 166.0,166.0 162.0,166.0 158.0,160.0 154.0,166.0 150.0,166.0 146.0,160.0 142.0,166.0 138.0,166.0 134.0,160.0 130.0,166.0 126.0,166.0 122.0,160.0 118.0,166.0 70.0,166.0 40.0,154.0 30.0,150.0 22.0,158.0" fill="#F4F5F1" stroke="#9AA393" strokeWidth="1.2" strokeLinejoin="round" />
        <polygon points="22.0,176.0 178.0,176.0 178.0,172.0 22.0,172.0" fill="#E1E4DC" />
        <circle cx="34.0" cy="152.0" r="9" fill="#F4F5F1" stroke="#9AA393" strokeWidth="1.2" />
        <polygon points="24.0,148.3 173.4,91.0 178.4,104.1 29.0,161.4" fill="#F4F5F1" stroke="#9AA393" strokeWidth="1.2" strokeLinejoin="round" />
        <polygon points="27.6,157.7 177.0,100.3 178.4,104.1 29.0,161.4" fill="#E1E4DC" />
        <polygon points="104.2,122.9 167.7,98.5 169.0,101.8 105.5,126.2" fill="#C7CCC2" />
        <polygon points="21.2,135.5 32.4,131.2 37.5,144.2 26.2,148.5" fill="#F4F5F1" stroke="#9AA393" strokeWidth="1.2" strokeLinejoin="round" />
        <line x1="99.4" y1="126.9" x2="146.0" y2="162.0" stroke="#9AA393" strokeWidth="11" strokeLinecap="round" />
        <line x1="99.4" y1="126.9" x2="146.0" y2="162.0" stroke="#E1E4DC" strokeWidth="8.6" strokeLinecap="round" />
        <circle cx="99.4" cy="126.9" r="8" fill="#F4F5F1" stroke="#9AA393" strokeWidth="1.2" />
        <circle cx="99.4" cy="126.9" r="3.2" fill="#C7CCC2" />
        <circle cx="146.0" cy="162.0" r="3" fill="#C7CCC2" stroke="#9AA393" strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" style={style} {...a11y}>
      <ellipse cx="102" cy="188" rx="58" ry="6" fill="#1C2E22" opacity=".16" />
      <rect x="58" y="36" width="104" height="146" rx="4" fill="#E2DACA" />
      <rect x="55" y="33" width="104" height="146" rx="4" fill="#EAE3D4" />
      <rect x="52" y="30" width="104" height="146" rx="4" fill="#F4EFE3" stroke="#D9CFBA" strokeWidth="1" />
      <path d="M64 30 V176" stroke="#E5BDAE" strokeWidth="1" />
      <path d="M68 58 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 68 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 78 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 88 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 98 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 108 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 118 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 128 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 138 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 148 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 158 H146" stroke="#C5D3CF" strokeWidth="1" />
      <path d="M68 168 H146" stroke="#C5D3CF" strokeWidth="1" />
      <circle cx="74" cy="48" r="1.2" fill="#AFC0A4" />
      <circle cx="120" cy="62" r="0.9" fill="#C9BCA2" />
      <circle cx="96" cy="92" r="1.2" fill="#C9BCA2" />
      <circle cx="138" cy="104" r="0.9" fill="#AFC0A4" />
      <circle cx="82" cy="128" r="1.2" fill="#C9BCA2" />
      <circle cx="128" cy="146" r="0.9" fill="#C9BCA2" />
      <circle cx="104" cy="160" r="1.2" fill="#AFC0A4" />
      <circle cx="70" cy="168" r="0.9" fill="#C9BCA2" />
      <circle cx="142" cy="40" r="1.2" fill="#C9BCA2" />
      <circle cx="88" cy="70" r="0.9" fill="#AFC0A4" />
      <circle cx="112" cy="118" r="1.2" fill="#C9BCA2" />
      <circle cx="146" cy="170" r="0.9" fill="#C9BCA2" />
      <path d="M141 51 v-9 M141 44 c0-4 3-6 7-6 0 4-3 6-7 6z M141 46 c0-3-2-5-6-5 0 3 2 5 6 5z" fill="none" stroke="#6E8B4E" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="58" cy="42" r="2.1" fill="#D8CFBA" /><path d="M58 43 C51 45 44 41 47 37 C49 35 55 36 57 40" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="51" r="2.1" fill="#D8CFBA" /><path d="M58 52 C51 54 44 50 47 46 C49 44 55 45 57 49" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="60" r="2.1" fill="#D8CFBA" /><path d="M58 61 C51 63 44 59 47 55 C49 53 55 54 57 58" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="69" r="2.1" fill="#D8CFBA" /><path d="M58 70 C51 72 44 68 47 64 C49 62 55 63 57 67" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="78" r="2.1" fill="#D8CFBA" /><path d="M58 79 C51 81 44 77 47 73 C49 71 55 72 57 76" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="87" r="2.1" fill="#D8CFBA" /><path d="M58 88 C51 90 44 86 47 82 C49 80 55 81 57 85" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="96" r="2.1" fill="#D8CFBA" /><path d="M58 97 C51 99 44 95 47 91 C49 89 55 90 57 94" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="105" r="2.1" fill="#D8CFBA" /><path d="M58 106 C51 108 44 104 47 100 C49 98 55 99 57 103" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="114" r="2.1" fill="#D8CFBA" /><path d="M58 115 C51 117 44 113 47 109 C49 107 55 108 57 112" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="123" r="2.1" fill="#D8CFBA" /><path d="M58 124 C51 126 44 122 47 118 C49 116 55 117 57 121" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="132" r="2.1" fill="#D8CFBA" /><path d="M58 133 C51 135 44 131 47 127 C49 125 55 126 57 130" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="141" r="2.1" fill="#D8CFBA" /><path d="M58 142 C51 144 44 140 47 136 C49 134 55 135 57 139" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="150" r="2.1" fill="#D8CFBA" /><path d="M58 151 C51 153 44 149 47 145 C49 143 55 144 57 148" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="159" r="2.1" fill="#D8CFBA" /><path d="M58 160 C51 162 44 158 47 154 C49 152 55 153 57 157" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="58" cy="168" r="2.1" fill="#D8CFBA" /><path d="M58 169 C51 171 44 167 47 163 C49 161 55 162 57 166" fill="none" stroke="#3A4046" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

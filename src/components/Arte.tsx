export type Pieza = 'tote' | 'base' | 'libreta';

const etiquetas: Record<Pieza, string> = {
  tote: 'Tote bag patchwork hecha con retazos de mezclilla y algodón',
  base: 'Base para laptop de plástico reciclado, armada con encastres',
  libreta: 'Libreta de papel reciclado con pastas de cartón'
};

/** Ilustraciones vectoriales de cada pieza del kit */
export default function Arte({ pieza, decorativa = false }: { pieza: Pieza; decorativa?: boolean }) {
  const a11y = decorativa ? { 'aria-hidden': true as const } : { role: 'img', 'aria-label': etiquetas[pieza] };
  const style = { width: '100%', height: 'auto' };

  if (pieza === 'tote') {
    return (
      <svg viewBox="0 0 200 200" style={style} {...a11y}>
        <defs>
          <clipPath id="drToteClip"><rect x="40" y="66" width="120" height="114" rx="12" /></clipPath>
          <linearGradient id="drToteGloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".45" /><stop offset=".45" stopColor="#fff" stopOpacity="0" /></linearGradient>
        </defs>
        <ellipse cx="100" cy="188" rx="64" ry="7" fill="#0E3B2A" opacity=".18" />
        <path d="M70 72 C70 24 130 24 130 72" fill="none" stroke="#2B4A78" strokeWidth="9" strokeLinecap="round" />
        <path d="M70 72 C70 24 130 24 130 72" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeDasharray="3 4" />
        <g clipPath="url(#drToteClip)">
          <rect x="40" y="66" width="46" height="40" fill="#3D5F94" />
          <rect x="86" y="66" width="38" height="40" fill="#EADFC6" />
          <rect x="124" y="66" width="36" height="40" fill="#C9734A" />
          <rect x="40" y="106" width="30" height="38" fill="#9DBE8B" />
          <rect x="70" y="106" width="56" height="38" fill="#6E8FC2" />
          <rect x="126" y="106" width="34" height="38" fill="#E3B54C" />
          <rect x="40" y="144" width="52" height="36" fill="#F2E9D6" />
          <rect x="92" y="144" width="34" height="36" fill="#2F4F7F" />
          <rect x="126" y="144" width="34" height="36" fill="#A5C0DE" />
          <path d="M86 66v40M124 66v40M70 106v38M126 106v74M92 144v36M40 106h120M40 144h120" stroke="#fff" strokeOpacity=".85" strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
          <rect x="40" y="66" width="120" height="114" fill="url(#drToteGloss)" />
        </g>
        <rect x="88" y="152" width="24" height="14" rx="3" fill="#7A5232" />
        <path d="M100 163v-6M100 159c0-3 3-5 6-5 0 3-3 5-6 5zM100 160c0-2-2-4-5-4 0 2 2 4 5 4z" stroke="#F2E9D6" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }

  if (pieza === 'base') {
    return (
      <svg viewBox="0 0 200 200" style={style} {...a11y}>
        <defs>
          <linearGradient id="drBaseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9DDCC2" /><stop offset="1" stopColor="#4FA787" /></linearGradient>
          <linearGradient id="drScreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7FD3F0" /><stop offset="1" stopColor="#1E6F8E" /></linearGradient>
        </defs>
        <ellipse cx="100" cy="186" rx="70" ry="7" fill="#0E3B2A" opacity=".18" />
        <polygon points="34,178 168,178 160,96 40,160" fill="url(#drBaseFill)" stroke="#2F7D61" strokeWidth="1.5" />
        <g fill="#F4F8EE"><circle cx="60" cy="168" r="1.6" /><circle cx="84" cy="160" r="1.2" /><circle cx="120" cy="150" r="1.6" /><circle cx="142" cy="132" r="1.2" /><circle cx="150" cy="162" r="1.4" /><circle cx="104" cy="170" r="1.2" /></g>
        <g fill="#F0B44C"><circle cx="72" cy="172" r="1.3" /><circle cx="132" cy="160" r="1.4" /><circle cx="150" cy="118" r="1.1" /></g>
        <g fill="#3E78B8"><circle cx="96" cy="156" r="1.2" /><circle cx="118" cy="170" r="1.3" /><circle cx="146" cy="146" r="1.2" /></g>
        <ellipse cx="116" cy="150" rx="18" ry="10" fill="#3E8C70" opacity=".55" />
        <rect x="64" y="150" width="6" height="16" rx="2" fill="#2F7D61" />
        <rect x="146" y="112" width="6" height="16" rx="2" fill="#2F7D61" />
        <path d="M42 158 L158 98" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
        <path d="M50 150 L156 96" stroke="#C9D3DA" strokeWidth="8" strokeLinecap="round" />
        <path d="M50 150 L156 96" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
        <polygon points="150,98 158,94 176,24 168,22" fill="#33434E" />
        <polygon points="153,92 158,90 173,28 168,27" fill="url(#drScreen)" />
        <path d="M30 120 A70 70 0 0 1 44 96" fill="none" stroke="#0B6A86" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" style={style} {...a11y}>
      <defs>
        <linearGradient id="drKraft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D7B184" /><stop offset="1" stopColor="#B48858" /></linearGradient>
        <linearGradient id="drLibGloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".4" /><stop offset=".4" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="188" rx="58" ry="7" fill="#0E3B2A" opacity=".18" />
      <rect x="56" y="34" width="104" height="146" rx="7" fill="#E7DEC8" />
      <rect x="52" y="32" width="104" height="146" rx="7" fill="#F5EFE1" />
      <rect x="44" y="28" width="108" height="148" rx="9" fill="url(#drKraft)" />
      <path d="M70 48l10 2M98 60l8-1M120 44l6 3M76 150l9 1M118 160l7-2M132 120l6 2" stroke="#9C7346" strokeWidth="1" strokeLinecap="round" />
      <rect x="44" y="28" width="16" height="148" rx="6" fill="#7E6040" />
      <g fill="#E9DCC0"><circle cx="52" cy="44" r="1.6" /><circle cx="52" cy="66" r="1.6" /><circle cx="52" cy="88" r="1.6" /><circle cx="52" cy="110" r="1.6" /><circle cx="52" cy="132" r="1.6" /><circle cx="52" cy="154" r="1.6" /></g>
      <rect x="134" y="28" width="7" height="148" fill="#2E8B57" />
      <rect x="134" y="28" width="2" height="148" fill="#fff" opacity=".35" />
      <rect x="70" y="92" width="54" height="40" rx="5" fill="#F5EFE1" />
      <path d="M97 120v-14M97 108c0-5 4-8 9-8 0 5-4 8-9 8zM97 111c0-4-3-7-8-7 0 4 3 7 8 7zM97 120c-3 2-6 3-9 3M97 120c3 2 6 3 9 3" stroke="#2F3F1F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="44" y="28" width="108" height="148" rx="9" fill="url(#drLibGloss)" />
    </svg>
  );
}

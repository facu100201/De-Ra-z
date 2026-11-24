import { Fragment, type CSSProperties, type ReactNode } from 'react';

type Props = {
  /** Elementos que se repiten en la cinta */
  items: ReactNode[];
  /** Texto para lectores de pantalla (la cinta animada es decorativa) */
  label: string;
  /** Separador entre elementos */
  sep?: ReactNode;
  /** Segundos que tarda en recorrer media pista */
  duration?: number;
  /** Veces que se repite la lista en cada mitad. Con 4 cubre pantallas de más de 3000 px. */
  repeat?: number;
  style?: CSSProperties;
};

/**
 * Cinta en movimiento infinito. La pista tiene dos mitades idénticas y se
 * desplaza -50%, así el corte es invisible. Cada mitad repite la lista
 * varias veces para que nunca quede espacio vacío en pantallas anchas.
 */
export default function Marquee({ items, label, sep = '·', duration = 40, repeat = 4, style }: Props) {
  const mitad = (key: string) => (
    <div key={key} style={{ display: 'flex', flex: 'none', alignItems: 'center' }}>
      {Array.from({ length: repeat }).flatMap((_, r) =>
        items.map((it, i) => (
          <Fragment key={`${key}-${r}-${i}`}>
            <span style={{ flex: 'none' }}>{it}</span>
            <span aria-hidden="true" style={{ flex: 'none', padding: '0 0.7em', opacity: 0.55 }}>{sep}</span>
          </Fragment>
        ))
      )}
    </div>
  );

  return (
    <div style={{ borderTop: '1px solid rgba(28,46,34,.12)', borderBottom: '1px solid rgba(28,46,34,.12)', overflow: 'hidden', ...style }}>
      <p className="sr-only">{label}</p>
      <div className="mq" aria-hidden="true" style={{ display: 'flex', width: 'max-content', whiteSpace: 'nowrap', animationDuration: `${duration}s` }}>
        {mitad('a')}
        {mitad('b')}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Pagina } from '../components/Navegacion';

export default function NoEncontrada() {
  return (
    <Pagina>
      <section className="sec" style={{ maxWidth: 560, margin: '0 auto', paddingLeft: 20, paddingRight: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <p className="ey">Error 404</p>
        <h1 className="display">Esta página se fue a reciclar.</h1>
        <p className="lead">No encontramos lo que buscabas.</p>
        <Link className="btn" to="/">Volver al inicio</Link>
      </section>
    </Pagina>
  );
}

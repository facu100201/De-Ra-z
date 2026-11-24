import { Link } from 'react-router-dom';
import { Pagina } from '../components/Navegacion';

export default function NoEncontrada() {
  return (
    <Pagina>
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 20px 140px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <p className="ey">Error 404</p>
        <h1 className="display">Esta página se fue a reciclar.</h1>
        <p className="lead">No encontramos lo que buscabas.</p>
        <Link className="btn" to="/">Volver al inicio</Link>
      </section>
    </Pagina>
  );
}

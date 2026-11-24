import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Kit from './pages/Kit';
import Preventa from './pages/Preventa';
import Separa from './pages/Separa';
import Ciclo from './pages/Ciclo';
import Nosotros from './pages/Nosotros';

const NoEncontrada = lazy(() => import('./pages/NoEncontrada'));

const titulos: Record<string, string> = {
  '/': 'De Raíz · Kit universitario hecho con material rescatado',
  '/kit': 'El kit · De Raíz',
  '/preventa': 'Aparta tu kit · De Raíz',
  '/separa': 'Separa bien · De Raíz',
  '/ciclo': 'Cierra el ciclo · De Raíz',
  '/nosotros': 'Nosotros · De Raíz'
};

function ScrollAlCambiar() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = titulos[pathname] ?? 'De Raíz';
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollAlCambiar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/kit" element={<Kit />} />
        <Route path="/preventa" element={<Preventa />} />
        <Route path="/separa" element={<Separa />} />
        <Route path="/ciclo" element={<Ciclo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="*" element={<Suspense fallback={null}><NoEncontrada /></Suspense>} />
      </Routes>
    </>
  );
}

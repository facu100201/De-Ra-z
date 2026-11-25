# De Raíz

Sitio público de **De Raíz**: un kit universitario hecho con material rescatado: una tote de pantalón y playera reutilizados, una base para laptop impresa en 3D con filamento de botellas de PET recicladas y una libreta de hojas recicladas engargoladas.

**En vivo:** https://facu100201.github.io/De-Ra-z/

## Qué incluye

- **Una sola app responsiva**, mobile first. Debajo de 960 px hay un dock de navegación abajo y desde 960 px una barra de vidrio fija arriba.
- **Inicio** con un hero que se expande al hacer scroll (adaptado de Scroll Expand de React Bits, MIT + Commons Clause).
- **El kit**: las tres piezas con material, qué residuo evitan y qué pasa con ellas al final.
- **Separa bien**: juego tipo tetris. Caen 12 residuos cada vez más rápido y los llevas a su bote (orgánico, reciclable o no reciclable, según la NADF-024 de la CDMX) con flechas, deslizando o con el control en pantalla. Al final da tu puntaje, tu récord y repasa los que fallaste.
- **Cierra el ciclo** y **Nosotros**, con las políticas de compra y el aviso de privacidad.

## Stack

React 19, TypeScript, Vite 6 y React Router 7. Es un sitio 100 % estático: no tiene backend ni guarda datos.

```
src/
  components/   Navegacion (barra, dock, pie), Arte, Marquee, ScrollExpand
  components/juego/  JuegoSepara (bucle con requestAnimationFrame), dibujos de residuos y botes
  pages/        Inicio, Kit, Separa, Ciclo, Nosotros
```

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173/De-Ra-z/
npm run build      # genera dist/ (incluye 404.html para las rutas en Pages)
```

## Publicación

Cada push a `main` corre `.github/workflows/pages.yml`: compila el sitio y lo publica en la rama `gh-pages`, que es la fuente de Pages.

Variable opcional del repo, en **Settings → Secrets and variables → Actions → Variables**:

| Variable | Ejemplo |
| --- | --- |
| `VITE_CONTACTO` | `hola@deraiz.mx` |

## Paleta

| Token | Color | Uso |
| --- | --- | --- |
| Pistache | `#EEF2E3` | Fondo |
| Papel | `#F8F9F2` | Superficies, barra |
| Salvia | `#D5E3BE` | Tintes y estados activos |
| Hoja | `#2F6B3A` | Acción principal, links |
| Musgo | `#1C2E22` | Texto |
| Kraft | `#B98B57` | Acento cálido |
| Ámbar | `#A4561A` | Detalle puntual |

## Licencia

© De Raíz. Todos los derechos reservados.

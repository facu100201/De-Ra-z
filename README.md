# De Raíz

Sitio público de **De Raíz**: un kit universitario (tote patchwork, base para laptop y libreta) hecho con retazos, cartón, papel y plástico rescatados.

**En vivo:** https://facu100201.github.io/De-Ra-z/  
**API de preventa:** https://de-raiz-beta.vercel.app/api/preventa

## Qué incluye

- **Una sola app responsiva**, mobile first. Debajo de 960 px hay un dock de navegación abajo y desde 960 px una barra de vidrio fija arriba.
- **Inicio** con un hero que se expande al hacer scroll (adaptado de Scroll Expand de React Bits, MIT + Commons Clause).
- **El kit**: las tres piezas con material, qué residuo evitan y qué pasa con ellas al final.
- **Preventa**: pide solo el correo institucional y manda un correo de confirmación personalizado.
- **Separa bien**: mini juego para aprender a separar residuos según la NADF-024 de la CDMX.
- **Cierra el ciclo** y **Nosotros**, con las políticas de compra y el aviso de privacidad.

## Stack

React 19, TypeScript, Vite 6 y React Router 7. El envío de correo usa una función serverless (`api/preventa.ts`) con [Resend](https://resend.com). El registro en Postgres (Neon) es opcional.

```
src/
  components/   Navegacion (barra, dock, pie), Arte, Marquee, ScrollExpand
  lib/          institucional.ts (validación de correo)
  pages/        Inicio, Kit, Preventa, Separa, Ciclo, Nosotros
api/
  preventa.ts   POST { email } → valida, registra y manda el correo
  _lib/correo.ts plantilla HTML y texto del correo
db/schema.sql   tabla opcional de registros
```

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173/De-Ra-z/
npm run build      # genera dist/ (incluye 404.html para las rutas en Pages)
```

## Publicación

### Frontend → GitHub Pages

Cada push a `main` corre `.github/workflows/pages.yml`: compila el sitio y lo publica en la rama `gh-pages`, que es la fuente de Pages.

Variables opcionales del repo, en **Settings → Secrets and variables → Actions → Variables**:

| Variable | Ejemplo |
| --- | --- |
| `VITE_PREVENTA_API` | `https://de-raiz-beta.vercel.app/api/preventa` |
| `VITE_CONTACTO` | `hola@deraiz.mx` |

### API de correo → Vercel (plan gratis)

GitHub Pages solo sirve archivos estáticos, así que el envío de correo vive en el proyecto `de-raiz` de Vercel, ligado a este repo. Se despliega solo con cada push a `main`. Ya tiene configuradas `SITE_URL`, `ALLOWED_ORIGINS` y `VITE_BASE`.

Para que mande correos falta:

1. Crear una cuenta en Resend y verificar tu dominio, para mandar desde `hola@tudominio`. `onboarding@resend.dev` solo sirve para pruebas a tu propio correo.
2. En Vercel → `de-raiz` → Settings → Environment Variables, agregar `RESEND_API_KEY` y `FROM_EMAIL` (p. ej. `De Raíz <hola@tudominio>`), y opcionalmente `REPLY_TO` y `NOTIFY_TO`. Después, Redeploy.
3. Opcional: conectar Neon desde el Marketplace de Vercel (agrega `DATABASE_URL`) y correr `db/schema.sql`. Con eso se guardan los registros y nadie recibe el correo dos veces.

El correo valida que el dominio sea institucional (`.edu`, `.edu.mx`, `unam.mx`, `ipn.mx`, `uam.mx`, `tec.mx`, `ibero.mx` y otros). Si el correo trae un nombre (`valeria.ruiz@…`), saluda por nombre y menciona la universidad.

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

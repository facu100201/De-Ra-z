/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL completa del endpoint de preventa, p. ej. https://de-raiz-beta.vercel.app/api/preventa */
  readonly VITE_PREVENTA_API?: string;
  /** Correo de contacto público */
  readonly VITE_CONTACTO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Correo de contacto público */
  readonly VITE_CONTACTO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

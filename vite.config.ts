import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages el sitio vive en /De-Ra-z/. Para Vercel o dominio propio usa VITE_BASE=/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/De-Ra-z/',
  plugins: [react()]
});

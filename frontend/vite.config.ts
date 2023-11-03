import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    Unfonts({
      google: {
        preconnect: true,
        display: 'block',
        text: undefined,
        injectTo: 'head-prepend',

        // Google Fonts to Import
        families: [
          {
            name: 'Gabarito',
            styles: 'wght@200;400;700',
            defer: true,
          },
          {
            name: 'Orbitron',
            styles: 'wght@900',
            defer: true,
          },
        ],
      },
    }),
  ],
});

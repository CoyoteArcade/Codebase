import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        preconnect: false,
        display: 'block',
        text: undefined,
        injectTo: 'head-prepend',

        // Google Fonts to Import
        families: [
          'Gajraj One',
          {
            name: 'Gabarito',
            styles: 'wght@200;400;500;600;700',
            defer: true,
          },
        ],
      },
    }),
  ],
});

/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  cacheDir: './node_modules/.vite/site',

  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000/',
      '/media': 'http://127.0.0.1:8000/',
      '/auth': 'http://127.0.0.1:8000/',
      '/auth-base': 'http://127.0.0.1:8000/',
    },
    port: 7600,
    host: 'localhost',
  },

  preview: {
    proxy: {
      '/api': 'http://127.0.0.1:8000/',
      '/media': 'http://127.0.0.1:8000/',
      '/auth': 'http://127.0.0.1:8000/',
    },
    port: 1240,
    host: 'localhost',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: './',
    }),
    svgr({
      svgrOptions(
        {
          // svgr options
        }
      ): any {},
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: './',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});

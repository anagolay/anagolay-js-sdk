import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $src: resolve('./src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    // warn on chunks above 1MB
    chunkSizeWarningLimit: 1024,
    rollupOptions: {},
  },
};

export default config;

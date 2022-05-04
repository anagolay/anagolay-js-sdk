import adapter from '@sveltejs/adapter-static';
import path from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  methodOverride: {
    allowed: ['PATCH', 'DELETE'],
  },
  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },
    vite: {
      resolve: {
        alias: {
          $src: path.resolve('./src'),
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          target: 'es2020',
        },
      },
    },
  },
};

export default config;

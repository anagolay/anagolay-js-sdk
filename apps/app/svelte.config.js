import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

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
          $lib: path.resolve('./src/lib'),
          $src: path.resolve('./src'),
        },
      },
    },
  },
};

export default config;

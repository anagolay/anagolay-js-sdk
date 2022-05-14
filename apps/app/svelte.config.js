// import adapter from '@sveltejs/adapter-static';
import path from 'path';
import preprocess from 'svelte-preprocess';
import adapter_ipfs from 'sveltejs-adapter-ipfs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  kit: {
    // adapter: adapter(),
    adapter: adapter_ipfs({}),
    trailingSlash: 'always',
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

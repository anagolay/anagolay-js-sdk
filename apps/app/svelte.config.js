import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
// import adapter_ipfs from 'sveltejs-adapter-ipfs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    // adapter: adapter_ipfs({}),
    trailingSlash: 'always',
    prerender: {
      default: true,
    },
  },
};

export default config;

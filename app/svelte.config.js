import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
// import adapter_ipfs from 'sveltejs-adapter-ipfs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    preserve: ['ld+json']
  }),
  kit: {
    adapter: adapter({
      // fallback: '200.html', // this is for the surge.sh
      fallback: 'index.html',
      precompress: true
    }),
    prerender: {
      concurrency: 10
    }
  }
};

export default config;
// export AN_IPFS_API_URL="https://2214-anagolay-microservices-1s38l5204zr.ws-us62.gitpod.io/api/v0"

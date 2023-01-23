// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { resolve } from 'path';
// import rollupNodePolyFills from 'rollup-plugin-node-polyfills';
import { type UserConfig, defineConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

// import testPlugin from './plugins/test-plugin';

const config: UserConfig = {
  logLevel: 'info',
  plugins: [
    isoImport(),
    wasm(),
    topLevelAwait(),
    sveltekit(),
    SvelteKitPWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],

      manifest: {
        name: 'Anagolay App',
        short_name: 'anagolay.js',
        description: 'Explorer app for all who want to interact with Anagolay Network',
        theme_color: '#ffffff'
      },
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true
      }
    })
  ],
  resolve: {
    alias: {
      $src: resolve('./src')
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    // warn on chunks above 1MB
    chunkSizeWarningLimit: 1024,
    minify: false,
    rollupOptions: {}
  },
  server: {
    fs: {
      allow: [resolve('../../../src')],
      strict: false
    },
    // configure vite for HMR with Gitpod
    hmr: process.env.GITPOD_WORKSPACE_URL
      ? {
          // removes the protocol and replaces it with the port we're connecting to
          host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '7766-'),
          protocol: 'wss',
          clientPort: 443
        }
      : true
  }
  // // this is only for prod build
  // ssr: {
  //   noExternal: true,
  // },
};

export default defineConfig(({ mode }) => {
  const conf = config;
  // const { command, mode, ssrBuild } = opts;
  // if (command === 'serve') {
  // 	return {
  // 		// dev specific config
  // 	};
  // } else {
  // 	// command === 'build'
  // 	// return {
  // 	//   // build specific config
  // 	// }
  // }

  if (mode === 'production') {
    conf.logLevel = 'error';
    conf.build.minify = true;
  }
  return conf;
});

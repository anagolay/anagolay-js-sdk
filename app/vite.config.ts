// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
// import rollupNodePolyFills from 'rollup-plugin-node-polyfills';
import { UserConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

import testPlugin from './plugins/test-plugin';

const config: UserConfig = {
  logLevel: 'info',
  plugins: [testPlugin(), isoImport(), sveltekit(), wasm(), topLevelAwait()],
  resolve: {
    alias: {
      $src: resolve('./src')

      // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
      // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
      // process and buffer are excluded because already managed
      // by node-globals-polyfill
      // buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      // process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      // dns: 'rollup-plugin-node-polyfills/polyfills/dns',
      // util: 'rollup-plugin-node-polyfills/polyfills/util',
      // sys: 'util',
      // events: 'events',
      // stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      // path: 'rollup-plugin-node-polyfills/polyfills/path',
      // querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      // punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      // url: 'rollup-plugin-node-polyfills/polyfills/url',
      // string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
      // http: 'rollup-plugin-node-polyfills/polyfills/http',
      // https: 'rollup-plugin-node-polyfills/polyfills/http',
      // os: 'rollup-plugin-node-polyfills/polyfills/os',
      // assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      // constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      // _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      // _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      // _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      // _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
      // _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
      // timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      // console: 'rollup-plugin-node-polyfills/polyfills/console',
      // vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      // tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      // domain: 'rollup-plugin-node-polyfills/polyfills/domain',
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   process: true,
        //   buffer: true,
        // }),
        // NodeModulesPolyfillPlugin(),
      ]
    }
    // exclude: ['pino'],
  },
  build: {
    // warn on chunks above 1MB
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        // rollupNodePolyFills(),
      ]
    }
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

export default config;

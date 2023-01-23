import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { type UserConfigExport, defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { isoImport } from 'vite-plugin-iso-import';
import wasm from 'vite-plugin-wasm';

import { processEnv } from './svelte.config.js';

const currentYear = new Date().getUTCFullYear();

const copyrightSnippet = `/**
* anagolay.{js} Web Wallet
* Copyright (C) {$currentYear} Anagolay Network <https://anagolay.network>
* 
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

`.replace('{$currentYear}', currentYear.toString());

const config: UserConfigExport = {
  logLevel: 'info',
  // plugins: [banner(copyrightSnippet), svelte(), crx({ manifest })],
  plugins: [isoImport(), banner(copyrightSnippet), wasm(), sveltekit()],
  // css: {
  //   postcss: {
  //     plugins: [tailwind(tailwindConfig), autoprefixer]
  //   }
  // },
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
    minify: false,
    rollupOptions: {
      // input: {
      //   // page we are injecting
      //   anagolayInjectedPage: './src/extensionFiles/anagolayInjectedPage.ts',
      //   // our main content page that communicates between the injected Page and serviceWorker
      //   contentScript: './src/extensionFiles/contentScript.ts',
      //   // background script, doesn't have DOM access
      //   serviceWorker: './src/extensionFiles/serviceWorker.ts',
      //   // our app main entry point, this is THE ONLY ONE directly required
      //   main: './src/main.ts'
      // },
      // output: {
      //   entryFileNames: '[name].js',
      //   sourcemap: !isProduction,
      //   manualChunks: (id, meta) => {
      //     if (id.includes('contentScript')) {
      //       console.log('Manual chunk for', id);
      //       return 'content';
      //     }
      //   },
      //   exports: 'auto',
      //   assetFileNames: (assetInfo) => {
      //     /**
      //      *
      //      * this is needed to generate the name like
      //      * `/main.css` instead of `/assets/main-e3c4c24b.css`
      //      *
      //      */
      //     return assetInfo.name;
      //   }
      // }
    }
  },
  server: {
    fs: {
      allow: [resolve('../../../src')],
      strict: false
    }
  },
  define: {
    'process.env': processEnv
  },
  // experimental: {
  //   hmrPartialAccept: true
  // },
  test: {
    globals: true
  }
};
export default defineConfig(({ command, mode }) => {
  const conf = config;

  console.log('vite is running in production mode: %s', mode);
  console.log('vite command ', command);

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

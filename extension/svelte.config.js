import adapter from '@kelp_digital/sveltekit-adapter-chrome-extension';
import { blake2AsHex } from '@polkadot/util-crypto';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import preprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const manifestPath = join(__dirname, 'src/manifests/chrome.json');

const packagePath = join(__dirname, 'package.json');

const { version } = JSON.parse(readFileSync(packagePath).toString());

const appName = 'anagolay_js';

const NODE_ENV = process.env.NODE_ENV || 'prod';

export const processEnv = {
  EXTENSION_PREFIX: appName,
  PORT_PREFIX: JSON.stringify(blake2AsHex(JSON.stringify(version), 64)),
  EXTENSION_VERSION: version,
  NODE_ENV
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    preserve: ['ld+json'],
    postcss: true
    // includePaths: [join(__dirname, './package.json')]
  }),
  kit: {
    adapter: adapter({
      manifest: manifestPath,
      baseDirectory: process.cwd(), // very important, we cannot know this in the build time
      precompress: false,
      // fallback: true,
      outDirectory: 'dist',
      esbuildOptions: {
        minify: false,
        treeShaking: true,
        define: {
          'process.env': JSON.stringify(processEnv)
        }
      }
    }),
    version: {},

    appDir: 'app',
    prerender: {
      concurrency: 10,
      crawl: true
    },
    alias: {
      $src: 'src'
    },
    files: {
      //// for faster UI development enable this and then use the pnpm dev
      // routes: 'src/routes-dev'
    }
  }
};

export default config;

import * as Sentry from '@sentry/svelte';
import { BrowserTracing } from '@sentry/tracing';

import { dev } from '$app/environment';
import pkgJson from '$src/../package.json' assert { type: 'json' };

import { appDebug } from './appStore';

if (!dev) {
  appDebug('Sentry is enabled');
  Sentry.init({
    dsn: 'https://12d65b4bdf5b46b8aad5d32efc88101c@sentry.anagolay.network/19',
    integrations: [new BrowserTracing()],
    enabled: true,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    environment: dev ? 'development' : 'production',
    release: pkgJson.version
  });
}

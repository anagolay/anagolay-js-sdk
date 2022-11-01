import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

import { dev } from '$app/environment';

if (!dev) {
	Sentry.init({
		dsn: 'https://12d65b4bdf5b46b8aad5d32efc88101c@sentry.anagolay.network/19',
		integrations: [new BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
		environment: dev ? 'development' : 'production'
	});
}

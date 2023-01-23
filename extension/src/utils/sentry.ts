/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/svelte';
import { BrowserTracing } from '@sentry/tracing';
const EXTENSION_VERSION = process.env.EXTENSION_VERSION;

/**
 * initialize sentry
 * @param options
 */
export function initSentry(options: Sentry.BrowserOptions = {}) {
  Sentry.init({
    dsn: 'https://857a00bdea104f13a28518f5eb0f458d@sentry.anagolay.network/21',
    integrations: [new BrowserTracing() as any],
    release: EXTENSION_VERSION,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    ...options
  });
}

export function getSentry() {
  return Sentry;
}

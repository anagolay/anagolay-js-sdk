import type { AnVerificationContext } from '@anagolay/types';
import URI from 'urijs';

/**
 * Make all possible verification contexts based on the url.
 *
 * This method is the core of the building the CTX and i should understand different domains, services etc ...
 *
 * It's a good candidate to end up in the API sdk, for now it's here.
 *
 * Note: Only `UrlForDomain` verification context is implemented
 *
 *
 * @param url URL instance
 * @returns
 */
export function makeVerificationContexts(url: URL): AnVerificationContext[] {
  // const uri = new URI(url.toString());
  const { protocol } = url;

  const hostName = getTopLevelHostname(url);
  const domainContext: AnVerificationContext = {
    UrlForDomain: [`${protocol}//${hostName}`, hostName]
  };
  const ctxs = [domainContext];
  // console.log('makeVerificationContexts', ctxs);
  return ctxs;
}

/**
 * Return the top level domain name even if it has multiple subdomains
 *
 *  Example:
 *
 *  `getTopLevelHostname('https://macula.macula.link')` => `macula.link`
 * @param url URL instance
 * @returns
 */
export function getTopLevelHostname(url: URL): string {
  const uri = new URI(url.toString());
  return uri.domain();
}

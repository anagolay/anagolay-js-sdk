import { filter, isEmpty, split, startsWith } from 'ramda';

import { alerts } from '$src/components/notifications/stores';
/**
 * Parse the hash string and return the the value for the given name
 * @param fullHash - The value of `$page.url.hash`
 * @param hashName - Name of the hash which comes in `nam=value` format
 * @returns decoded value via `decodeURIComponent`
 */
export function getHashValue(fullHash: string, hashName: string, defaultValue = ''): string {
  console.log('getHashValue', { hashName, fullHash });
  if (isEmpty(fullHash)) return '';

  const parts = split('&')(fullHash.substring(1));

  const foundValue = filter((p) => startsWith(hashName, p), parts);

  if (isEmpty(foundValue)) {
    if (isEmpty(defaultValue)) {
      const message = `${hashName} hash name cannot be found and default value is not provided`;
      alerts.add(message, 'error', false);
      console.error(message);
      return '';
    } else {
      return defaultValue;
    }
  } else {
    const foundParts = split('=')(foundValue[0]);
    return decodeURIComponent(foundParts[1]);
  }
}

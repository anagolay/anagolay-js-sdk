import { filter, isEmpty, split, startsWith } from 'ramda';

import { notifications } from '$src/components/notifications/stores';
/**
 * Parse the hash string and return the the value for the given name
 * @param fullHash - The value of `$page.url.hash`
 * @param hashName - Name of the hash which comes in `name=value` format
 * @param defaultValue - If passed it will be used if not defaults to '' and will fail
 * @returns decoded value via `decodeURIComponent` or default value
 */
export function getHashValue(fullHash: string, hashName: string, defaultValue = ''): string {
	// console.debug('getHashValue', { hashName, fullHash });

	if (isEmpty(fullHash)) return defaultValue;

	// remove the `#` from the string
	const parts = split('&')(fullHash.substring(1));

	const foundValue = filter((p) => startsWith(hashName, p), parts);

	if (isEmpty(foundValue)) {
		if (isEmpty(defaultValue)) {
			const message = `${hashName} hash name cannot be found and default value is not provided`;
			notifications.addNew({
				text: message,
				infoLevel: 'error',
				autoclose: {
					close: false
				}
			});
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

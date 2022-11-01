/**
 * Remove the idem from the array using the `Array.filter` function.
 *
 * @remarks Pure function
 *
 * @param array
 * @param itemToRemove
 * @returns New array without the item
 *
 * Example:
 * ```js
 * removeFromArray([1,2,3,4], 3)
 * // [1,2,4]
 * ```
 */
export function removeItemFromArray<T>(array: T[], itemToRemove: T): T[] {
	const newArray = array.filter((element) => {
		return element !== itemToRemove;
	});
	return newArray;
}

export function isChrome(): boolean {
	return navigator.userAgent.includes('Chrome/');
}

export function isFirefox(): boolean {
	return navigator.userAgent.includes('Firefox/');
}

/**
 * Divide by 1000 to get the seconds. Utility function.
 * @param milliseconds -
 * @returns
 */
export function msToSec(milliseconds: number): number {
	return milliseconds / 1000;
}

export function isValidUrl(url: string): boolean {
	return (
		// some random length... we probably want to parse via some lib
		url.length >= 7 &&
		// check that it starts with a valid ws identifier
		(url.startsWith('ws://') || url.startsWith('wss://') || url.startsWith('light://'))
	);
}

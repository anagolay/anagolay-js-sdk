import { length, startsWith, takeLast } from 'ramda';

/**
 * Take a 0x prefixed string or not and return the actual value.
 * @remarks
 * Uses the ramda.js
 * @returns Decoded hex string output.
 * @public
 */
export function hexToString(hexString: string): string {
  let noPrefix: string = hexString;
  if (startsWith('0x', hexString)) {
    noPrefix = takeLast(length(hexString) - 2, hexString);
  }

  return Buffer.from(noPrefix, 'hex').toString();
}

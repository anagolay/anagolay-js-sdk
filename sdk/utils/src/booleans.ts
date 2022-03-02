/**
 * checks against the common value options for the true boolean value
 * @param value Can be `'true' | '1' | 1`
 * @returns Boolean
 * @public
 */
export function isTrue(value: string | number): boolean {
  return value === 'true' || value === '1' || value === 1 ? true : false;
}
/**
 * checks against the common value options for the false boolean value
 * @param value Can be `'false' | '0' | 0`
 * @returns Boolean
 * @public
 */
export function isFalse(value: string | number): boolean {
  return value === 'false' || value === '0' || value === 0 ? false : true;
}

import { equals } from 'ramda';

/**
 * if NODE_ENV === development
 * @returns
 */
export function isDev() {
  return equals('development', process.env.NODE_ENV);
}

/**
 * @module @anagolay/api
 */

export * from './connection';
export * from './utils';
import * as pallets from './pallets';
export * from './pallets/operations/interfaces';

// this is NOT smart
export * from '@polkadot/api';

export { pallets };

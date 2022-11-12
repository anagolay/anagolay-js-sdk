/**
 * @module @anagolay/api
 */

export * from './connection';
export * from './pallets/interfaces';
export * from './utils';
import * as pallets from './pallets';

// this is NOT smart
// export * from '@polkadot/api';

export { pallets };

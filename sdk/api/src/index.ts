/**
 * @module @anagolay/api
 */
import '@anagolay/types/augment-api';

export * from './connection';
export * from './utils/index';
import * as pallets from './pallets/index';

// this is NOT smart
export * from '@polkadot/api';

export { pallets };

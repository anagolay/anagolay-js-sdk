import { AnGenericId } from '@anagolay/types';
import { stringToHex } from '@polkadot/util';
import { startsWith } from 'ramda';

/**
 * We can be sure that we always get the encoded GenericId for the network
 * @param d -
 */
export function encodeTheGenericId(d: AnGenericId): AnGenericId {
  return startsWith('0x', d) ? d : stringToHex(d);
}

import { stringToHex } from '@polkadot/util'
import { SnGenericId } from '@sensio/types'
import { startsWith } from 'ramda'

/**
 * We can be sure that we always get the encoded GenericId for the network
 * @param d
 */
export function encodeTheGenericId(d: SnGenericId): SnGenericId {
  return startsWith('0x', d) ? d : stringToHex(d)
}

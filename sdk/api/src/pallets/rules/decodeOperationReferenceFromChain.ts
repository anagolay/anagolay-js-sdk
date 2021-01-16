import decodeHexToString from '@sensio/api/utils/decodeHexToString'
import { OperationReference, SnOperationReference } from '@sensio/types'
import { map } from 'ramda'

/**
 * Decode the OperationReference from the chain
 * @param d Operation Reference decoded
 */
export default function decodeOperationReferenceFromChain(
  d: OperationReference,
): SnOperationReference {
  return {
    id: decodeHexToString(d.id),
    children: map(decodeOperationReferenceFromChain, d.children),
  }
}

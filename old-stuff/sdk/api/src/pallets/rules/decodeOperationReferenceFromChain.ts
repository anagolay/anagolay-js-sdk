import { map } from 'ramda';

import decodeHexToString from '@anagolay/api/utils/decodeHexToString';
import { AnOperationReference, OperationReference } from '@anagolay/types';

/**
 * Decode the OperationReference from the chain
 * @param d Operation Reference decoded
 */
export default function decodeOperationReferenceFromChain(d: OperationReference): AnOperationReference {
  return {
    id: decodeHexToString(d.id),
    children: map(decodeOperationReferenceFromChain, d.children),
  };
}

import { map } from 'ramda'

import decodeHexToString from '@anagolay/api/utils/decodeHexToString'
import { AnRule, Rule } from '@anagolay/types'

import decodeOperationReferenceFromChain from './decodeOperationReferenceFromChain'

/**
 * Decodes the rule from the chain to readable object
 * @param d Rule from the Network, SCALE codec encoded
 */
export function decodeFromChain(d: Rule): AnRule {
  const { data } = d
  const decoded: AnRule = {
    id: decodeHexToString(d.id),
    data: {
      version: data.version.toNumber(),
      name: decodeHexToString(data.name),
      desc: decodeHexToString(data.desc),
      creator: decodeHexToString(data.creator),
      groups: data.groups.map((g) => g.toNumber()),
      parentId: decodeHexToString(data.parentId),
      ops: map(decodeOperationReferenceFromChain, data.ops),
    },
  }

  return decoded
}

export default decodeFromChain

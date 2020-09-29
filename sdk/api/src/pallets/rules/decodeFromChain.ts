import decodeHexToString from '@sensio/api/utils/decodeHexToString'
import { Rule, SnRule } from '@sensio/types'
import { map } from 'ramda'
import decodeOperationFromChain from '../operations/decodeFromChain'

/**
 * Decodes the rule from the chain to readable object
 * @param d Rule from the Network, SCALE codec encoded
 */
export function decodeFromChain(d: Rule): SnRule {
  const { data } = d
  const decoded: SnRule = {
    id: decodeHexToString(d.id),
    data: {
      version: data.version.toNumber(),
      name: decodeHexToString(data.name),
      desc: decodeHexToString(data.desc),
      creator: decodeHexToString(data.creator),
      groups: data.groups.map((g) => g.toNumber()),
      parentId: decodeHexToString(data.parentId),
      ops: map(decodeOperationFromChain, data.ops),
    },
  }
  return decoded
}

export default decodeFromChain

import decodeHexToString from '@sensio/api/utils/decodeHexToString'
import { Proof, SnProof } from '@sensio/types'

/**
 * Decodes the Proof-of-Existence from the chain to readable object
 * @param d PoE from the Network
 */
export function decodeFromChain(d: Proof): SnProof {
  const { data } = d
  const decoded: SnProof = {
    id: decodeHexToString(d.id),
    data: {
      ruleId: decodeHexToString(data.ruleId),
      prevId: decodeHexToString(data.prevId),
      creator: decodeHexToString(data.creator),
      groups: data.groups.map((g) => g.toNumber()),
      params: data.params.map((g) => ({
        k: decodeHexToString(g.k),
        v: decodeHexToString(g.v),
      })),
    },
  }
  return decoded
}

export default decodeFromChain

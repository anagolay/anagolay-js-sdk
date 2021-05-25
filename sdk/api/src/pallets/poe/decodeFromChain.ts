import decodeHexToString from '@anagolay/api/utils/decodeHexToString'
import { AnProof, Proof } from '@anagolay/types'

/**
 * Decodes the Proof-of-Existence from the chain to readable object
 * @param d PoE from the Network
 */
export function decodeFromChain(d: Proof): AnProof {
  const { data } = d
  const decoded: AnProof = {
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

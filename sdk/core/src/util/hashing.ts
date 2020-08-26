import { SnOperationData } from '@sensio/types'
import CID from 'cids'
import mh from 'multihashing-async'

/**
 * Calculates Multihash for current defaults
 * @param data
 * @param algo
 * @param length
 */
export async function calculateHash (
  data: Uint8Array,
  algo = 'blake2b',
  length = 256
): Promise<Buffer> {
  const hash = await mh(data, `${algo}-${length}`)
  return hash
}

export function createCID (data: Buffer, codec = 'dag-cbor'): CID {
  return new CID(1, codec, data)
}

/**
 * Calculate the content identifier for the given operation data
 * @param op OperationData
 */
export async function calculateOperationId (
  op: SnOperationData
): Promise<string> {
  return createCID(
    await calculateHash(Buffer.from(JSON.stringify(op)))
  ).toString()
}

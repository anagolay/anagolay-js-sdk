import CID from 'cids'
import mh from 'multihashing-async'

import { AnOperationData } from '@anagolay/types'

/**
 * Calculates Multihash for current defaults
 * @param data
 * @param algo
 * @param length
 */
export async function calculateHash(data: Uint8Array): Promise<Uint8Array> {
  const hash = await mh(data, 'blake2b-512')

  return hash
}

/**
 * Create Content address ID based ont the network defaults
 * @param data
 * @param codec
 */
export function createCID(data: Uint8Array, codec = 'dag-pb'): CID {
  return new CID(1, codec, data)
}

/**
 * Calculate the content identifier for the given operation data
 * @param op OperationData
 */
export async function calculateOperationId(op: AnOperationData): Promise<string> {
  return createCID(await calculateHash(Buffer.from(JSON.stringify(op)))).toString()
}

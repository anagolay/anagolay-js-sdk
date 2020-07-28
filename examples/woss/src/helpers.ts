import CID from 'cids'
import mh from 'multihashing-async'

export async function calculateHash (
  data: Uint8Array,
  algo = 'blake2b',
  length = 256
): Promise<Buffer> {
  const hash = await mh(data, `${algo}-${length}`)
  return hash
}

export function createCID (data: Buffer, codec = 'raw'): CID {
  return new CID(1, codec, data)
}

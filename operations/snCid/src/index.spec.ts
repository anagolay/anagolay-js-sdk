import { stringToU8a } from '@polkadot/util'
import CID from 'cids'
import snCid from '.'

describe('Operation: snCid', (): void => {
  it('is defined', (): void => {
    expect(snCid).toBeDefined()
  })
  it('should be correct CID', async (): Promise<void> => {
    const data = 'demo'
    const cid = await snCid({ data: stringToU8a(data) })

    // lets generate the same CID based on the buffer so we can test teh correct values
    const { codec, version, multibaseName } = new CID(cid.decode())
    expect(codec).toEqual('dag-cbor')
    expect(version).toEqual(1)
    expect(multibaseName).toEqual('base32')
  })
  it('should be correct multihash', async (): Promise<void> => {
    const data = 'demo'
    const cid = await snCid({ data: stringToU8a(data) })

    const t = new CID(cid.decode())
    // for now bafy is one what we need
    const isBafy = t.toString().startsWith('bafy')
    expect(isBafy).toEqual(true)
  })
})

import { stringToU8a, u8aToU8a } from '@polkadot/util'
import snMultihash from '@sensio/op-sn-multihash'
import CID from 'cids'
import snCid from '.'

describe('Operation: snCid', (): void => {
  it('is defined', (): void => {
    expect(snCid).toBeDefined()
  })
  it('should be correct CID', async (): Promise<void> => {
    const hash = await snMultihash([
      {
        data: stringToU8a('demo'),
        decode: () => 'demo'
      }
    ])
    const cid = await snCid([hash])

    // lets generate the same CID based on the buffer so we can test teh correct values
    const { codec, version, multibaseName } = new CID(cid.decode())
    expect(codec).toEqual('dag-cbor')
    expect(version).toEqual(1)
    expect(multibaseName).toEqual('base32')
  })
  it('should be correct multihash', async (): Promise<void> => {
    const hash = await snMultihash([
      {
        data: stringToU8a('demo'),
        decode: () => 'demo'
      }
    ])

    const cid = await snCid([hash])

    const t = new CID(cid.decode())
    // for now bafy is one what we need
    const isBafy = t.toString().startsWith('bafy')
    expect(isBafy).toEqual(true)
  })
  it('should fail on wrong multihash', async (): Promise<void> => {
    expect.assertions(1)
    const buff = Buffer.from('ss')
    try {
      await snCid([
        {
          data: u8aToU8a(buff),
          decode: () => buff
        }
      ])
    } catch (error) {
      expect(error.message).toContain('multihash unknown function code')
    }
  })
})

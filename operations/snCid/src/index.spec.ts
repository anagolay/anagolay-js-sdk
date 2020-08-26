import { stringToU8a, u8aToU8a } from '@polkadot/util'
import snMultihash from '@sensio/op-sn-multihash'
import CID from 'cids'
import execute, { snCid } from './index'

const demo = {
  text: 'demo',
  cid: 'bafy2bzacedwrfzn6mrudj5dlhzncjts3s2yg76vc7cxwge6lnzdjhl2gkxii6'
}

describe('Operation: snCid', (): void => {
  it('is defined, snCid', (): void => {
    expect(snCid).toBeDefined()
  })
  it('should be correct CID', async (): Promise<void> => {
    const cid = await execute([
      {
        data: stringToU8a(demo.text),
        decode: () => Buffer.from(demo.text)
      }
    ])
    expect(cid.decode()).toEqual(demo.cid)

    // lets generate the same CID based on the buffer so we can test teh correct values
    const { codec, version, multibaseName } = new CID(cid.decode())
    expect(codec).toEqual('dag-cbor')
    expect(version).toEqual(1)
    expect(multibaseName).toEqual('base32')
  })
  it('should be correct multihash', async (): Promise<void> => {
    const hash = await snMultihash([
      {
        data: stringToU8a(demo.text),
        decode: () => demo.text
      }
    ])

    const cid = await execute([hash])

    const t = new CID(cid.decode())
    // for now bafy is one what we need
    const isBafy = t.toString().startsWith('bafy')
    expect(isBafy).toEqual(true)
  })
  it('should fail on wrong multihash with direct passing the params', async (): Promise<
  void
  > => {
    expect.assertions(1)
    const buff = Buffer.from(demo.text)
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

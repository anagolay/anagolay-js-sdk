import { bufferToU8a, stringToU8a } from '@polkadot/util'
import mh from 'multihashing-async'
import snMultihash from '.'

describe('SnOperation: snMultihash', (): void => {
  it('is defined', (): void => {
    expect(snMultihash).toBeDefined()
  })
  it('should create correct multihash', async (): Promise<void> => {
    const algo = 'blake2b-256'
    const verifMh = bufferToU8a(await mh(stringToU8a('demo'), algo))

    const res = await snMultihash([
      {
        data: stringToU8a('demo'),
        decode: () => 'demo'
      }
    ])
    expect(res.data).toEqual(verifMh)
  })
})

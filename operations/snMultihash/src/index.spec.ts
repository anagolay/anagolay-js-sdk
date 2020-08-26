import { bufferToU8a, stringToU8a } from '@polkadot/util'
import mh from 'multihashing-async'
import snMultihash from '.'

describe('SnOperation: snMultihash', (): void => {
  it('is defined', (): void => {
    expect(snMultihash).toBeDefined()
  })
  it('should create correct multihash', async (): Promise<void> => {
    const algo = 'blake2b-256'
    const testParam = 'demo'
    const verifMh = bufferToU8a(await mh(stringToU8a(testParam), algo))

    const res = await snMultihash([
      {
        data: stringToU8a(testParam),
        decode: () => testParam
      }
    ])
    expect(res.data).toEqual(verifMh)
  })
})

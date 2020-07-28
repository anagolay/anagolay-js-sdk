import { bufferToU8a } from '@polkadot/util'
import mh from 'multihashing-async'
import snMultihash from '.'
import config from './config'

describe('SnOperation: snMultihash', (): void => {
  it('is defined', (): void => {
    expect(snMultihash).toBeDefined()
  })
  it('should create correct multihash', async (): Promise<void> => {
    const data = new Uint8Array(7)

    const algo = `${config.data.hashing.algo}-${config.data.hashing.bits}`
    const verifMh = bufferToU8a(await mh(data, algo))

    const res = await snMultihash({ data })
    expect(res.output).toEqual(verifMh)
  })
})

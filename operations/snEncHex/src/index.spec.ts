import { stringToU8a } from '@polkadot/util'
import snEncHex from '.'

describe('SnOperation: snEncHex', (): void => {
  it('is defined', (): void => {
    expect(snEncHex).toBeDefined()
  })
  it('should create correct hex prefixed string', async (): Promise<void> => {
    const str = 'yo peeps'
    const encoded = '0x796f207065657073'
    const res = await snEncHex([
      {
        data: stringToU8a(str),
        decode: () => str
      }
    ])

    expect(res.decode()).toEqual(encoded)
  })
})

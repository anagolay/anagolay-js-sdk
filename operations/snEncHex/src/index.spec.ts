import { stringToU8a, u8aToU8a } from '@polkadot/util'
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
    const res2 = await snEncHex([
      {
        data: u8aToU8a(Buffer.from(str)),
        decode: () => Buffer.from(str)
      }
    ])

    expect(res2.decode()).toEqual(encoded)
  })
})

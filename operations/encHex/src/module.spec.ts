import { stringToU8a } from '@anagolay/util'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { encHex } from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: encHex', (): void => {
  it('should create correct hex prefixed string', async (): Promise<void> => {
    const str = 'yo peeps'
    const encoded = '0x796f207065657073'
    const res = await encHex([
      {
        data: stringToU8a(str),
        decode: () => str,
      },
    ])

    expect(res.decode()).toEqual(encoded)
  })
})

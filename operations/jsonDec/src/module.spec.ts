import { stringToU8a } from '@anagolay/util'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import jsonDec from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: jsonDec', (): void => {
  it('should pass', async (): Promise<void> => {
    const u1 = { name: 'yo' }
    const encoded = JSON.stringify(u1)

    const res = await jsonDec([
      {
        data: stringToU8a(encoded),
        decode: () => encoded,
      },
    ])

    const parsed = JSON.parse(encoded)

    expect(res.decode()).toEqual(parsed)
  })
  it('should fail when passing invalid input', async (): Promise<void> => {
    expect.assertions(1)

    const u1 = { name: 'yo' }
    const encoded = JSON.stringify(u1)
    const wrongInput = encoded + '2'

    try {
      await jsonDec([{ data: stringToU8a(wrongInput), decode: () => wrongInput }])
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError)
    }
  })
})

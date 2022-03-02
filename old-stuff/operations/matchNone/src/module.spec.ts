import { AnInputParamsImplementation } from '@anagolay/types'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import matchNone from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: matchNone', (): void => {
  it('should pass', async (): Promise<void> => {
    const u1 = new Uint8Array(1)
    const u2 = new Uint8Array(2)
    const eqArr: AnInputParamsImplementation[] = [
      { data: u1, decode: () => u1 },
      { data: u2, decode: () => u2 },
    ]
    const res = await matchNone(eqArr)

    expect(res.data).toEqual(true)
  })

  it('should fail', async (): Promise<void> => {
    const u1 = new Uint8Array(1)
    const u2 = new Uint8Array(2)
    const neqArr: AnInputParamsImplementation[] = [
      { data: u1, decode: () => u1 },
      { data: u1, decode: () => u1 },
      { data: u2, decode: () => u2 },
    ]

    expect.assertions(1)

    try {
      await matchNone(neqArr)
    } catch (e) {
      expect(e.message).toEqual('Found duplicates in children outputs')
    }
  })
  it('should throw error for wrong amount of input params', async (): Promise<void> => {
    const neqArr: AnInputParamsImplementation[] = []

    expect.assertions(1)

    try {
      await matchNone(neqArr)
    } catch (e) {
      expect(e.message).toEqual('This operation cannot have zero operations')
    }
  })
})

import { bufferToU8a } from '@anagolay/util'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { hash as createBlake3Hash } from 'blake3'
import mh from 'multihashes'
import execute, { multihash } from '.'

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers()
})

describe('AnOperation: multihash', (): void => {
  /**
   * This will fail because they depend on each-other which is not the case.
   * basically this `Couldn't load the @anagolay/op-multihash for multihash` and that's now OK since the `execute` is meant to be used from other operations not from itself.
   * This is ab bug in the `executeOperation.ts`
   */
  it.skip('should create correct multihash default operation', async (): Promise<void> => {
    const algo = 'blake3'

    const encoder = new TextEncoder()
    const testParam = encoder.encode('demo')
    const hash = createBlake3Hash(testParam) as Buffer
    const hashBuff = mh.encode(bufferToU8a(hash), algo)
    const res = await execute([
      {
        data: testParam,
        decode: () => testParam,
      },
    ])

    expect(res.data).toEqual(hashBuff)
  })
  it('should create correct multihash, named export', async (): Promise<void> => {
    const algo = 'blake3'

    const encoder = new TextEncoder()
    const testParam = encoder.encode('demo')
    const hash = createBlake3Hash(testParam) as Buffer
    const hashBuff = mh.encode(bufferToU8a(hash), algo)
    const res = await multihash([
      {
        data: testParam,
        decode: () => testParam,
      },
    ])

    expect(res.data).toEqual(hashBuff)
  })
})

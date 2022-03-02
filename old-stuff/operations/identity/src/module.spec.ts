import { beforeEach, jest } from '@jest/globals'
import identity from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: identity', (): void => {
  it('should pass', async (): Promise<void> => {
    const u1 = new Uint8Array(1)
    const t = await identity([{ data: u1, decode: () => u1 }])

    expect(t.data).toEqual(u1)
  })
})

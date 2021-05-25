import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import jsonEnc from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

describe('AnOperation: jsonEnc', (): void => {
  it('should pass', async (): Promise<void> => {
    const u1 = { name: 'yo' }
    const ba = JSON.stringify(u1)
    const res = await jsonEnc([{ data: u1, decode: () => u1 }])

    expect(res.decode()).toEqual(ba)
  })
})

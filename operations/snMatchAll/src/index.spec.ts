import { SnInputParamsImplementation } from '@sensio/types'
import snMatchAll from '.'

describe('SnOperation: snMatchAll', (): void => {
  it('is defined', (): void => {
    expect(snMatchAll).toBeDefined()
  })

  it('should pass', async (): Promise<void> => {
    const u1 = new Uint8Array(1)
    const eqArr: SnInputParamsImplementation[] = [
      { data: u1, decode: () => u1 },
      { data: u1, decode: () => u1 },
    ]
    const res = await snMatchAll(eqArr)
    expect(res.data).toEqual(true)
  })

  it('should fail', async (): Promise<void> => {
    const u1 = new Uint8Array(1)
    const u2 = new Uint8Array(2)
    const neqArr: SnInputParamsImplementation[] = [
      { data: u1, decode: () => u1 },
      { data: u1, decode: () => u1 },
      { data: u2, decode: () => u2 },
    ]
    expect.assertions(1)
    try {
      await snMatchAll(neqArr)
    } catch (e) {
      expect(e.message).toEqual('Children outputs are not equal')
    }
  })
  it('should throw error for wrong amount of input params', async (): Promise<void> => {
    const neqArr: SnInputParamsImplementation[] = []
    expect.assertions(1)
    try {
      await snMatchAll(neqArr)
    } catch (e) {
      expect(e.message).toEqual('This operation cannot have zero operations')
    }
  })
})

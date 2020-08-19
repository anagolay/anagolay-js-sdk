import { SnInputParamsImplementation } from '@sensio/types'
import snMatchNone from '.'

describe('SnOperation: snMatchNone', (): void => {
  it('is defined', (): void => {
    expect(snMatchNone).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    var u1 = new Uint8Array(1)
    var u2 = new Uint8Array(2)
    var eqArr: SnInputParamsImplementation[] = [
      { data: u1, decode: () => u1 },
      { data: u2, decode: () => u2 }
    ]
    const res = await snMatchNone(eqArr)
    expect(res.data).toEqual(true)
  })

  it('should fail', async (): Promise<void> => {
    var u1 = new Uint8Array(1)
    var u2 = new Uint8Array(2)
    var neqArr: SnInputParamsImplementation[] = [
      { data: u1, decode: () => u1 },
      { data: u1, decode: () => u1 },
      { data: u2, decode: () => u2 }
    ]
    expect.assertions(1)
    try {
      await snMatchNone(neqArr)
    } catch (e) {
      expect(e.message).toEqual('Found duplicates in children outputs')
    }
  })
  it('should throw error for wrong amount of input params', async (): Promise<
  void
  > => {
    var neqArr: SnInputParamsImplementation[] = []
    expect.assertions(1)
    try {
      await snMatchNone(neqArr)
    } catch (e) {
      expect(e.message).toEqual('This operation cannot have zero operations')
    }
  })
})

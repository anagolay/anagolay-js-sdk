import { SnReturnParams } from '@sensio/types'
import snMatchNone from '.'

describe('SnOperation: snMatchNone', (): void => {
  it('is defined', (): void => {
    expect(snMatchNone).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    var u1 = new Uint8Array(1)
    var u2 = new Uint8Array(2)
    var eqArr: SnReturnParams[] = [{ output: u1, decode: () => u1 }, { output: u2, decode: () => u2 }]
    const res = await snMatchNone({ childrenOutputs: eqArr })
    expect(res.output).toEqual(true)
  })

  it('should fail', async (): Promise<void> => {
    var u1 = new Uint8Array(1)
    var u2 = new Uint8Array(2)
    var neqArr: SnReturnParams[] = [{ output: u1, decode: () => u1 }, { output: u1, decode: () => u1 }, { output: u2, decode: () => u2 }]
    expect.assertions(1)
    try {
      await snMatchNone({ childrenOutputs: neqArr })
    } catch (e) {
      expect(e.message).toEqual('Found duplicates in children outputs')
    }
  })
})

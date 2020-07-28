import { SnReturnParams } from '@sensio/types'
import snMatchAll from '.'

describe('SnOperation: snMatchAll', (): void => {
  it('is defined', (): void => {
    expect(snMatchAll).toBeDefined()
  })

  it('should pass', async (): Promise<void> => {
    var u1 = new Uint8Array(1)
    var eqArr: SnReturnParams[] = [{ output: u1, decode: () => u1 }, { output: u1, decode: () => u1 }]
    const res = await snMatchAll({ childrenOutputs: eqArr })
    expect(res.output).toEqual(true)
  })

  it('should fail', async (): Promise<void> => {
    var u1 = new Uint8Array(1)
    var u2 = new Uint8Array(2)
    var neqArr: SnReturnParams[] = [{ output: u1, decode: () => u1 }, { output: u1, decode: () => u1 }, { output: u1, decode: () => u1 }, { output: u2, decode: () => u2 }]
    expect.assertions(1)
    try {
      await snMatchAll({ childrenOutputs: neqArr })
    } catch (e) {
      expect(e.message).toEqual('Children outputs are not equal')
    }
  })
})

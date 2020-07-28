import { stringToU8a, u8aToString } from '@polkadot/util'
import { SnReturnParams } from '@sensio/types'
import snSplit from '.'

describe('SnOperation: snSplit', (): void => {
  it('is defined', (): void => {
    expect(snSplit).toBeDefined()
  })
  it('should pass', async (): Promise<void> => {
    const u1 = stringToU8a('dummy statement data')
    const u2 = stringToU8a('dummy statement data #2')

    const saveStatementsOutput: SnReturnParams[] = [{ output: u1, decode: () => u8aToString(u1) }, { output: u2, decode: () => u8aToString(u2) }]
    const res = await snSplit({
      opName: stringToU8a('save_statements'),
      childrenOutputs: saveStatementsOutput
    })

    const expectedRes = [
      {
        k: 'save_statements',
        v: 'dummy statement data'
      },
      {
        k: 'save_statements',
        v: 'dummy statement data #2'
      }
    ]

    expect(res.output.length).toEqual(2)

    expect(res.decode()).toContainEqual(expectedRes[0])
    expect(res.decode()).toContainEqual(expectedRes[1])
  })
  it('should return error on missing children', async (): Promise<void> => {
    expect.assertions(1)
    try {
      await snSplit({
        opName: stringToU8a('save_statements'),
        childrenOutputs: []
      })
    } catch (error) {
      expect(error.message).toEqual('Missing children outputs')
    }
  })
})

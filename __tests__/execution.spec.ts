import { stringToU8a } from '@polkadot/util'
import { executeOperation } from '@sensio/core/execution'
import snCid from '@sensio/op-sn-cid'
import snCidOperationConfig from '@sensio/op-sn-cid/config'
import { InputParams, ReturnParams } from '@sensio/op-sn-cid/interfaces'
import snMultihash from '@sensio/op-sn-multihash'
import { SnOperation } from '@sensio/types'
import { composeWith } from 'ramda'

const demo = {
  text: 'demo',
  cid: 'bafy2bzacedwrfzn6mrudj5dlhzncjts3s2yg76vc7cxwge6lnzdjhl2gkxii6',
}
describe('Core::execution ', () => {
  it('should correctly run the operation tree', async (): Promise<void> => {
    const snCidOp: SnOperation = snCidOperationConfig

    const cid = await executeOperation<InputParams, ReturnParams>(snCidOp, [
      {
        data: stringToU8a(demo.text),
        decode: () => Buffer.from(demo.text),
      },
    ])

    expect(cid).toBeDefined()
    expect(cid.decode()).toEqual(demo.cid)
  })
  it('should execute the real operation tree', async (): Promise<void> => {
    const cid = await snCid([
      {
        data: stringToU8a(demo.text),
        decode: () => Buffer.from(demo.text),
      },
    ])

    expect(cid).toBeDefined()
    expect(cid.decode()).toEqual(demo.cid)
  })
  it('should execute the real operation tree with no children', async (): Promise<void> => {
    const hash = await snMultihash([
      {
        data: stringToU8a(demo.text),
        decode: () => Buffer.from(demo.text),
      },
    ])
    expect(hash).toBeDefined()
  })
  it.skip('should', () => {
    const data = 1
    /**
     * Calling order:
     * ```md
     * 1. add1 1
     * 2. compAll [Function: add2] 2
     * 3. add2 2
     * 4. compAll [Function: remove1] 4
     * 5. remove1 4
     * 6. 3
     * ```
     */

    function add1(x: number): number {
      console.log('add1', x)
      return x + 1
    }
    function add2(x: number): number {
      console.log('add2', x)
      return x + 2
    }
    function remove1(x: number): number {
      console.log('remove1', x)
      return x - 1
    }

    const compAll = composeWith((f, res) => {
      console.log('compAll', f, res)
      return f(res)
    })

    const result = compAll([remove1, add2, add1])
    console.log(result(data))
  })
})

// /* eslint-disable no-console */
// import { AnOperation } from '@anagolay/types'
// import { stringToU8a } from '@polkadot/util'
// import { executeOperation } from '@anagolay/core'
// import cid from '@anagolay/op-cid'
// import cidOperationConfig from '@anagolay/op-cid/config'
// import { InputParams, ReturnParams } from '@anagolay/op-cid/interfaces'
// import multihash from '@anagolay/op-multihash'
// import { composeWith } from 'ramda'

// const demo = {
//   text: 'demo',
//   cid: 'bafy2bzacedwrfzn6mrudj5dlhzncjts3s2yg76vc7cxwge6lnzdjhl2gkxii6',
// }

// describe('Core::execution ', () => {
//   it('should be defined -- executeOperation --', () => {
//     expect(executeOperation).toBeDefined()
//   })
//   it('should correctly run the operation tree', async (): Promise<void> => {
//     const cidOp: AnOperation = cidOperationConfig

//     const cid = await executeOperation<InputParams, ReturnParams>(cidOp, [
//       {
//         data: stringToU8a(demo.text),
//         decode: () => Buffer.from(demo.text),
//       },
//     ])

//     expect(cid).toBeDefined()
//     expect(cid.decode()).toEqual(demo.cid)
//   })
//   it('should execute the real operation tree', async (): Promise<void> => {
//     const cid = await cid([
//       {
//         data: stringToU8a(demo.text),
//         decode: () => Buffer.from(demo.text),
//       },
//     ])

//     expect(cid).toBeDefined()
//     expect(cid.decode()).toEqual(demo.cid)
//   })
//   it('should execute the real operation tree with no children', async (): Promise<void> => {
//     const hash = await multihash([
//       {
//         data: stringToU8a(demo.text),
//         decode: () => Buffer.from(demo.text),
//       },
//     ])
//     expect(hash).toBeDefined()
//   })
//   it.skip('DEMO -- define the exec flow', () => {
//     const data = 1
//     /**
//      * Calling order:
//      * ```md
//      * 1. add1 1
//      * 2. compAll [Function: add2] 2
//      * 3. add2 2
//      * 4. compAll [Function: remove1] 4
//      * 5. remove1 4
//      * 6. 3
//      * ```
//      */

//     function add1(x: number): number {
//       console.log('add1', x)
//       return x + 1
//     }
//     function add2(x: number): number {
//       console.log('add2', x)
//       return x + 2
//     }
//     function remove1(x: number): number {
//       console.log('remove1', x)
//       return x - 1
//     }

//     const compAll = composeWith((f, res) => {
//       console.log('compAll', f, res)
//       return f(res)
//     })

//     const result = compAll([remove1, add2, add1])
//     console.log(result(data))
//   })
// })
import { describe, expect, it } from '@jest/globals'

describe('Core: executeOperation ', () => {
  it('is true', (): void => {
    expect(true).toBeTruthy()
  })
})

/* eslint-disable @typescript-eslint/no-floating-promises */
import { ApiPromise } from '@polkadot/api'
import '@sensio/types/interfaces/augment-api'
import '@sensio/types/interfaces/augment-types'

export function showBlockInfo (api: ApiPromise): void {
  // make a call to retrieve the current network head
  api.rpc.chain.subscribeNewHeads(async header => {
    await api.rpc.chain.getBlock(header.hash, async block => {
      // don't crash
      try {
        const blockNumber = block.block.header.number.toNumber()
        console.log('Block is:', blockNumber)
        // Extrinsics in the block
        const extrinsics = block.block.extrinsics
        // Check each extrinsic in the block
        for (const extrinsic of extrinsics) {
          // This specific call index [0,1] represents `system.remark`
          console.log(extrinsic.callIndex)
          console.log(extrinsic)
        }
      } catch (error) {
        console.error(error)
      }
    })
  })
}

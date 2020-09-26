import { stringToU8a } from '@polkadot/util'
import snCid from '@sensio/op-sn-cid'
import { SnGenericId } from '@sensio/types'

/**
 * Generic function for calculation of the Record CID
 * @FUCK fix this properly
 * @typeParam P Any piece of data
 */
export default async function calculateRecordCid<P>(param: P): Promise<SnGenericId> {
  const cid = await snCid([
    {
      data: stringToU8a(JSON.stringify(param)),
      decode: () => param,
    },
  ])

  return cid.decode()
}

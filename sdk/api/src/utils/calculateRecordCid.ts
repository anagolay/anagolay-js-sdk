import executeCid from '@anagolay/op-cid'
import { AnGenericId } from '@anagolay/types'
import { stringToU8a } from '@anagolay/util'

/**
 * Generic function for calculation of the Record CID
 * @FUCK fix this properly
 * @typeParam P Any piece of data
 */
export default async function calculateRecordCid<P>(param: P): Promise<AnGenericId> {
  const cid = await executeCid([
    {
      data: stringToU8a(JSON.stringify(param)),
      decode: () => param,
    },
  ])

  return cid.decode()
}

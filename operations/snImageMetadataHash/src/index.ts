import { executeOperation } from '@sensio/core/execution'
import snCid from '@sensio/op-sn-cid'
import { SnOperation } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'
/**
 * Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Hash of full unchanged metadata buffer (or similar). Without raw pixels) and decoder function
 */
export default async function execute<T> (params: T): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  if (inputLength === 1) {
    const c: SnOperation = config
    return executeOperation<T, ReturnParams>(c, params)
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}
/**
 * Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid
 * @param [InputParams] params
 * @return  output (Hash of full unchanged metadata buffer (or similar). Without raw pixels) and decoder function
 */
export async function snImageMetadataHash (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  if (inputLength === 1) {
    const data = params[inputLength - 1]
    return snCid([data])
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

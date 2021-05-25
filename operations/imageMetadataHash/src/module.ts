import { executeOperation } from '@anagolay/core'
import cid from '@anagolay/op-cid'
import { AnOperation } from '@anagolay/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Hash of full unchanged metadata buffer (or similar). Without raw pixels) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return executeOperation<T, ReturnParams>(c, params)
}

/**
 * Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid
 * @param [InputParams] params
 * @return  output (Hash of full unchanged metadata buffer (or similar). Without raw pixels) and decoder function
 */
export async function imageMetadataHash(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  const data = params[inputLength - 1]

  return await cid([data])
}

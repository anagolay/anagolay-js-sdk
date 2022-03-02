import { executeOperation } from '@anagolay/core'
import cid from '@anagolay/op-cid'
import { AnOperation } from '@anagolay/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Calculate content id of the raw pixels
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Return content id of the raw pixels) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

/**
 * Calculate content id of the raw pixels
 * @param [InputParams] params
 * @return  output (Return content id of the raw pixels) and decoder function
 */
export async function imageRawPixelsHash(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]

  return await cid([data])
}

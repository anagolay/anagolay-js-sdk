import { executeOperation } from '@sensio/core/execution'
import snCid from '@sensio/op-sn-cid'
import { SnOperation } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Calculate content id of the raw pixels
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Return content id of the raw pixels) and decoder function
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
 * Calculate content id of the raw pixels
 * @param [InputParams] params
 * @return  output (Return content id of the raw pixels) and decoder function
 */
export async function snImageRawPixelsHash (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]
  return snCid([data])
}
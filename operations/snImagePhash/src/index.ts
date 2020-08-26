import { stringToU8a } from '@polkadot/util'
import { executeOperation } from '@sensio/core/execution'
import { SnOperation } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'
import calculatePHash, { PhashOutputFormat } from './phash'
/**
 * Perceptual hash calculation, currently implementing http://blockhash.io/
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Return binary representation of phash 0011101011) and decoder function
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

export async function snImagePhash (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]
  const phash = await calculatePHash(data.decode(), 8, PhashOutputFormat.BINARY)
  return {
    data: stringToU8a(phash),
    decode: () => phash
  }
}

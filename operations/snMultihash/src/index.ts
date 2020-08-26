import { bufferToU8a } from '@polkadot/util'
import { executeOperation } from '@sensio/core/execution'
import { SnOperation } from '@sensio/types'
import mh from 'multihashing-async'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'
/**
 * Generic blake2b-256 multihash operation.
 * @param {InputParams} params InputParams
 * @return  output (Returns the Multihash buffer as SnByteArray.) and decoder function
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
export async function snMultihash (params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  const data = params[inputLength - 1]
  const algo = 'blake2b-256'

  const hashBuf = await mh(data.data, algo)
  return {
    data: bufferToU8a(hashBuf),
    decode: () => hashBuf
  }
}

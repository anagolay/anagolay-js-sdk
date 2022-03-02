import { executeOperation } from '@anagolay/core'
import { AnOperation } from '@anagolay/types'
import { hash as createBlake3Hash } from 'blake3'
import mh from 'multihashes'
import config from './config'
import { InputParam0, InputParams, ReturnParams } from './interfaces'

/**
 * Generic blake3 multihash operation.
 * @param {InputParams} params InputParams
 * @return  output (Returns the Multihash buffer as AnByteArray.) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

export async function multihash(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  const data = params[inputLength - 1]
  const algo = 'blake3'

  // if there are no await-ing use this trick ??? maybe
  async function result(data: InputParam0) {
    const hash = createBlake3Hash(data.data) as Buffer

    const hashBuf = mh.encode(hash, algo)

    return {
      data: hashBuf,
      decode: () => hashBuf as Uint8Array,
    }
  }

  return await result(data)
}

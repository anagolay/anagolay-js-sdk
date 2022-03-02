import { executeOperation } from '@anagolay/core'
import { AnOperation } from '@anagolay/types'
import CID from 'cids'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Generic CID, defaults to base32 and dag-pb for Any kind of data.
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (CID string converted into AnByteArray) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await executeOperation<T, ReturnParams>(c, params)
}

export async function cid(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  const hash = params[inputLength - 1]
  const cid = new CID(1, 'dag-pb', hash.data)
  const calculatedCid = cid.toV1()

  return {
    data: calculatedCid.bytes,
    decode: () => calculatedCid.toString('base32') as string, //try removing as string
  }
}

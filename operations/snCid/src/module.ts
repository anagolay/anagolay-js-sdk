import { stringToU8a } from '@polkadot/util'
import { executeOperation } from '@sensio/core'
import { SnOperation } from '@sensio/types'
import CID from 'cids'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Generic CID, defaults to base32 and dag-cbor for Any kind of data.
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (CID string converted into SnByteArray) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: SnOperation = config
  return executeOperation<T, ReturnParams>(c, params)
}

export async function snCid(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  const hash = params[inputLength - 1]
  const cid = new CID(1, 'dag-cbor', hash.decode())
  const cidString = cid.toV1().toString()
  return {
    data: stringToU8a(cidString),
    decode: () => cidString,
  }
}

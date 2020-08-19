import { stringToU8a } from '@polkadot/util'
import { SnForWhat } from '@sensio/types'
import CID from 'cids'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'
/**
 * @function snCid
 * @description Generic CID, defaults to base32 and dag-cbor for Any kind of data.
 * @param {InputParam[]} params Directly passed data or gotten from child operations
 * @return {Promise<ReturnParams>} output (CID string converted into SnByteArray) and decoder function
 */
export default async function snCid (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  // if operation is flowcontrol it can have multiple children because they are added dynamically

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }

  if (inputLength === 1) {
    const hash = params[inputLength - 1]
    const cid = new CID(1, 'dag-cbor', hash.decode())

    return {
      data: stringToU8a(cid.toV1().toString()),
      decode: () => cid.toV1().toString()
    }
  } else {
    throw new Error("This op doesn't support more than one input param ")
  }
}

import { SnForWhat } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snImageMetadataHash
 * @description Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Hash of full unchanged metadata buffer (or similar). Without raw pixels) and decoder function
 */
export default async function snImageMetadataHash (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    const data = params[inputLength - 1]
    return {
      data: data.data,
      decode: () => 'CHANGE_ME'
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

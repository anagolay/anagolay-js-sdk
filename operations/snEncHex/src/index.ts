import { stringToHex, stringToU8a, u8aToHex } from '@polkadot/util'
import { SnForWhat } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snEncHex
 * @description Encode arbitrary data to HEX with 0x prefix
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Returns prefixed hex encoded string. Example 0x11211221) and decoder function
 */
export async function snEncHex (params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    const data = params[inputLength - 1]
    return {
      data: stringToU8a(u8aToHex(data.data)),
      decode: () => stringToHex(data.decode())
    }
  } else {
    throw new Error("This operation doesn't support more than one input param")
  }
}

export default snEncHex

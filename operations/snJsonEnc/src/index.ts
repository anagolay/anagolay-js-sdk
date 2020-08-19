import { stringToU8a } from '@polkadot/util'
import { SnForWhat } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snJsonEnc
 * @description Wrapper of JSON.stringify().
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Returns SnByteArray of json string.) and decoder function
 */
export default async function snJsonEnc (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    // start implementation here
    const data = params[inputLength - 1]
    const val = JSON.stringify(data.data)
    return {
      data: stringToU8a(val),
      decode: () => val
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

import { u8aToString, u8aToU8a } from '@polkadot/util'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Wrapper of JSON.parse()
 * @param {InputParams} params InputParams
 * @return  output () and decoder function
 */
export default async function snJsonDec (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  if (inputLength === 1) {
    const data = params[inputLength - 1]
    const val = JSON.parse(u8aToString(data.data))

    return {
      data: u8aToU8a(val),
      decode: () => val
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

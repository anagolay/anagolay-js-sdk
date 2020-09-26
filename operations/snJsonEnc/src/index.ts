import { stringToU8a } from '@polkadot/util'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Wrapper of JSON.stringify().
 * @param params InputParams
 * @returns  output (Returns SnByteArray of json string.) and decoder function
 */
export default async function snJsonEnc(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  if (inputLength === 1) {
    // start implementation here
    const data = params[inputLength - 1]
    const val = JSON.stringify(data.data)
    return {
      data: stringToU8a(val),
      decode: () => val,
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

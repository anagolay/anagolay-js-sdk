import { u8aToString } from '@anagolay/util'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * Wrapper of JSON.parse()
 * @param {InputParams} params InputParams
 * @return  output () and decoder function
 */
export default async function jsonDec(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  if (inputLength === 1) {
    const data = params[inputLength - 1]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const val = JSON.parse(u8aToString(data.data))

    return {
      data: val,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      decode: () => val,
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

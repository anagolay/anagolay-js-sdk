import { executeOperation } from '@anagolay/core'
import { AnOperation } from '@anagolay/types'
import { stringToHex, stringToU8a, u8aToHex } from '@anagolay/util'
import config from './config'
import { InputParam0, InputParams, ReturnParams } from './interfaces'

/**
 * Encode arbitrary data to HEX with 0x prefix
 * @typeParam T Type `T` is generic and it is used to get the latest child operation. With default export use generic type so this operation can be executed from the leaf child
 * @return  output (Returns prefixed hex encoded string. Example 0x11211221) and decoder function
 */
export default async function execute<T>(params: T): Promise<ReturnParams> {
  const c: AnOperation = config

  return await executeOperation<T, ReturnParams>(c, params)
}

export async function encHex(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const data = params[inputLength - 1]

  async function result(data: InputParam0) {
    return {
      // the reason is that we want byte array that decodes into the hex value, not original
      data: stringToU8a(u8aToHex(data.data)),
      decode: () => stringToHex(data.decode()),
    }
  }

  return await result(data)
}

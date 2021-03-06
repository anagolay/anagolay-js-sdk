import { AnProofParams } from '@anagolay/types'
import { stringToU8a } from '@anagolay/util'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * split
 * Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.
 * @param {InputParams} params InputParams
 * @return  output (Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.) and decoder function
 */
export default async function split(params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length

  if (inputLength === 1) {
    const data = params[inputLength - 1]
    const decoded = data.decode()

    if (decoded.data.length === 0) {
      throw new Error('Missing children outputs')
    }

    const res: AnProofParams[] = decoded.data.map((child) => {
      return {
        k: decoded.opName,
        v: child.decode(),
      }
    })

    return {
      data: stringToU8a(JSON.stringify(res)),
      decode: () => res,
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

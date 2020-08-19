import { stringToU8a } from '@polkadot/util'
import { SnForWhat, SnProofParams } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snSplit
 * @description Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.) and decoder function
 */
export default async function snSplit (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    const data = params[inputLength - 1]
    const decoded = data.decode()

    if (decoded.data.length === 0) {
      throw new Error('Missing children outputs')
    }

    const res: SnProofParams[] = decoded.data.map(child => {
      return {
        k: decoded.opName,
        v: child.decode()
      }
    })

    return {
      data: stringToU8a(JSON.stringify(res)),
      decode: () => res
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

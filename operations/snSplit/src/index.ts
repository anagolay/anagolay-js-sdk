import { u8aToString } from '@polkadot/util'
import { SnByteArray, SnProofParams, SnReturnParams } from '@sensio/types'

interface InputParams {
  childrenOutputs: SnReturnParams[]
  opName: SnByteArray
}

interface ReturnParams extends SnReturnParams {
  output: SnProofParams[]
  decode: () => SnProofParams[]
}

/**
* @function snSplit
* @description Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.) and decoder function
*/
export default async function snSplit (params: InputParams): Promise<ReturnParams> {
  const { childrenOutputs, opName } = params
  const res: SnProofParams[] = []

  if (childrenOutputs.length === 0) {
    throw new Error('Missing children outputs')
  }

  childrenOutputs.forEach(child => {
    const o = {
      k: u8aToString(opName),
      v: child.decode()
    }
    res.push(o)
  })

  return {
    output: res,
    decode: () => res
  }
}

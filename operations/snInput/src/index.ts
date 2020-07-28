import { SnAny, SnByteArray, SnReturnParams } from '@sensio/types'

interface InputParams {
  childrenOutputs: SnReturnParams[]

}

interface ReturnParams extends SnReturnParams {
  output: SnByteArray
  decode: () => SnAny
}

/**
* @function snInput
* @description What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output () and decoder function
*/
export default async function snInput (params: InputParams): Promise<ReturnParams> {
  const { childrenOutputs } = params

  if (childrenOutputs.length !== 1) {
    throw new Error('This operation cannot have more than one child')
  }

  return {
    output: childrenOutputs[0].output,
    decode: () => childrenOutputs[0].decode()
  }
}

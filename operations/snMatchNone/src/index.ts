import { SnBoolean, SnReturnParams } from '@sensio/types'
import { uniq } from 'ramda'

interface InputParams {
  childrenOutputs: SnReturnParams[]

}

interface ReturnParams extends SnReturnParams {
  output: SnBoolean
  decode: () => SnBoolean
}

/**
* @function snMatchNone
* @description This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (Returns true, if none match or throws an error if some match.) and decoder function
*/
export default async function snMatchNone (params: InputParams): Promise<ReturnParams> {
  const { childrenOutputs } = params
  const u = childrenOutputs.map(z => z.output)
  const neq = uniq(u)
  if (neq.length !== childrenOutputs.length) {
    throw new Error('Found duplicates in children outputs')
  }

  return {
    output: true,
    decode: () => true
  }
}

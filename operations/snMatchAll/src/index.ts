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
* @function snMatchAll
* @description This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (Returns true, if all match or throws an error if some match.) and decoder function
*/
export default async function snMatchAll (params: InputParams): Promise<ReturnParams> {
  const { childrenOutputs } = params
  const u = childrenOutputs.map(z => z.output)
  const eq = uniq(u)
  if (eq.length !== 1) {
    throw new Error('Children outputs are not equal')
  }

  return {
    output: true,
    decode: () => true
  }
}

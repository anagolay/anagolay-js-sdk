import { map, prop, uniq } from 'ramda'
import { InputParams, ReturnParams } from './interfaces'
/**
 * This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.
 * @param {InputParams} params InputParams
 * @return  output (Returns true, if all match or throws an error if some match.) and decoder function
 */
export default async function snMatchAll(params: InputParams): Promise<ReturnParams> {
  if (params.length === 0) {
    throw new Error('This operation cannot have zero operations')
  }
  const u = map(prop('data'), params)
  const eq = uniq(u)

  if (eq.length !== 1) {
    throw new Error('Children outputs are not equal')
  }
  return {
    data: true,
    decode: () => true,
  }
}

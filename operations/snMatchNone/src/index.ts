import { uniq } from 'ramda'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snMatchNone
 * @description This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Returns true, if none match or throws an error if some match.) and decoder function
 */
export default async function snMatchNone (
  params: InputParams
): Promise<ReturnParams> {
  if (params.length === 0) {
    throw new Error('This operation cannot have zero operations')
  }
  const u = params.map(z => z.data)
  const neq = uniq(u)

  if (neq.length !== params.length) {
    throw new Error('Found duplicates in children outputs')
  }

  return {
    data: true,
    decode: () => true
  }
}

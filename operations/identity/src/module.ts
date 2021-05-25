import { InputParams, ReturnParams } from './interfaces'

/**
 * What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.
 * @param {InputParams} params InputParams
 * @return  output () and decoder function
 */
export default async function identity(params: InputParams): Promise<ReturnParams> {
  const data = params[0]

  return data
}

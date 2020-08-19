import { SnForWhat } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snIdentity
 * @description What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output () and decoder function
 */
export default async function snIdentity (
  params: InputParams
): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    // start implementation here
    const data = params[inputLength - 1]
    return data
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

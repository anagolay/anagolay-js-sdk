import { SnForWhat } from '@sensio/types'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snRawPixelsHash
 * @description RAW PIXELS of the photo
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (RAW PIXELS of the photo) and decoder function
 */
export default async function snRawPixelsHash (
  params: InputParams
): Promise<ReturnParams> {
  console.log('we have 1 child ops')
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    // start implementation here
    console.log('snRawPixelsHash', params)
    const data = params[inputLength - 1]
    return {
      data: data.data,
      decode: () => Buffer.from('CHANGE_ME')
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

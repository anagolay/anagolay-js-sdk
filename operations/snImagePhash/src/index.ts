
import { SnForWhat } from '@sensio/types'
import { InputParams, ReturnParams } from './interfaces'
import config from './config'

/**
* @function snImagePhash
* @description Perceptual hash calculation, currently implementing http://blockhash.io/
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (Return binary representation of phash 0011101011) and decoder function
*/
export default async function snImagePhash (params: InputParams): Promise<ReturnParams> {
  console.log('we have 1 child ops')
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    // start implementation here
    console.log('snImagePhash', params)
    const data = params[inputLength - 1]
    return {
      data: data.data,
      decode: () => 'CHANGE_ME'
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

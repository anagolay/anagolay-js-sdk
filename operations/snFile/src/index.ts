import { bufferToU8a } from '@polkadot/util'
import { SnForWhat } from '@sensio/types'
import { readFileSync } from 'fs'
import config from './config'
import { InputParams, ReturnParams } from './interfaces'

/**
 * @function snFile
 * @description Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.
 * @param {InputParams} params InputParams
 * @return {Promise<ReturnParams>} output (Returns the File Buffer.) and decoder function
 */
export async function snFile (params: InputParams): Promise<ReturnParams> {
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    const data = params[inputLength - 1]
    const file = readFileSync(data.data)

    return {
      data: bufferToU8a(file),
      decode: () => file
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}
export default snFile

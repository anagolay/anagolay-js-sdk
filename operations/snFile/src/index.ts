import { SnByteArray, SnFileBuffer, SnReturnParams } from '@sensio/types'

interface InputParams {
  childrenOutputs?: SnReturnParams[]
  file: SnByteArray
}

interface ReturnParams extends SnReturnParams {
  output: SnByteArray
  decode: () => SnFileBuffer
}

/**
* @function snFile
* @description RAW file buffer for other ops to use.
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (Returns the File Buffer.) and decoder function
*/
export default async function snFile (params: InputParams): Promise<ReturnParams> {
  const { file } = params
  return {
    output: Buffer.from(file),
    decode: () => Buffer.from(file)
  }
}

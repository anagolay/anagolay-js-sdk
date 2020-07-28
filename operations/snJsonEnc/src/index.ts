import { stringToU8a } from '@polkadot/util'
import { SnAny, SnByteArray, SnReturnParams, SnString } from '@sensio/types'

interface InputParams {
  childrenOutputs?: SnReturnParams[]
  data: SnAny
}

interface ReturnParams extends SnReturnParams {
  output: SnByteArray
  decode: () => SnString
}

/**
* @function snJsonEnc
* @description Wrapper of JSON.stringify().
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (Returns SnByteArray of json string.) and decoder function
*/
export default async function snJsonEnc (params: InputParams): Promise<ReturnParams> {
  const { data } = params
  const val = JSON.stringify(data)
  return {
    output: stringToU8a(val),
    decode: () => val
  }
}

import { u8aToString, u8aToU8a } from '@polkadot/util'
import { SnAny, SnByteArray, SnReturnParams } from '@sensio/types'

interface InputParams {
  childrenOutputs?: SnReturnParams[]
  data: SnByteArray
}

interface ReturnParams extends SnReturnParams {
  output: SnAny
  decode: () => SnAny
}

/**
* @function snJsonDec
* @description Wrapper of JSON.parse()
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output () and decoder function
*/
export default async function snJsonDec (params: InputParams): Promise<ReturnParams> {
  const { data } = params

  const val = JSON.parse(u8aToString(data))

  return {
    output: u8aToU8a(val),
    decode: () => val
  }
}

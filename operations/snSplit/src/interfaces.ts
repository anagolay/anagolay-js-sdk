
import { SnInputParamsImplementation, SnSplitParams, SnByteArray, SnProofParams } from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SnProofParams[] // value of `data.output.decoded`
}

export interface InputParam0 extends SnInputParamsImplementation {
  data: SnByteArray
  decode: () => SnSplitParams
}
export type InputParams = [ InputParam0 ]

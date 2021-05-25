import {
  AnByteArray,
  AnInputParamsImplementation,
  AnProofParams,
  AnSplitParams,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnProofParams[] // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnSplitParams
}
export type InputParams = [InputParam0]

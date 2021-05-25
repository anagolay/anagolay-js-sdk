import {
  AnAnagolayClaim,
  AnAnagolaySignatures,
  AnByteArray,
  AnInputParamsImplementation,
  AnSigner,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => [AnAnagolayClaim[], AnAnagolaySignatures[]] // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnAnagolayClaim[]
}
export interface InputParam1 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnSigner
}
export type InputParams = [InputParam0, InputParam1]

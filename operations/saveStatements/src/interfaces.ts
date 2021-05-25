import {
  AnAnagolayClaim,
  AnAnagolaySignatures,
  AnByteArray,
  AnInputParamsImplementation,
  SaveStatementReturn,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => SaveStatementReturn[] // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnAnagolayClaim[]
}
export interface InputParam1 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnAnagolaySignatures[]
}
export type InputParams = [InputParam0, InputParam1]

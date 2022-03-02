import {
  AnByteArray,
  AnFileBuffer,
  AnInputParamsImplementation,
  StringOrBuffer,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnFileBuffer // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: StringOrBuffer
  decode: () => StringOrBuffer
}
export type InputParams = [InputParam0]

import {
  SnInputParamsImplementation,
  StringOrBuffer,
  SnByteArray,
  SnFileBuffer,
} from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SnFileBuffer // value of `data.output.decoded`
}

export interface InputParam0 extends SnInputParamsImplementation {
  data: StringOrBuffer
  decode: () => StringOrBuffer
}
export type InputParams = [InputParam0]

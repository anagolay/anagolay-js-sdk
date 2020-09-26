import { SnInputParamsImplementation, SnAny, SnByteArray, SnString } from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SnString // value of `data.output.decoded`
}

export interface InputParam0 extends SnInputParamsImplementation {
  data: SnAny
  decode: () => SnAny
}
export type InputParams = [InputParam0]

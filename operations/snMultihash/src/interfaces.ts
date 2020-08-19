
import { SnInputParamsImplementation, SnAny, SnByteArray, SnBuffer } from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SnBuffer // value of `data.output.decoded`
}

export interface InputParam0 extends SnInputParamsImplementation {
  data: SnByteArray
  decode: () => SnAny
}
export type InputParams = [ InputParam0 ]

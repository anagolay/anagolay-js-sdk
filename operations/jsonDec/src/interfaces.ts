import { AnAny, AnByteArray, AnInputParamsImplementation } from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnAny // value of `data.output.output`
  decode: () => AnAny // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnAny
}
export type InputParams = [InputParam0]

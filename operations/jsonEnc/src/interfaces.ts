import { AnAny, AnByteArray, AnInputParamsImplementation, AnString } from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnString // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnAny
  decode: () => AnAny
}
export type InputParams = [InputParam0]

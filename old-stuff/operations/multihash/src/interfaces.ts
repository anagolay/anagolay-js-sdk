import { AnByteArray, AnInputParamsImplementation } from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnByteArray // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnByteArray
}
export type InputParams = [InputParam0]

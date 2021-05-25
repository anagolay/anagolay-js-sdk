import {
  AnByteArray,
  AnFileBuffer,
  AnImageData,
  AnInputParamsImplementation,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnImageData // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnFileBuffer
}
export type InputParams = [InputParam0]

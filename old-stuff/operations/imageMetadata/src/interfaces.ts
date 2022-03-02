import {
  AnByteArray,
  AnFileBuffer,
  AnImageMetadata,
  AnInputParamsImplementation,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnImageMetadata // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnFileBuffer
}
export type InputParams = [InputParam0]

import {
  AnByteArray,
  AnGenericId,
  AnImageMetadata,
  AnInputParamsImplementation,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnGenericId // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnImageMetadata
}
export type InputParams = [InputParam0]

import {
  SnInputParamsImplementation,
  SnImageMetadata,
  SnByteArray,
  SnGenericId,
} from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SnGenericId // value of `data.output.decoded`
}

export interface InputParam0 extends SnInputParamsImplementation {
  data: SnByteArray
  decode: () => SnImageMetadata
}
export type InputParams = [InputParam0]

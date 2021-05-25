import {
  AnByteArray,
  AnGenericIds,
  AnInputParamsImplementation,
  AnOwnershipClaims,
} from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnByteArray // value of `data.output.output`
  decode: () => AnOwnershipClaims // value of `data.output.decoded`
}

export interface InputParam0 extends AnInputParamsImplementation {
  data: AnByteArray
  decode: () => AnGenericIds
}
export type InputParams = [InputParam0]

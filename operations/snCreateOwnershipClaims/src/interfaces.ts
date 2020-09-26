import {
  SnByteArray,
  SnGenericIds,
  SnInputParamsImplementation,
  SnOwnershipClaims,
} from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SnOwnershipClaims // value of `data.output.decoded`
}

export interface InputParam0 extends SnInputParamsImplementation {
  data: SnByteArray
  decode: () => SnGenericIds
}
export type InputParams = [InputParam0]

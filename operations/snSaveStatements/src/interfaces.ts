import {
  SnByteArray,
  SnGenericIds,
  SnInputParamsImplementation,
  SnSensioClaim,
  SnSensioSignatures,
} from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SnGenericIds // value of `data.output.decoded`
}

export interface InputParam0 extends SnInputParamsImplementation {
  data: SnByteArray
  decode: () => SnSensioClaim[]
}
export interface InputParam1 extends SnInputParamsImplementation {
  data: SnByteArray
  decode: () => SnSensioSignatures[]
}
export type InputParams = [InputParam0, InputParam1]

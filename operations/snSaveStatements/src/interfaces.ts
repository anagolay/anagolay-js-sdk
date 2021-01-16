import {
  SnInputParamsImplementation,
  SnSensioClaim,
  SnSensioSignatures,
  SnByteArray,
  SaveStatementReturn,
} from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnByteArray // value of `data.output.output`
  decode: () => SaveStatementReturn[] // value of `data.output.decoded`
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

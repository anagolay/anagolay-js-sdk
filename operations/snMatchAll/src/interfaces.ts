
import { SnInputParamsImplementation, SnBoolean } from '@sensio/types'

export interface ReturnParams extends SnInputParamsImplementation {
  data: SnBoolean // value of `data.output.output`
  decode: () => SnBoolean // value of `data.output.decoded`
}

export type InputParams = SnInputParamsImplementation [ ]

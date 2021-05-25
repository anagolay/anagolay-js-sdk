import { AnBoolean, AnInputParamsImplementation } from '@anagolay/types'

export interface ReturnParams extends AnInputParamsImplementation {
  data: AnBoolean // value of `data.output.output`
  decode: () => AnBoolean // value of `data.output.decoded`
}

export type InputParams = AnInputParamsImplementation[]

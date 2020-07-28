import { SnProofParams as OriginalSnProofParams } from './interfaces/poe/interfaces'
import { SnSensioStatement } from './interfaces/statements/interfaces'

export type SnBuffer = Buffer
export type SnByteArray = Uint8Array
export type SnFileBuffer = Buffer
export type SnStatement = SnSensioStatement
export type SnStatements = SnSensioStatement[]
export type SnProofParams = OriginalSnProofParams
export type SnBoolean = boolean
export type SnString = string
export type SnAny = any // TODO: SnByteArray | SnStatement | SnStatements ... any sensio type
export interface SnReturnParams {
  output: any
  decode: () => any
}
export * from './interfaces/operations/interfaces'
export * from './interfaces/poe/interfaces'
export * from './interfaces/rules/interfaces'
export * from './interfaces/sensio/interfaces'
export * from './interfaces/statements/interfaces'

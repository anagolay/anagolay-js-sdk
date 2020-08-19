import { ExpandedTags } from 'exifreader'
import { SnProofParams as OriginalSnProofParams } from './interfaces/poe/interfaces'
import { SnSensioStatement } from './interfaces/statements/interfaces'
export type output =
  | 'SnByteArray'
  | 'SnProofParams[]'
  | 'SnBoolean'
  | 'SnString'
  | 'SnAny'

export type outputDecoded =
  | 'SnBuffer'
  | 'SnByteArray'
  | 'SnFileBuffer'
  | 'SnStatement'
  | 'SnStatements'
  | 'SnProofParams'
  | 'SnProofParams[]'
  | 'SnString'
  | 'SnAny'
  | 'SnImageMetadata'
  | 'SnSplitParams'
  | 'SnGenericId'
  | 'SnBoolean'
  | 'SnNull'

export type outputImplementation =
  | SnByteArray
  | SnBoolean
  | SnProofParams[]
  | SnString

export type outputDecodedImplementation =
  | SnBuffer
  | SnByteArray
  | SnFileBuffer
  | SnStatement
  | SnStatements
  | SnProofParams
  | SnBoolean
  | SnString
  | SnAny
  | SnImageMetadata

export interface ExifFile {
  'Bits Per Sample': {
    value: number
    description: string
  }
  'Image Height': {
    value: number
    description: string
  }
  'Image Width': {
    value: number
    description: string
  }
  'Color Components': {
    value: number
    description: string
  }
  Subsampling: {
    value: number[]
    description: string
  }
}
export interface SnImageMetadata extends ExpandedTags {
  file: ExifFile
}

export type SnBuffer = Buffer
export type SnByteArray = Uint8Array
export type SnFileBuffer = Buffer
export type SnStatement = SnSensioStatement
export type SnStatements = SnSensioStatement[]
export type SnProofParams = OriginalSnProofParams
export type SnBoolean = boolean
export type SnString = string
export type SnAny = any // TODO: SnByteArray | SnStatement | SnStatements ... any sensio type
export type SnNull = null

export interface SnSplitParams {
  data: SnInputParamsImplementation[]
  opName: SnString
}

/**
 * This interface is used for implementation purpose
 */
export interface SnInputParamsImplementation {
  data: outputImplementation
  decode: () => outputDecodedImplementation
}

/**
 * This interface is used for definition
 */
export interface SnInputParamsDefinition {
  data: output
  decoded: outputDecoded
}

export * from './interfaces/operations/interfaces'
export * from './interfaces/poe/interfaces'
export * from './interfaces/rules/interfaces'
export * from './interfaces/sensio/interfaces'
export * from './interfaces/statements/interfaces'

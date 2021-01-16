import ImageMetadataTags from './imageMetadata'
import { SnProofParams as OriginalSnProofParams } from './interfaces/poe/interfaces'
import { SnGenericId } from './interfaces/sensio/interfaces'
import {
  SnSensioCopyrightClaim,
  SnSensioOwnershipClaim,
  SnSensioStatement,
} from './interfaces/statements/interfaces'

export interface SaveStatementReturn {
  statement_id: SnGenericId
  poe_id: SnGenericId
}

export type output =
  | 'SnByteArray'
  | 'SnProofParams[]'
  | 'SnBoolean'
  | 'SnString'
  | 'SnAny'
  | 'StringOrBuffer'

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
  | 'SnImageData'
  | 'SnOwnershipClaims'
  | 'SnCopyrightClaims'
  | 'SnGenericIds'
  | 'SnSensioClaim[]'
  | 'SnSensioSignatures[]'
  | 'SnSigner'
  | '[SnSensioClaim[],SnSensioSignatures[]]'
  | 'StringOrBuffer'
  | 'SaveStatementReturn[]'

export type outputImplementation = SnByteArray | SnBoolean | SnProofParams[] | SnString

/**
 * ATM workaround for the potential OR incoming params
 */
export type StringOrBuffer = SnString | SnBuffer

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
  | SnImageData

/**
 * This should be correct signer interfaces, ATM is just any type but it should be a defined interface with `.sign()` method. For now it's KeyringPair
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SnSigner = any

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

export interface SnImageMetadata extends ImageMetadataTags {
  file: ExifFile
}

export type SnGenericIds = SnGenericId[]
export type SnBuffer = Buffer
export type SnByteArray = Uint8Array
export type SnFileBuffer = Buffer
export type SnStatement = SnSensioStatement
export type SnStatements = SnSensioStatement[]
export type SnCopyrightClaims = SnSensioCopyrightClaim[]
export type SnOwnershipClaims = SnSensioOwnershipClaim[]
export type SnProofParams = OriginalSnProofParams
export type SnBoolean = boolean
export type SnString = string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SnAny = any // @TODO: SnByteArray | SnStatement | SnStatements ... any sensio type
export type SnNull = null

export interface SnImageData {
  width: number
  height: number
  data: Uint8Array | Uint8ClampedArray | number[]
}

// export type SnImageData = SnBuffer

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

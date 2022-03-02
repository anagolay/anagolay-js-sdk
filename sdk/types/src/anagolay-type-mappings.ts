import ImageMetadataTags from './imageMetadata';
import { AnGenericId } from './interfaces/anagolay/interfaces';
import { AnProofParams as OriginalSnProofParams } from './interfaces/poe/interfaces';
import {
  AnAnagolayCopyrightClaim,
  AnAnagolayOwnershipClaim,
  AnAnagolayStatement,
} from './interfaces/statements/interfaces';

export interface SaveStatementReturn {
  statement_id: AnGenericId;
  poe_id: AnGenericId;
}

export type output =
  | 'AnByteArray'
  | 'AnProofParams[]'
  | 'AnBoolean'
  | 'AnString'
  | 'AnAny'
  | 'StringOrBuffer';

export type outputDecoded =
  | 'AnBuffer'
  | 'AnByteArray'
  | 'AnFileBuffer'
  | 'AnStatement'
  | 'AnStatements'
  | 'AnProofParams'
  | 'AnProofParams[]'
  | 'AnString'
  | 'AnAny'
  | 'AnImageMetadata'
  | 'AnSplitParams'
  | 'AnGenericId'
  | 'AnBoolean'
  | 'AnNull'
  | 'AnImageData'
  | 'AnOwnershipClaims'
  | 'AnCopyrightClaims'
  | 'AnGenericIds'
  | 'AnAnagolayClaim[]'
  | 'AnAnagolaySignatures[]'
  | 'AnSigner'
  | '[AnAnagolayClaim[],AnAnagolaySignatures[]]'
  | 'StringOrBuffer'
  | 'SaveStatementReturn[]';

export type outputImplementation = AnByteArray | AnBoolean | AnProofParams[] | AnString;

/**
 * ATM workaround for the potential OR incoming params
 */
export type StringOrBuffer = AnString | AnBuffer;

export type outputDecodedImplementation =
  | AnBuffer
  | AnByteArray
  | AnFileBuffer
  | AnStatement
  | AnStatements
  | AnProofParams
  | AnBoolean
  | AnString
  | AnAny
  | AnImageMetadata
  | AnImageData;

/**
 * This should be correct signer interfaces, ATM is just any type but it should be a defined interface with `.sign()` method. For now it's KeyringPair
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnSigner = any;

export interface ExifFile {
  'Bits Per Sample': {
    value: number;
    description: string;
  };
  'Image Height': {
    value: number;
    description: string;
  };
  'Image Width': {
    value: number;
    description: string;
  };
  'Color Components': {
    value: number;
    description: string;
  };
  Subsampling: {
    value: number[];
    description: string;
  };
}

export interface AnImageMetadata extends ImageMetadataTags {
  file: ExifFile;
}

export type AnGenericIds = AnGenericId[];
export type AnBuffer = Buffer;
export type AnByteArray = Uint8Array;
export type AnFileBuffer = Buffer;
export type AnStatement = AnAnagolayStatement;
export type AnStatements = AnAnagolayStatement[];
export type AnCopyrightClaims = AnAnagolayCopyrightClaim[];
export type AnOwnershipClaims = AnAnagolayOwnershipClaim[];
export type AnProofParams = OriginalSnProofParams;
export type AnBoolean = boolean;
export type AnString = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnAny = any; // @TODO: AnByteArray | AnStatement | AnStatements ... any anagolay type

// eslint-disable-next-line @rushstack/no-new-null
export type AnNull = null;

export interface AnImageData {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray | number[];
}

// export type AnImageData = AnBuffer

export interface AnSplitParams {
  data: AnInputParamsImplementation[];
  opName: AnString;
}

/**
 * This interface is used for implementation purpose
 */
export interface AnInputParamsImplementation {
  data: outputImplementation;
  decode: () => outputDecodedImplementation;
}

/**
 * This interface is used for definition
 */
export interface AnInputParamsDefinition {
  data: output;
  decoded: outputDecoded;
}

export * from './interfaces/anagolay/interfaces';
export * from './interfaces/operations/interfaces';
export * from './interfaces/poe/interfaces';
export * from './interfaces/rules/interfaces';
export * from './interfaces/statements/interfaces';

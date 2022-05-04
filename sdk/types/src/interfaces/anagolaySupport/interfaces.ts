/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */
export type AnGenericId = string;
export type AnCharacters = string;
export type AnCreatorId = AnCharacters;
export type AnArtifactId = AnGenericId;
export type AnOperationId = AnGenericId;
export type AnWorkflowId = AnGenericId;
export type AnVersionId = AnGenericId;

export type AnAccountId = string;
export type AnBlockNumber = number;

export enum AnForWhat {
  'GENERIC',
  'PHOTO',
  'CAMERA',
  'LENS',
  'SMARTPHONE',
  'USER',
  'SYS',
  'FLOWCONTROL',
}

export enum AnWasmArtifactSubType {
  'Cjs',
  'Esm',
  'Wasm',
  'Web',
}

export interface AnAnagolayVersionExtra {
  createdAt: number;
}

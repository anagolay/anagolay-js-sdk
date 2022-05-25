// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Struct, u64 } from '@polkadot/types-codec';

/** @name AnagolayVersionExtra */
export interface AnagolayVersionExtra extends Struct {
  readonly createdAt: u64;
}

/** @name ArtifactId */
export interface ArtifactId extends GenericId {}

/** @name Characters */
export interface Characters extends Bytes {}

/** @name CreatorId */
export interface CreatorId extends Characters {}

/** @name ForWhat */
export interface ForWhat extends Enum {
  readonly isGeneric: boolean;
  readonly isPhoto: boolean;
  readonly isCamera: boolean;
  readonly isLens: boolean;
  readonly isSmartphone: boolean;
  readonly isUser: boolean;
  readonly isSys: boolean;
  readonly isFlowcontrol: boolean;
  readonly type: 'Generic' | 'Photo' | 'Camera' | 'Lens' | 'Smartphone' | 'User' | 'Sys' | 'Flowcontrol';
}

/** @name GenericId */
export interface GenericId extends Bytes {}

/** @name OperationId */
export interface OperationId extends GenericId {}

/** @name VersionId */
export interface VersionId extends GenericId {}

/** @name WasmArtifactSubType */
export interface WasmArtifactSubType extends Enum {
  readonly isCjs: boolean;
  readonly isEsm: boolean;
  readonly isWasm: boolean;
  readonly isWeb: boolean;
  readonly type: 'Cjs' | 'Esm' | 'Wasm' | 'Web';
}

/** @name WorkflowId */
export interface WorkflowId extends GenericId {}

export type PHANTOM_ANAGOLAYSUPPORT = 'anagolaySupport';

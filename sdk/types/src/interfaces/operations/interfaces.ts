/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import {
  AnAccountId,
  AnAnagolayVersionExtra,
  AnArtifactId,
  AnBlockNumber,
  AnCharacters,
  AnForWhat,
  AnTypeName,
  AnWasmArtifactSubType,
} from '../anagolaySupport/interfaces';

export interface AnOperationData {
  name: AnCharacters;
  description: AnCharacters;
  inputs: AnTypeName[];
  config: Map<AnCharacters, AnCharacters[]>;
  groups: AnForWhat[];
  output: AnTypeName;
  repository: AnCharacters;
  license: AnCharacters;
  features: AnCharacters[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnOperationExtra = Record<string, any>;

export type AnOperationId = string;

export interface AnOperation {
  id: AnOperationId;
  data: AnOperationData;
  extra?: AnOperationExtra;
}

export interface AnOperationRecord {
  record: AnOperation;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

export interface AnOperationWithStorage {
  storageKey: string;
  operationInfo: AnOperationRecord;
}

// Operation Version

export interface AnOperationArtifactType {
  Docs: undefined;
  Git: undefined;
  Wasm: AnWasmArtifactSubType;
}

export interface AnOperationArtifactStructure {
  artifactType: AnOperationArtifactType;
  fileExtension: AnCharacters;
  ipfsCid: AnArtifactId;
}

export type AnOperationVersionId = string;

/**
 * Version data. It contains all the needed parameters which define the entity Version and is hashed to produce the Version id
 */
export interface AnOperationVersionData {
  entityId?: AnOperationId;
  parentId?: AnOperationVersionId;
  artifacts: AnOperationArtifactStructure[];
}

export interface AnOperationVersion {
  id: AnOperationVersionId;
  data: AnOperationVersionData;
  extra?: AnAnagolayVersionExtra;
}

export interface AnOperationVersionRecord {
  record: AnOperationVersion;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

export interface AnOperationVersionExtra {
  createdAt: number;
}

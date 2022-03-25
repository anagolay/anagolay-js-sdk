/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import { AnBoolean } from '../..';
import {
  AnAccountId,
  AnAnagolayVersionExtra,
  AnBlockNumber,
  AnCharacters,
  AnDocsArtifactSubType,
  AnForWhat,
  AnGenericId,
  AnOperationId,
  AnVersionId,
  AnWasmArtifactSubType,
} from '../anagolay-support/interfaces';

export type AnTypeName = string;

export interface AnOperationData {
  name: AnCharacters;
  description: AnCharacters;
  inputs: AnTypeName[];
  config: Map<AnCharacters, AnCharacters[]>;
  groups: AnForWhat[];
  output: AnTypeName;
  repository: AnCharacters;
  license: AnCharacters;
  nostd: AnBoolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnOperationExtra = Record<string, any>;

export interface AnOperation {
  id: AnGenericId;
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

export type AnOperationArtifactType = {
  CRATE: null;
  WASM: AnWasmArtifactSubType;
  DOCS: AnDocsArtifactSubType;
  GIT: null;
};

export type AnOperationArtifactStructure = {
  artifactType: AnOperationArtifactType;
  ipfsCid: AnGenericId;
};

export type AnOperationVersionData = {
  entityId: AnOperationId;
  parentId?: AnVersionId;
  artifacts: AnOperationArtifactStructure[];
};

export interface AnOperationVersion {
  id: AnVersionId;
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

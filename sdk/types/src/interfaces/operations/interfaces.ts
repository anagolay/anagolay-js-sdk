/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import { AnBoolean } from '../..';
import { AnAccountId, AnBlockNumber, AnForWhat, AnGenericId } from '../anagolay/interfaces';

export type AnTypeName = string;

/// Alias for string
export type AnCharacters = string;

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

export interface AnOperationData {
  name: AnCharacters;
  description: AnCharacters;
  inputs: AnTypeName[];
  output: AnTypeName;
  repository: AnCharacters;
  license: AnCharacters;
  groups: AnForWhat[];
  config: Map<AnCharacters, AnCharacters[]>;
  nostd: AnBoolean;
}

// Operation Version

export interface AnOperationVersion {
  id: AnGenericId;
  data: AnOperationVersionData;
  extra?: AnOperationVersionExtra;
}

export interface AnOperationVersionRecord {
  record: AnOperationVersion;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

export interface AnOperationVersionExtra {
  createdAt: number;
}

export interface AnOperationVersionPackage {
  packageType: AnPackageType;
  fileUrl: AnCharacters;
  ipfsCid: AnGenericId;
}

export interface AnOperationVersionData {
  operationId: AnGenericId;
  parentId: AnGenericId;
  documentationId: AnGenericId;
  rehostedRepoId: AnGenericId;
  packages: AnOperationVersionPackage[];
}

// the order is VERY important, must be the SAME as in the rust code. remember what SCALE abbreviates
export enum AnPackageType {
  'CRATE',
  'CJS',
  'WASM',
  'ESM',
  'WEB',
}

export type AnOperationId = AnGenericId;
export type AnVersionId = AnGenericId;
export type AnPackageId = AnGenericId;

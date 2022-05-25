/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import {
  AnAccountId,
  AnAnagolayVersionExtra,
  AnBlockNumber,
  AnCharacters,
  AnCreatorId,
  AnForWhat,
  AnGenericId,
  AnVersionId,
  AnWasmArtifactSubType,
  AnWorkflowId,
} from '../anagolaySupport/interfaces';

// Workflow

export interface AnOperationVersionReference {
  versionId: AnVersionId;
  config: Map<AnCharacters, AnCharacters>;
}

export interface AnWorkflowSegment {
  inputs: number[];
  sequence: AnOperationVersionReference[];
}

export interface AnWorkflowData {
  name: AnCharacters;
  creators: AnCreatorId[];
  description: AnCharacters;
  groups: AnForWhat[];
  segments: AnWorkflowSegment[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnWorkflowExtra = Record<string, any>;

export interface AnWorkflow {
  id: AnWorkflowId;
  data: AnWorkflowData;
  extra?: AnWorkflowExtra;
}
export interface AnWorkflowRecord {
  record: AnWorkflow;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

// Workflow Version

export interface AnWorkflowArtifactType {
  Docs: undefined;
  Git: undefined;
  Wasm: AnWasmArtifactSubType;
}

export interface AnWorkflowArtifactStructure {
  artifactType: AnWorkflowArtifactType;
  fileExtension: AnCharacters;
  ipfsCid: AnGenericId;
}

export interface AnWorkflowVersionData {
  entityId?: AnWorkflowId;
  parentId?: AnVersionId;
  artifacts: AnWorkflowArtifactStructure[];
}

export interface AnWorkflowVersion {
  id: AnVersionId;
  data: AnWorkflowVersionData;
  extra?: AnAnagolayVersionExtra;
}

export interface AnWorkflowVersionRecord {
  record: AnWorkflowVersion;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

export interface AnWorkflowVersionExtra {
  createdAt: number;
}

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
  AnDocsArtifactSubType,
  AnForWhat,
  AnGenericId,
  AnVersionId,
  AnWasmArtifactSubType,
  AnWorkflowId,
} from '../anagolaySupport/interfaces';

// Workflow

export interface AnOperationVersionReference {
  operation_version_id: AnVersionId;
  config: Map<AnCharacters, AnCharacters[]>;
}

export interface AnWorkflowSegment {
  input: number[];
  sequence: AnOperationVersionReference[];
}

export interface AnWorkflowData {
  name: AnCharacters;
  creator: AnCreatorId;
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
  CRATE: undefined;
  WASM: AnWasmArtifactSubType;
  DOCS: AnDocsArtifactSubType;
  GIT: undefined;
}

export interface AnWorkflowArtifactStructure {
  artifactType: AnWorkflowArtifactType;
  ipfsCid: AnGenericId;
}

export interface AnWorkflowVersionData {
  entityId: AnWorkflowId;
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

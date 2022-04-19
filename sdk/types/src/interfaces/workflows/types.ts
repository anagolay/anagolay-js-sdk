// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type {
  AnagolayVersionExtra,
  Characters,
  CreatorId,
  DocsArtifactSubType,
  ForWhat,
  GenericId,
  VersionId,
  WasmArtifactSubType,
  WorkflowId,
} from '@anagolay/types/interfaces/anagolaySupport';
import type { BTreeMap, Bytes, Enum, Option, Struct, Vec } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name OperationVersionReference */
export interface OperationVersionReference extends Struct {
  readonly version_id: VersionId;
  readonly config: BTreeMap<Characters, Vec<Characters>>;
}

/** @name Workflow */
export interface Workflow extends Struct {
  readonly id: WorkflowId;
  readonly data: WorkflowData;
  readonly extra: Option<WorkflowExtra>;
}

/** @name WorkflowArtifactStructure */
export interface WorkflowArtifactStructure extends Struct {
  readonly artifactType: WorkflowArtifactType;
  readonly fileExtension: Characters;
  readonly ipfsCid: GenericId;
}

/** @name WorkflowArtifactType */
export interface WorkflowArtifactType extends Enum {
  readonly isCrate: boolean;
  readonly isWasm: boolean;
  readonly asWasm: WasmArtifactSubType;
  readonly isDocs: boolean;
  readonly asDocs: DocsArtifactSubType;
  readonly isGit: boolean;
  readonly type: 'Crate' | 'Wasm' | 'Docs' | 'Git';
}

/** @name WorkflowData */
export interface WorkflowData extends Struct {
  readonly name: Characters;
  readonly creators: Vec<CreatorId>;
  readonly description: Characters;
  readonly groups: Vec<ForWhat>;
  readonly segments: Vec<WorkflowSegment>;
  readonly version: Characters;
}

/** @name WorkflowExtra */
export interface WorkflowExtra extends Struct {}

/** @name WorkflowRecord */
export interface WorkflowRecord extends Struct {
  readonly record: Workflow;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name WorkflowSegment */
export interface WorkflowSegment extends Struct {
  readonly inputs: Bytes;
  readonly sequence: Vec<OperationVersionReference>;
}

/** @name WorkflowVersion */
export interface WorkflowVersion extends Struct {
  readonly id: VersionId;
  readonly data: WorkflowVersionData;
  readonly extra: Option<AnagolayVersionExtra>;
}

/** @name WorkflowVersionData */
export interface WorkflowVersionData extends Struct {
  readonly entityId: Option<WorkflowId>;
  readonly parentId: Option<VersionId>;
  readonly artifacts: Vec<WorkflowArtifactStructure>;
}

/** @name WorkflowVersionRecord */
export interface WorkflowVersionRecord extends Struct {
  readonly record: WorkflowVersion;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

export type PHANTOM_WORKFLOWS = 'workflows';

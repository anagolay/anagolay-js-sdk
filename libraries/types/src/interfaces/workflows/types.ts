// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type {
  AnagolayVersionExtra,
  ArtifactId,
  Characters,
  CreatorId,
  ForWhat,
  WasmArtifactSubType,
} from '@anagolay/types/interfaces/anagolaySupport';
import type { OperationVersionId } from '@anagolay/types/interfaces/operations';
import type { BTreeMap, Enum, Option, Struct, Vec, i8 } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name OperationVersionReference */
export interface OperationVersionReference extends Struct {
  readonly versionId: OperationVersionId;
  readonly config: BTreeMap<Characters, Characters>;
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
  readonly ipfsCid: ArtifactId;
}

/** @name WorkflowArtifactType */
export interface WorkflowArtifactType extends Enum {
  readonly isDocs: boolean;
  readonly isGit: boolean;
  readonly isWasm: boolean;
  readonly asWasm: WasmArtifactSubType;
  readonly type: 'Docs' | 'Git' | 'Wasm';
}

/** @name WorkflowData */
export interface WorkflowData extends Struct {
  readonly name: Characters;
  readonly creators: Vec<CreatorId>;
  readonly description: Characters;
  readonly groups: Vec<ForWhat>;
  readonly segments: Vec<WorkflowSegment>;
}

/** @name WorkflowExtra */
export interface WorkflowExtra extends Struct {}

/** @name WorkflowId */
export interface WorkflowId extends Struct {}

/** @name WorkflowRecord */
export interface WorkflowRecord extends Struct {
  readonly record: Workflow;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name WorkflowSegment */
export interface WorkflowSegment extends Struct {
  readonly inputs: Vec<i8>;
  readonly sequence: Vec<OperationVersionReference>;
}

/** @name WorkflowVersion */
export interface WorkflowVersion extends Struct {
  readonly id: WorkflowVersionId;
  readonly data: WorkflowVersionData;
  readonly extra: Option<AnagolayVersionExtra>;
}

/** @name WorkflowVersionData */
export interface WorkflowVersionData extends Struct {
  readonly entityId: Option<WorkflowId>;
  readonly parentId: Option<WorkflowVersionId>;
  readonly artifacts: Vec<WorkflowArtifactStructure>;
}

/** @name WorkflowVersionId */
export interface WorkflowVersionId extends Struct {}

/** @name WorkflowVersionRecord */
export interface WorkflowVersionRecord extends Struct {
  readonly record: WorkflowVersion;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

export type PHANTOM_WORKFLOWS = 'workflows';

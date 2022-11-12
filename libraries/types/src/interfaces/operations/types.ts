// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type {
  AnagolayVersionExtra,
  ArtifactId,
  Characters,
  ForWhat,
  TypeName,
  WasmArtifactSubType
} from '@anagolay/types/interfaces/anagolaySupport';
import type { BTreeMap, Enum, Option, Struct, Vec } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name Operation */
export interface Operation extends Struct {
  readonly id: OperationId;
  readonly data: OperationData;
  readonly extra: Option<OperationExtra>;
}

/** @name OperationArtifactStructure */
export interface OperationArtifactStructure extends Struct {
  readonly artifactType: OperationArtifactType;
  readonly fileExtension: Characters;
  readonly ipfsCid: ArtifactId;
}

/** @name OperationArtifactType */
export interface OperationArtifactType extends Enum {
  readonly isDocs: boolean;
  readonly isGit: boolean;
  readonly isWasm: boolean;
  readonly asWasm: WasmArtifactSubType;
  readonly type: 'Docs' | 'Git' | 'Wasm';
}

/** @name OperationData */
export interface OperationData extends Struct {
  readonly name: Characters;
  readonly description: Characters;
  readonly inputs: Vec<TypeName>;
  readonly config: BTreeMap<Characters, Vec<Characters>>;
  readonly groups: Vec<ForWhat>;
  readonly output: TypeName;
  readonly repository: Characters;
  readonly license: Characters;
  readonly features: Vec<Characters>;
}

/** @name OperationExtra */
export interface OperationExtra extends Struct {}

/** @name OperationId */
export interface OperationId extends Struct {}

/** @name OperationRecord */
export interface OperationRecord extends Struct {
  readonly record: Operation;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name OperationVersion */
export interface OperationVersion extends Struct {
  readonly id: OperationVersionId;
  readonly data: OperationVersionData;
  readonly extra: Option<AnagolayVersionExtra>;
}

/** @name OperationVersionData */
export interface OperationVersionData extends Struct {
  readonly entityId: Option<OperationId>;
  readonly parentId: Option<OperationVersionId>;
  readonly artifacts: Vec<OperationArtifactStructure>;
}

/** @name OperationVersionId */
export interface OperationVersionId extends Struct {}

/** @name OperationVersionRecord */
export interface OperationVersionRecord extends Struct {
  readonly record: OperationVersion;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

export type PHANTOM_OPERATIONS = 'operations';

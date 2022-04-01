// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type {
  AnagolayVersionExtra,
  Characters,
  ForWhat,
  GenericId,
  OperationId,
  VersionId,
  WasmArtifactSubType,
} from '@anagolay/types/interfaces/anagolaySupport';
import type { BTreeMap, Bytes, Enum, Option, Struct, Vec, bool } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name Operation */
export interface Operation extends Struct {
  readonly id: GenericId;
  readonly data: OperationData;
  readonly extra: Option<OperationExtra>;
}

/** @name OperationArtifactStructure */
export interface OperationArtifactStructure extends Struct {
  readonly artifactType: OperationArtifactType;
  readonly fileExtension: Characters;
  readonly ipfsCid: GenericId;
}

/** @name OperationArtifactType */
export interface OperationArtifactType extends Enum {
  readonly isCrate: boolean;
  readonly isWasm: boolean;
  readonly asWasm: WasmArtifactSubType;
  readonly isDocs: boolean;
  readonly isGit: boolean;
  readonly type: 'Crate' | 'Wasm' | 'Docs' | 'Git';
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
  readonly nostd: bool;
}

/** @name OperationExtra */
export interface OperationExtra extends Struct {}

/** @name OperationRecord */
export interface OperationRecord extends Struct {
  readonly record: Operation;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name OperationVersion */
export interface OperationVersion extends Struct {
  readonly id: VersionId;
  readonly data: OperationVersionData;
  readonly extra: Option<AnagolayVersionExtra>;
}

/** @name OperationVersionData */
export interface OperationVersionData extends Struct {
  readonly entityId: Option<OperationId>;
  readonly parentId: Option<VersionId>;
  readonly artifacts: Vec<OperationArtifactStructure>;
}

/** @name OperationVersionRecord */
export interface OperationVersionRecord extends Struct {
  readonly record: OperationVersion;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name TypeName */
export interface TypeName extends Bytes {}

export type PHANTOM_OPERATIONS = 'operations';

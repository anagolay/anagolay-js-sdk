// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Characters, ForWhat, GenericId } from '@anagolay/types/interfaces/anagolay';
import type { BTreeMap, Bytes, Enum, Option, Struct, Vec, bool, u64 } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name Operation */
export interface Operation extends Struct {
  readonly id: GenericId;
  readonly data: OperationData;
  readonly extra: Option<OperationExtra>;
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

/** @name OperationId */
export interface OperationId extends GenericId {}

/** @name OperationRecord */
export interface OperationRecord extends Struct {
  readonly record: Operation;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name OperationVersion */
export interface OperationVersion extends Struct {
  readonly id: GenericId;
  readonly data: OperationVersionData;
  readonly extra: Option<OperationVersionExtra>;
}

/** @name OperationVersionData */
export interface OperationVersionData extends Struct {
  readonly operationId: GenericId;
  readonly parentId: Option<GenericId>;
  readonly documentationId: GenericId;
  readonly rehostedRepoId: GenericId;
  readonly packages: Vec<OperationVersionPackage>;
}

/** @name OperationVersionExtra */
export interface OperationVersionExtra extends Struct {
  readonly createdAt: u64;
}

/** @name OperationVersionPackage */
export interface OperationVersionPackage extends Struct {
  readonly packageType: PackageType;
  readonly fileUrl: Characters;
  readonly ipfsCid: GenericId;
}

/** @name OperationVersionRecord */
export interface OperationVersionRecord extends Struct {
  readonly record: OperationVersion;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name PackageId */
export interface PackageId extends GenericId {}

/** @name PackageType */
export interface PackageType extends Enum {
  readonly isCrate: boolean;
  readonly isCjs: boolean;
  readonly isWasm: boolean;
  readonly isEsm: boolean;
  readonly isWeb: boolean;
  readonly type: 'Crate' | 'Cjs' | 'Wasm' | 'Esm' | 'Web';
}

/** @name TypeName */
export interface TypeName extends Bytes {}

/** @name VersionId */
export interface VersionId extends GenericId {}

export type PHANTOM_OPERATIONS = 'operations';

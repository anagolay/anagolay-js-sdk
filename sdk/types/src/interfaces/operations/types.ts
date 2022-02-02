// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { BTreeMap, Bytes, Enum, Option, Struct, Vec } from '@polkadot/types';
import type { Characters, ForWhat, GenericId } from '@anagolay/types/interfaces/anagolay';
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
  readonly input: Vec<TypeName>;
  readonly config: BTreeMap<Characters, Vec<Characters>>;
  readonly groups: Vec<ForWhat>;
  readonly output: Vec<TypeName>;
  readonly repository: Characters;
  readonly license: Characters;
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
  readonly id: GenericId;
  readonly data: OperationVersionData;
  readonly extra: Option<OperationVersionDataExtra>;
}

/** @name OperationVersionData */
export interface OperationVersionData extends Struct {
  readonly operation_id: GenericId;
  readonly parent_id: GenericId;
  readonly rehosted_repo: Characters;
  readonly packages: Vec<OperationVersionPackage>;
}

/** @name OperationVersionDataExtra */
export interface OperationVersionDataExtra extends Struct {}

/** @name OperationVersionPackage */
export interface OperationVersionPackage extends Struct {
  readonly package_type: PackageType;
  readonly file_url: Characters;
  readonly ipfs_cid: GenericId;
}

/** @name OperationVersionRecord */
export interface OperationVersionRecord extends Struct {
  readonly record: OperationVersion;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name PackageType */
export interface PackageType extends Enum {
  readonly isCrate: boolean;
  readonly isWasm: boolean;
  readonly isEsm: boolean;
}

/** @name TypeName */
export interface TypeName extends Bytes {}

export type PHANTOM_OPERATIONS = 'operations';

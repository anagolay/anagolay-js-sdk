// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { CreatorId, ForWhat, GenericId } from '@anagolay/types/interfaces/anagolay';
import type { Bytes, Option, Struct, Vec, u32 } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name OperationReference */
export interface OperationReference extends Struct {
  readonly id: GenericId;
  readonly children: Vec<OperationReference>;
}

/** @name Rule */
export interface Rule extends Struct {
  readonly id: GenericId;
  readonly data: RuleData;
  readonly extra: Option<RuleExtra>;
}

/** @name RuleData */
export interface RuleData extends Struct {
  readonly version: u32;
  readonly name: Bytes;
  readonly desc: Bytes;
  readonly creator: CreatorId;
  readonly groups: Vec<ForWhat>;
  readonly parentId: GenericId;
  readonly ops: Vec<OperationReference>;
}

/** @name RuleExtra */
export interface RuleExtra extends Struct {}

/** @name RuleRecord */
export interface RuleRecord extends Struct {
  readonly rule: Rule;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

export type PHANTOM_RULES = 'rules';

// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { ForWhat, GenericId } from '@anagolay/types/interfaces/anagolaySupport';
import type { Bytes, Option, Struct, Vec } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name PhashInfo */
export interface PhashInfo extends Struct {
  readonly pHash: Bytes;
  readonly proofId: GenericId;
}

/** @name Proof */
export interface Proof extends Struct {
  readonly id: GenericId;
  readonly data: ProofData;
  readonly extra: Option<ProofExtra>;
}

/** @name ProofData */
export interface ProofData extends Struct {
  readonly ruleId: GenericId;
  readonly prevId: GenericId;
  readonly creator: CreatorId;
  readonly groups: Vec<ForWhat>;
  readonly params: Vec<ProofParams>;
}

/** @name ProofExtra */
export interface ProofExtra extends Struct {}

/** @name ProofParams */
export interface ProofParams extends Struct {
  readonly k: Bytes;
  readonly v: Bytes;
}

/** @name ProofRecord */
export interface ProofRecord extends Struct {
  readonly record: Proof;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

export type PHANTOM_POE = 'poe';

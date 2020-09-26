// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct, Vec } from '@polkadot/types/codec'
import { Bytes } from '@polkadot/types/primitive'
import { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime'
import { Rule } from '@sensio/types/interfaces/rules'
import { CreatorId, ForWhat, GenericId } from '@sensio/types/interfaces/sensio'

/** @name PhashInfo */
export interface PhashInfo extends Struct {
  readonly pHash: Bytes
  readonly proofId: GenericId
}

/** @name Proof */
export interface Proof extends Struct {
  readonly id: GenericId
  readonly data: ProofData
}

/** @name ProofData */
export interface ProofData extends Struct {
  readonly ruleId: GenericId
  readonly prevId: GenericId
  readonly creator: CreatorId
  readonly groups: Vec<ForWhat>
  readonly params: Vec<ProofParams>
}

/** @name ProofInfo */
export interface ProofInfo extends Struct {
  readonly proof: Proof
  readonly accountId: AccountId
  readonly blockNumber: BlockNumber
}

/** @name ProofParams */
export interface ProofParams extends Struct {
  readonly k: Bytes
  readonly v: Bytes
}

/** @name RuleInfo */
export interface RuleInfo extends Struct {
  readonly rule: Rule
  readonly accountId: AccountId
  readonly blockNumber: BlockNumber
}

export type PHANTOM_POE = 'poe'

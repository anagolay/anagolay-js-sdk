// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Characters, CreatorId, ForWhat } from '@anagolay/types/interfaces/anagolaySupport';
import type { VerificationContext } from '@anagolay/types/interfaces/verification';
import type { WorkflowId } from '@anagolay/types/interfaces/workflows';
import type { Bytes, Option, Struct, Vec } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name PhashInfo */
export interface PhashInfo extends Struct {
  readonly pHash: Bytes;
  readonly proofId: ProofId;
}

/** @name Proof */
export interface Proof extends Struct {
  readonly id: ProofId;
  readonly data: ProofData;
  readonly extra: Option<ProofExtra>;
}

/** @name ProofData */
export interface ProofData extends Struct {
  readonly workflowId: WorkflowId;
  readonly prevId: WorkflowId;
  readonly creator: CreatorId;
  readonly groups: Vec<ForWhat>;
  readonly params: Vec<Characters>;
  readonly context: VerificationContext;
}

/** @name ProofExtra */
export interface ProofExtra extends Struct {}

/** @name ProofId */
export interface ProofId extends Struct {}

/** @name ProofRecord */
export interface ProofRecord extends Struct {
  readonly record: Proof;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

export type PHANTOM_POE = 'poe';

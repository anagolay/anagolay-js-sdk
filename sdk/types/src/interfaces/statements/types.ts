// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Characters, CreatorId, GenericId, ProofId, SignatureId, StatementId, WorkflowId } from '@anagolay/types/interfaces/anagolaySupport';
import type { Bytes, Enum, Option, Struct } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name Claim */
export interface Claim extends Struct {
  readonly prevId: Option<StatementId>;
  readonly poeId: ProofId;
  readonly workflowId: WorkflowId;
  readonly proportion: Proportion;
  readonly subjectId: ProofId;
  readonly holder: CreatorId;
  readonly issuer: CreatorId;
  readonly claimType: ClaimType;
  readonly valid: Validity;
  readonly expiration: Expiration;
  readonly onExpiration: Bytes;
}

/** @name ClaimType */
export interface ClaimType extends Enum {
  readonly isCopyright: boolean;
  readonly isOwnership: boolean;
  readonly type: 'Copyright' | 'Ownership';
}

/** @name Expiration */
export interface Expiration extends Struct {
  readonly expirationType: ExpirationType;
  readonly value: Bytes;
}

/** @name ExpirationType */
export interface ExpirationType extends Enum {
  readonly isForever: boolean;
  readonly isYears: boolean;
  readonly isMonths: boolean;
  readonly isDays: boolean;
  readonly isMinutes: boolean;
  readonly isSeconds: boolean;
  readonly type: 'Forever' | 'Years' | 'Months' | 'Days' | 'Minutes' | 'Seconds';
}

/** @name Proportion */
export interface Proportion extends Struct {
  readonly sign: Bytes;
  readonly name: Bytes;
  readonly value: Bytes;
}

/** @name Signature */
export interface Signature extends Struct {
  readonly sigKey: Characters;
  readonly sig: Bytes;
  readonly cid: SignatureId;
}

/** @name Signatures */
export interface Signatures extends Struct {
  readonly holder: Signature;
  readonly issuer: Signature;
}

/** @name Statement */
export interface Statement extends Struct {
  readonly id: GenericId;
  readonly data: StatementData;
  readonly extra: Option<StatementExtra>;
}

/** @name StatementData */
export interface StatementData extends Struct {
  readonly signatures: Signatures;
  readonly claim: Claim;
}

/** @name StatementExtra */
export interface StatementExtra extends Struct {}

/** @name StatementRecord */
export interface StatementRecord extends Struct {
  readonly record: Statement;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name Validity */
export interface Validity extends Struct {
  readonly from: Bytes;
  readonly until: Bytes;
}

export type PHANTOM_STATEMENTS = 'statements';

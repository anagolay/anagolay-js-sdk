// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Characters, CreatorId } from '@anagolay/types/interfaces/anagolaySupport';
import type { ProofId } from '@anagolay/types/interfaces/poe';
import type { WorkflowId } from '@anagolay/types/interfaces/workflows';
import type { Bytes, Enum, Option, Struct } from '@polkadot/types-codec';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name AnagolaySignature */
export interface AnagolaySignature extends Struct {
  readonly sigKey: Characters;
  readonly sig: Bytes;
  readonly cid: SignatureId;
}

/** @name AnagolayStatement */
export interface AnagolayStatement extends Struct {
  readonly id: StatementId;
  readonly data: StatementData;
  readonly extra: Option<StatementExtra>;
}

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
  readonly onExpiration: Characters;
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
  readonly value: Characters;
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
  readonly sign: Characters;
  readonly name: Characters;
  readonly value: Characters;
}

/** @name SignatureId */
export interface SignatureId extends Struct {}

/** @name Signatures */
export interface Signatures extends Struct {
  readonly holder: AnagolaySignature;
  readonly issuer: AnagolaySignature;
}

/** @name StatementData */
export interface StatementData extends Struct {
  readonly signatures: Signatures;
  readonly claim: Claim;
}

/** @name StatementExtra */
export interface StatementExtra extends Struct {}

/** @name StatementId */
export interface StatementId extends Struct {}

/** @name StatementRecord */
export interface StatementRecord extends Struct {
  readonly record: AnagolayStatement;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name Validity */
export interface Validity extends Struct {
  readonly from: Characters;
  readonly until: Characters;
}

export type PHANTOM_STATEMENTS = 'statements';

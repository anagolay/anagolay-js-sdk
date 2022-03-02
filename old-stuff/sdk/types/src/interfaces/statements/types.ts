// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct } from '@polkadot/types';
import type { CreatorId, GenericId } from '@anagolay/types/interfaces/anagolay';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name AnagolayClaim */
export interface AnagolayClaim extends Struct {
  readonly prevId: GenericId;
  readonly poeId: GenericId;
  readonly ruleId: GenericId;
  readonly proportion: Proportion;
  readonly subjectId: GenericId;
  readonly holder: CreatorId;
  readonly issuer: Bytes;
  readonly claimType: AnagolayClaimType;
  readonly valid: Validity;
  readonly expiration: Expiration;
  readonly onExpiration: Bytes;
}

/** @name AnagolayClaimType */
export interface AnagolayClaimType extends Enum {
  readonly isCopyright: boolean;
  readonly isOwnership: boolean;
}

/** @name AnagolaySignature */
export interface AnagolaySignature extends Struct {
  readonly sigKey: Bytes;
  readonly sig: Bytes;
  readonly cid: GenericId;
}

/** @name AnagolaySignatures */
export interface AnagolaySignatures extends Struct {
  readonly holder: AnagolaySignature;
  readonly issuer: AnagolaySignature;
}

/** @name AnagolayStatement */
export interface AnagolayStatement extends Struct {
  readonly id: GenericId;
  readonly data: StatementData;
  readonly extra: Option<StatementExtra>;
}

/** @name AnagolayStatementRecord */
export interface AnagolayStatementRecord extends Struct {
  readonly record: AnagolayStatement;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
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
}

/** @name Proportion */
export interface Proportion extends Struct {
  readonly sign: Bytes;
  readonly name: Bytes;
  readonly value: Bytes;
}

/** @name StatementData */
export interface StatementData extends Struct {
  readonly signatures: AnagolaySignatures;
  readonly claim: AnagolayClaim;
}

/** @name StatementExtra */
export interface StatementExtra extends Struct {}

/** @name Validity */
export interface Validity extends Struct {
  readonly from: Bytes;
  readonly until: Bytes;
}

export type PHANTOM_STATEMENTS = 'statements';

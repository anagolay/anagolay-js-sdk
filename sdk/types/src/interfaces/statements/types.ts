// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum, Struct } from '@polkadot/types/codec'
import { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime'
import { Bytes } from '@polkadot/types/primitive'
import { CreatorId, GenericId } from '../sensio'

/** @name Expiration */
export interface Expiration extends Struct {
  readonly expiration_type: ExpirationType
  readonly value: Bytes
}

/** @name ExpirationType */
export interface ExpirationType extends Enum {
  readonly isForever: boolean
  readonly isYears: boolean
  readonly isMonths: boolean
  readonly isDays: boolean
  readonly isMinutes: boolean
  readonly isSeconds: boolean
}

/** @name Proportion */
export interface Proportion extends Struct {
  readonly sign: Bytes
  readonly name: Bytes
  readonly value: Bytes
}

/** @name SensioClaim */
export interface SensioClaim extends Struct {
  readonly prevId: GenericId
  readonly poeId: GenericId
  readonly ruleId: GenericId
  readonly proportion: Proportion
  readonly subjectId: GenericId
  readonly holder: CreatorId
  readonly issuer: Bytes
  readonly claimType: SensioClaimType
  readonly valid: Validity
  readonly expiration: Expiration
  readonly on_expiration: Bytes
}

/** @name SensioClaimType */
export interface SensioClaimType extends Enum {
  readonly isCopyright: boolean
  readonly isOwnership: boolean
}

/** @name SensioSignature */
export interface SensioSignature extends Struct {
  readonly sigKey: Bytes
  readonly sig: Bytes
  readonly hash: GenericId
}

/** @name SensioSignatures */
export interface SensioSignatures extends Struct {
  readonly holder: SensioSignature
  readonly issuer: SensioSignature
}

/** @name SensioStatement */
export interface SensioStatement extends Struct {
  readonly id: GenericId
  readonly data: StatementData
}

/** @name StatementData */
export interface StatementData extends Struct {
  readonly signatures: SensioSignatures
  readonly claim: SensioClaim
}

/** @name StatementInfo */
export interface StatementInfo extends Struct {
  readonly statement: SensioStatement
  readonly accountId: AccountId
  readonly blockNumber: BlockNumber
}

/** @name Validity */
export interface Validity extends Struct {
  readonly from: Bytes
  readonly until: Bytes
}

export type PHANTOM_STATEMENTS = 'statements'

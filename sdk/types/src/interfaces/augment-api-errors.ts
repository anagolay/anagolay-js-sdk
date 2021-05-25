// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/errors' {
  export interface AugmentedErrors<ApiType> {
    anagolay: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Value was None
       **/
      NoneValue: AugmentedError<ApiType>;
      /**
       * Value reached maximum and cannot be incremented further
       **/
      StorageOverflow: AugmentedError<ApiType>;
    };
    balances: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Got an overflow after adding
       **/
      Overflow: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
    };
    grandpa: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
    };
    operations: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Operation Already exists
       **/
      OperationAlreadyExists: AugmentedError<ApiType>;
    };
    poe: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Value was None
       **/
      NoneValue: AugmentedError<ApiType>;
      /**
       * The proof does not exist, so it cannot be revoked
       **/
      NoSuchProof: AugmentedError<ApiType>;
      /**
       * The proof is claimed by another account, so caller can't revoke it
       **/
      NotProofOwner: AugmentedError<ApiType>;
      /**
       * PHash + ProofId already exist
       **/
      PHashAndProofIdComboAlreadyExist: AugmentedError<ApiType>;
      /**
       * This proof has already been claimed
       **/
      ProofAlreadyClaimed: AugmentedError<ApiType>;
      /**
       * Proof Belongs to another account
       **/
      ProofBelongsToAnotherAccount: AugmentedError<ApiType>;
      /**
       * ForWhat mismatch
       **/
      ProofRuleTypeMismatch: AugmentedError<ApiType>;
      /**
       * Value reached maximum and cannot be incremented further
       **/
      StorageOverflow: AugmentedError<ApiType>;
    };
    rules: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Value was None
       **/
      NoneValue: AugmentedError<ApiType>;
      /**
       * Rule doesn't exits, create one.
       **/
      NoSuchRule: AugmentedError<ApiType>;
      /**
       * Rule already exists
       **/
      RuleAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Value reached maximum and cannot be incremented further
       **/
      StorageOverflow: AugmentedError<ApiType>;
    };
    statements: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Copyright already exists
       **/
      CopyrightAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Copyright doesn't exist
       **/
      CopyrightDoesntExist: AugmentedError<ApiType>;
      /**
       * Create child statement is not yet supported
       **/
      CreatingChildStatementNotSupported: AugmentedError<ApiType>;
      /**
       * Value was None
       **/
      NoneValue: AugmentedError<ApiType>;
      /**
       * Copyright doesn't exits, create one.
       **/
      NoSuchCopyright: AugmentedError<ApiType>;
      /**
       * Statement doesn't exits.
       **/
      NoSuchStatement: AugmentedError<ApiType>;
      /**
       * Ownership already exists
       **/
      OwnershipAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Proof already has this statement
       **/
      ProofHasStatement: AugmentedError<ApiType>;
      /**
       * Statement already exist
       **/
      StatementExist: AugmentedError<ApiType>;
      /**
       * Statement has child statement and ite cannot be revoked
       **/
      StatementHasChildStatement: AugmentedError<ApiType>;
      /**
       * Value reached maximum and cannot be incremented further
       **/
      StorageOverflow: AugmentedError<ApiType>;
      /**
       * Wrong claim type
       **/
      WrongClaimType: AugmentedError<ApiType>;
    };
    sudo: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
    };
    system: {
      [key: string]: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
    };
  }

  export interface DecoratedErrors<ApiType extends ApiTypes> extends AugmentedErrors<ApiType> {
    [key: string]: ModuleErrors<ApiType>;
  }
}

// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type {
  FrameSupportScheduleLookupError,
  FrameSupportTokensMiscBalanceStatus,
  FrameSupportWeightsDispatchInfo,
  SpFinalityGrandpaAppPublic,
  SpRuntimeDispatchError,
  TippingSortTips,
  TippingTip,
  TippingTippingSettings,
  VerificationVerificationRequest
} from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<
        ApiType,
        [who: AccountId32, free: u128, reserved: u128],
        { who: AccountId32; free: u128; reserved: u128 }
      >;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32; amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<
        ApiType,
        [account: AccountId32, amount: u128],
        { account: AccountId32; amount: u128 }
      >;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<
        ApiType,
        [account: AccountId32, freeBalance: u128],
        { account: AccountId32; freeBalance: u128 }
      >;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32; amount: u128 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<
        ApiType,
        [
          from: AccountId32,
          to: AccountId32,
          amount: u128,
          destinationStatus: FrameSupportTokensMiscBalanceStatus
        ],
        {
          from: AccountId32;
          to: AccountId32;
          amount: u128;
          destinationStatus: FrameSupportTokensMiscBalanceStatus;
        }
      >;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32; amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<
        ApiType,
        [from: AccountId32, to: AccountId32, amount: u128],
        { from: AccountId32; to: AccountId32; amount: u128 }
      >;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u128],
        { who: AccountId32; amount: u128 }
      >;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32; amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<
        ApiType,
        [authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>],
        { authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>> }
      >;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    operations: {
      /**
       * Bad request error occurs and this event propagates a detailed description
       **/
      BadRequestError: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Operation Manifest created together with Version and Packages.
       **/
      OperationCreated: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    poe: {
      /**
       * Bad request error occurs and this event propagates a detailed description
       **/
      BadRequestError: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Phash is created
       **/
      PhashCreated: AugmentedEvent<ApiType, [AccountId32, H256]>;
      /**
       * Proof is created and claimed
       **/
      ProofCreated: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallLookupFailed: AugmentedEvent<
        ApiType,
        [task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError],
        { task: ITuple<[u32, u32]>; id: Option<Bytes>; error: FrameSupportScheduleLookupError }
      >;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32; index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<
        ApiType,
        [task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError>],
        { task: ITuple<[u32, u32]>; id: Option<Bytes>; result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32; index: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    statements: {
      /**
       * Bad request error occurs and this event propagates a detailed description
       **/
      BadRequestError: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Copyright is created
       **/
      CopyrightCreated: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Ownership is created
       **/
      OwnershipCreated: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Statement revoked
       **/
      StatementRevoked: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied if one existed.
       **/
      KeyChanged: AugmentedEvent<
        ApiType,
        [oldSudoer: Option<AccountId32>],
        { oldSudoer: Option<AccountId32> }
      >;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<
        ApiType,
        [sudoResult: Result<Null, SpRuntimeDispatchError>],
        { sudoResult: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<
        ApiType,
        [sudoResult: Result<Null, SpRuntimeDispatchError>],
        { sudoResult: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<
        ApiType,
        [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo],
        { dispatchError: SpRuntimeDispatchError; dispatchInfo: FrameSupportWeightsDispatchInfo }
      >;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<
        ApiType,
        [dispatchInfo: FrameSupportWeightsDispatchInfo],
        { dispatchInfo: FrameSupportWeightsDispatchInfo }
      >;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<
        ApiType,
        [sender: AccountId32, hash_: H256],
        { sender: AccountId32; hash_: H256 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tipping: {
      /**
       * This event is never raised: chain metadata does not include types used only in RPCs so as
       * workaround we need to include it here
       * also this is NEVER USED, we had massive issues with the deserialization of the enum on the
       * JS side. Keeping this for now, to test the regressions
       **/
      __TippingLookupTypes: AugmentedEvent<ApiType, [TippingSortTips]>;
      /**
       * Produced upon the newly created tip
       **/
      TipCreated: AugmentedEvent<ApiType, [AccountId32, AccountId32, TippingTip]>;
      /**
       * Produced upon settings update
       **/
      TippingSettingsUpdated: AugmentedEvent<ApiType, [AccountId32, Vec<TippingTippingSettings>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      /**
       * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
       * has been paid by `who`.
       **/
      TransactionFeePaid: AugmentedEvent<
        ApiType,
        [who: AccountId32, actualFee: u128, tip: u128],
        { who: AccountId32; actualFee: u128; tip: u128 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<
        ApiType,
        [proposalIndex: u32, award: u128, account: AccountId32],
        { proposalIndex: u32; award: u128; account: AccountId32 }
      >;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [burntFunds: u128], { burntFunds: u128 }>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [value: u128], { value: u128 }>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32], { proposalIndex: u32 }>;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<
        ApiType,
        [proposalIndex: u32, slashed: u128],
        { proposalIndex: u32; slashed: u128 }
      >;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<ApiType, [rolloverBalance: u128], { rolloverBalance: u128 }>;
      /**
       * A new spend proposal has been approved.
       **/
      SpendApproved: AugmentedEvent<
        ApiType,
        [proposalIndex: u32, amount: u128, beneficiary: AccountId32],
        { proposalIndex: u32; amount: u128; beneficiary: AccountId32 }
      >;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<ApiType, [budgetRemaining: u128], { budgetRemaining: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    uniques: {
      /**
       * An approval for a `delegate` account to transfer the `item` of an item
       * `collection` was cancelled by its `owner`.
       **/
      ApprovalCancelled: AugmentedEvent<
        ApiType,
        [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32],
        { collection: u32; item: u32; owner: AccountId32; delegate: AccountId32 }
      >;
      /**
       * An `item` of a `collection` has been approved by the `owner` for transfer by
       * a `delegate`.
       **/
      ApprovedTransfer: AugmentedEvent<
        ApiType,
        [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32],
        { collection: u32; item: u32; owner: AccountId32; delegate: AccountId32 }
      >;
      /**
       * Attribute metadata has been cleared for a `collection` or `item`.
       **/
      AttributeCleared: AugmentedEvent<
        ApiType,
        [collection: u32, maybeItem: Option<u32>, key: Bytes],
        { collection: u32; maybeItem: Option<u32>; key: Bytes }
      >;
      /**
       * New attribute metadata has been set for a `collection` or `item`.
       **/
      AttributeSet: AugmentedEvent<
        ApiType,
        [collection: u32, maybeItem: Option<u32>, key: Bytes, value: Bytes],
        { collection: u32; maybeItem: Option<u32>; key: Bytes; value: Bytes }
      >;
      /**
       * An `item` was destroyed.
       **/
      Burned: AugmentedEvent<
        ApiType,
        [collection: u32, item: u32, owner: AccountId32],
        { collection: u32; item: u32; owner: AccountId32 }
      >;
      /**
       * Some `collection` was frozen.
       **/
      CollectionFrozen: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Max supply has been set for a collection.
       **/
      CollectionMaxSupplySet: AugmentedEvent<
        ApiType,
        [collection: u32, maxSupply: u32],
        { collection: u32; maxSupply: u32 }
      >;
      /**
       * Metadata has been cleared for a `collection`.
       **/
      CollectionMetadataCleared: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * New metadata has been set for a `collection`.
       **/
      CollectionMetadataSet: AugmentedEvent<
        ApiType,
        [collection: u32, data: Bytes, isFrozen: bool],
        { collection: u32; data: Bytes; isFrozen: bool }
      >;
      /**
       * Some `collection` was thawed.
       **/
      CollectionThawed: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was created.
       **/
      Created: AugmentedEvent<
        ApiType,
        [collection: u32, creator: AccountId32, owner: AccountId32],
        { collection: u32; creator: AccountId32; owner: AccountId32 }
      >;
      /**
       * A `collection` was destroyed.
       **/
      Destroyed: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was force-created.
       **/
      ForceCreated: AugmentedEvent<
        ApiType,
        [collection: u32, owner: AccountId32],
        { collection: u32; owner: AccountId32 }
      >;
      /**
       * Some `item` was frozen.
       **/
      Frozen: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32; item: u32 }>;
      /**
       * An `item` was issued.
       **/
      Issued: AugmentedEvent<
        ApiType,
        [collection: u32, item: u32, owner: AccountId32],
        { collection: u32; item: u32; owner: AccountId32 }
      >;
      /**
       * A `collection` has had its attributes changed by the `Force` origin.
       **/
      ItemStatusChanged: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Metadata has been cleared for an item.
       **/
      MetadataCleared: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32; item: u32 }>;
      /**
       * New metadata has been set for an item.
       **/
      MetadataSet: AugmentedEvent<
        ApiType,
        [collection: u32, item: u32, data: Bytes, isFrozen: bool],
        { collection: u32; item: u32; data: Bytes; isFrozen: bool }
      >;
      /**
       * The owner changed.
       **/
      OwnerChanged: AugmentedEvent<
        ApiType,
        [collection: u32, newOwner: AccountId32],
        { collection: u32; newOwner: AccountId32 }
      >;
      /**
       * Ownership acceptance has changed for an account.
       **/
      OwnershipAcceptanceChanged: AugmentedEvent<
        ApiType,
        [who: AccountId32, maybeCollection: Option<u32>],
        { who: AccountId32; maybeCollection: Option<u32> }
      >;
      /**
       * Metadata has been cleared for an item.
       **/
      Redeposited: AugmentedEvent<
        ApiType,
        [collection: u32, successfulItems: Vec<u32>],
        { collection: u32; successfulItems: Vec<u32> }
      >;
      /**
       * The management team changed.
       **/
      TeamChanged: AugmentedEvent<
        ApiType,
        [collection: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32],
        { collection: u32; issuer: AccountId32; admin: AccountId32; freezer: AccountId32 }
      >;
      /**
       * Some `item` was thawed.
       **/
      Thawed: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32; item: u32 }>;
      /**
       * An `item` was transferred.
       **/
      Transferred: AugmentedEvent<
        ApiType,
        [collection: u32, item: u32, from: AccountId32, to: AccountId32],
        { collection: u32; item: u32; from: AccountId32; to: AccountId32 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches completed but has errors.
       **/
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<
        ApiType,
        [index: u32, error: SpRuntimeDispatchError],
        { index: u32; error: SpRuntimeDispatchError }
      >;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<
        ApiType,
        [result: Result<Null, SpRuntimeDispatchError>],
        { result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * A single item within a Batch of dispatches has completed with error.
       **/
      ItemFailed: AugmentedEvent<ApiType, [error: SpRuntimeDispatchError], { error: SpRuntimeDispatchError }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    verification: {
      /**
       * Produced upon failed verification, intended to be received by both the verifier and the
       * holder, also provides a textual explaination of what went wrong
       **/
      VerificationFailed: AugmentedEvent<
        ApiType,
        [AccountId32, AccountId32, VerificationVerificationRequest, Bytes]
      >;
      /**
       * Produced upon newly requested verification to communicate to the holder the key to use for
       * the agreed action or that the verification is ongoing
       **/
      VerificationRequested: AugmentedEvent<ApiType, [AccountId32, VerificationVerificationRequest]>;
      /**
       * Produced upon successful verification
       **/
      VerificationSuccessful: AugmentedEvent<ApiType, [AccountId32, VerificationVerificationRequest]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    vesting: {
      /**
       * An \[account\] has become fully vested.
       **/
      VestingCompleted: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * The amount vested has been updated. This could indicate a change in funds available.
       * The balance given is the amount which is left unvested (and thus locked).
       **/
      VestingUpdated: AugmentedEvent<
        ApiType,
        [account: AccountId32, unvested: u128],
        { account: AccountId32; unvested: u128 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    workflows: {
      /**
       * Bad request error occurs and this event propagates a detailed description
       **/
      BadRequestError: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Workflow Manifest created together with Version and Packages.
       **/
      WorkflowCreated: AugmentedEvent<ApiType, [AccountId32, Bytes]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module

// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/storage';

import type { ApiTypes, AugmentedQuery, QueryableStorageEntry } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type {
  FrameSupportWeightsPerDispatchClassU64,
  FrameSystemAccountInfo,
  FrameSystemEventRecord,
  FrameSystemLastRuntimeUpgradeInfo,
  FrameSystemPhase,
  OperationsOperationRecord,
  OperationsOperationVersionRecord,
  PalletBalancesAccountData,
  PalletBalancesBalanceLock,
  PalletBalancesReleases,
  PalletBalancesReserveData,
  PalletGrandpaStoredPendingChange,
  PalletGrandpaStoredState,
  PalletSchedulerScheduledV3,
  PalletTransactionPaymentReleases,
  PalletTreasuryProposal,
  PalletUniquesCollectionDetails,
  PalletUniquesCollectionMetadata,
  PalletUniquesItemDetails,
  PalletUniquesItemMetadata,
  PalletVestingReleases,
  PalletVestingVestingInfo,
  PoePhashInfo,
  PoeProofRecord,
  SpConsensusAuraSr25519AppSr25519Public,
  SpRuntimeDigest,
  StatementsStatementRecord,
  TippingTip,
  TippingTippingSettings,
  VerificationVerificationContext,
  VerificationVerificationRequest,
  WorkflowsWorkflowRecord,
  WorkflowsWorkflowVersionRecord
} from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';

export type __AugmentedQuery<ApiType extends ApiTypes> = AugmentedQuery<ApiType, () => unknown>;
export type __QueryableStorageEntry<ApiType extends ApiTypes> = QueryableStorageEntry<ApiType>;

declare module '@polkadot/api-base/types/storage' {
  interface AugmentedQueries<ApiType extends ApiTypes> {
    aura: {
      /**
       * The current authority set.
       **/
      authorities: AugmentedQuery<
        ApiType,
        () => Observable<Vec<SpConsensusAuraSr25519AppSr25519Public>>,
        []
      > &
        QueryableStorageEntry<ApiType, []>;
      /**
       * The current slot of this block.
       *
       * This will be set in `on_initialize`.
       **/
      currentSlot: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    balances: {
      /**
       * The Balances pallet example of storing the balance of an account.
       *
       * # Example
       *
       * ```nocompile
       * impl pallet_balances::Config for Runtime {
       * type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
       * }
       * ```
       *
       * You can also store the balance of an account in the `System` pallet.
       *
       * # Example
       *
       * ```nocompile
       * impl pallet_balances::Config for Runtime {
       * type AccountStore = System
       * }
       * ```
       *
       * But this comes with tradeoffs, storing account balances in the system pallet stores
       * `frame_system` data alongside the account data contrary to storing account balances in the
       * `Balances` pallet, which uses a `StorageMap` to store balances data only.
       * NOTE: This is only used in the case that this pallet is used to store balances.
       **/
      account: AugmentedQuery<
        ApiType,
        (arg: AccountId32 | string | Uint8Array) => Observable<PalletBalancesAccountData>,
        [AccountId32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<
        ApiType,
        (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesBalanceLock>>,
        [AccountId32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Named reserves on some account balances.
       **/
      reserves: AugmentedQuery<
        ApiType,
        (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesReserveData>>,
        [AccountId32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Storage version of the pallet.
       *
       * This is set to v2.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletBalancesReleases>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    grandpa: {
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<PalletGrandpaStoredPendingChange>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its
       * members were responsible.
       *
       * TWOX-NOTE: `SetId` is not under user control.
       **/
      setIdSession: AugmentedQuery<
        ApiType,
        (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<u32>>,
        [u64]
      > &
        QueryableStorageEntry<ApiType, [u64]>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[u32, u32]>>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<PalletGrandpaStoredState>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    operations: {
      /**
       * Retrieve the Operation Manifest with the AccountId ( which is the owner ) and OperationId.
       **/
      operationByOperationIdAndAccountId: AugmentedQuery<
        ApiType,
        (
          arg1: Bytes | string | Uint8Array,
          arg2: AccountId32 | string | Uint8Array
        ) => Observable<Option<OperationsOperationRecord>>,
        [Bytes, AccountId32]
      > &
        QueryableStorageEntry<ApiType, [Bytes, AccountId32]>;
      /**
       * Total amount of Operations.
       **/
      total: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Retrieve the Version.
       **/
      versionByVersionId: AugmentedQuery<
        ApiType,
        (arg: Bytes | string | Uint8Array) => Observable<Option<OperationsOperationVersionRecord>>,
        [Bytes]
      > &
        QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Retrieve all Versions for a single Operation Manifest.
       **/
      versionIdsByOperationId: AugmentedQuery<
        ApiType,
        (arg: Bytes | string | Uint8Array) => Observable<Vec<Bytes>>,
        [Bytes]
      > &
        QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    poe: {
      /**
       * Retrieve the PhashInfo with its digest and the AccountId
       **/
      phashByHashAndAccountId: AugmentedQuery<
        ApiType,
        (
          arg1: H256 | string | Uint8Array,
          arg2: AccountId32 | string | Uint8Array
        ) => Observable<PoePhashInfo>,
        [H256, AccountId32]
      > &
        QueryableStorageEntry<ApiType, [H256, AccountId32]>;
      /**
       * PHashes count
       **/
      phashTotal: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Retrieve the Proof with the ProofId and the AccountId
       **/
      proofByProofIdAndAccountId: AugmentedQuery<
        ApiType,
        (
          arg1: Bytes | string | Uint8Array,
          arg2: AccountId32 | string | Uint8Array
        ) => Observable<Option<PoeProofRecord>>,
        [Bytes, AccountId32]
      > &
        QueryableStorageEntry<ApiType, [Bytes, AccountId32]>;
      /**
       * Retrieve the ProofIds with the [`VerificationContext`]
       **/
      proofIdsByVerificationContext: AugmentedQuery<
        ApiType,
        (
          arg:
            | VerificationVerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array
        ) => Observable<Option<Vec<Bytes>>>,
        [VerificationVerificationContext]
      > &
        QueryableStorageEntry<ApiType, [VerificationVerificationContext]>;
      /**
       * Amount of saved Proofs
       **/
      proofTotal: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    randomnessCollectiveFlip: {
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    scheduler: {
      /**
       * Items to be executed, indexed by the block number that they should be executed on.
       **/
      agenda: AugmentedQuery<
        ApiType,
        (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Option<PalletSchedulerScheduledV3>>>,
        [u32]
      > &
        QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Lookup from identity to the block number and index of the task.
       **/
      lookup: AugmentedQuery<
        ApiType,
        (arg: Bytes | string | Uint8Array) => Observable<Option<ITuple<[u32, u32]>>>,
        [Bytes]
      > &
        QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    statements: {
      /**
       * Retrieve the parent Statement Id given a Statement Id
       * If the StatementB has a parent StatementA in `prev_id` field this will be
       * StatementA id
       * Example:
       *
       * ```ts
       * const aStatement = {
       * //   ... normal as the rest,
       * prev_id: None
       * }
       *
       * const bStatement = {
       * //  ... normal as the rest,
       * prev_id: Some(aStatement.id)
       * }```
       *
       * So this will be a map of StatementId to StatementId (parent)
       * It's used to quickly check upon revoke: the revoke of `aStatement` it will fail,
       * because it is the parent of the `bStatement`
       **/
      parentStatementIdByStatementId: AugmentedQuery<
        ApiType,
        (arg: Bytes | string | Uint8Array) => Observable<Bytes>,
        [Bytes]
      > &
        QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Retrieve a Statement with the Statement Id and the Account Id
       **/
      statementByStatementIdAndAccountId: AugmentedQuery<
        ApiType,
        (
          arg1: Bytes | string | Uint8Array,
          arg2: AccountId32 | string | Uint8Array
        ) => Observable<Option<StatementsStatementRecord>>,
        [Bytes, AccountId32]
      > &
        QueryableStorageEntry<ApiType, [Bytes, AccountId32]>;
      /**
       * List of the statements connected to the Proof. If the statement claim is 100% then there will
       * be only one entry, if it's not then as many entries is needed to get to 100%
       **/
      statementIdsByProofId: AugmentedQuery<
        ApiType,
        (arg: Bytes | string | Uint8Array) => Observable<Vec<Bytes>>,
        [Bytes]
      > &
        QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Amount of saved Statements
       **/
      total: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    sudo: {
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    system: {
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<
        ApiType,
        (arg: AccountId32 | string | Uint8Array) => Observable<FrameSystemAccountInfo>,
        [AccountId32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<H256>, [u32]> &
        QueryableStorageEntry<ApiType, [u32]>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<FrameSupportWeightsPerDispatchClassU64>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<SpRuntimeDigest>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Events deposited for the current block.
       *
       * NOTE: The item is unbound and should therefore never be read on chain.
       * It could otherwise inflate the PoV size of a block.
       *
       * Events have a large in-memory size. Box the events to not go out-of-memory
       * just in case someone still reads them from within the runtime.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<FrameSystemEventRecord>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Mapping between a topic (represented by T::Hash) and a vector of indexes
       * of events in the `<Events<T>>` list.
       *
       * All topic vectors have deterministic storage locations depending on the topic. This
       * allows light-clients to leverage the changes trie storage tracking mechanism and
       * in case of changes fetch the list of events of interest.
       *
       * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
       * the `EventIndex` then in case if the topic has the same contents on the next block
       * no notification will be triggered thus the event might be lost.
       **/
      eventTopics: AugmentedQuery<
        ApiType,
        (arg: H256 | string | Uint8Array) => Observable<Vec<ITuple<[u32, u32]>>>,
        [H256]
      > &
        QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemPhase>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<
        ApiType,
        (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>,
        [u32]
      > &
        QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
       **/
      lastRuntimeUpgrade: AugmentedQuery<
        ApiType,
        () => Observable<Option<FrameSystemLastRuntimeUpgradeInfo>>,
        []
      > &
        QueryableStorageEntry<ApiType, []>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<H256>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
       * (default) if not.
       **/
      upgradedToTripleRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
       **/
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tipping: {
      /**
       * The map of TippingSettings indexed by their respective AccountId and VerificationContext
       **/
      tippingSettingsByAccountIdAndVerificationContext: AugmentedQuery<
        ApiType,
        (
          arg1: AccountId32 | string | Uint8Array,
          arg2:
            | VerificationVerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array
        ) => Observable<TippingTippingSettings>,
        [AccountId32, VerificationVerificationContext]
      > &
        QueryableStorageEntry<ApiType, [AccountId32, VerificationVerificationContext]>;
      /**
       * The map of collection of Tips indexed by their respective receiver AccountId and
       * VerificationContext
       **/
      tipsByAccountIdAndVerificationContext: AugmentedQuery<
        ApiType,
        (
          arg1: AccountId32 | string | Uint8Array,
          arg2:
            | VerificationVerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array
        ) => Observable<Vec<TippingTip>>,
        [AccountId32, VerificationVerificationContext]
      > &
        QueryableStorageEntry<ApiType, [AccountId32, VerificationVerificationContext]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<u128>, []> &
        QueryableStorageEntry<ApiType, []>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletTransactionPaymentReleases>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    treasury: {
      /**
       * Proposal indices that have been approved but not yet awarded.
       **/
      approvals: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Number of proposals that have been made.
       **/
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Proposals that have been made.
       **/
      proposals: AugmentedQuery<
        ApiType,
        (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletTreasuryProposal>>,
        [u32]
      > &
        QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    uniques: {
      /**
       * The items held by any given account; set out this way so that items owned by a single
       * account can be enumerated.
       **/
      account: AugmentedQuery<
        ApiType,
        (
          arg1: AccountId32 | string | Uint8Array,
          arg2: u32 | AnyNumber | Uint8Array,
          arg3: u32 | AnyNumber | Uint8Array
        ) => Observable<Option<Null>>,
        [AccountId32, u32, u32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32, u32, u32]>;
      /**
       * The items in existence and their ownership details.
       **/
      asset: AugmentedQuery<
        ApiType,
        (
          arg1: u32 | AnyNumber | Uint8Array,
          arg2: u32 | AnyNumber | Uint8Array
        ) => Observable<Option<PalletUniquesItemDetails>>,
        [u32, u32]
      > &
        QueryableStorageEntry<ApiType, [u32, u32]>;
      /**
       * Attributes of a collection.
       **/
      attribute: AugmentedQuery<
        ApiType,
        (
          arg1: u32 | AnyNumber | Uint8Array,
          arg2: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          arg3: Bytes | string | Uint8Array
        ) => Observable<Option<ITuple<[Bytes, u128]>>>,
        [u32, Option<u32>, Bytes]
      > &
        QueryableStorageEntry<ApiType, [u32, Option<u32>, Bytes]>;
      /**
       * Details of a collection.
       **/
      class: AugmentedQuery<
        ApiType,
        (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletUniquesCollectionDetails>>,
        [u32]
      > &
        QueryableStorageEntry<ApiType, [u32]>;
      /**
       * The collections owned by any given account; set out this way so that collections owned by
       * a single account can be enumerated.
       **/
      classAccount: AugmentedQuery<
        ApiType,
        (
          arg1: AccountId32 | string | Uint8Array,
          arg2: u32 | AnyNumber | Uint8Array
        ) => Observable<Option<Null>>,
        [AccountId32, u32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32, u32]>;
      /**
       * Metadata of a collection.
       **/
      classMetadataOf: AugmentedQuery<
        ApiType,
        (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletUniquesCollectionMetadata>>,
        [u32]
      > &
        QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Keeps track of the number of items a collection might have.
       **/
      collectionMaxSupply: AugmentedQuery<
        ApiType,
        (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<u32>>,
        [u32]
      > &
        QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Metadata of an item.
       **/
      instanceMetadataOf: AugmentedQuery<
        ApiType,
        (
          arg1: u32 | AnyNumber | Uint8Array,
          arg2: u32 | AnyNumber | Uint8Array
        ) => Observable<Option<PalletUniquesItemMetadata>>,
        [u32, u32]
      > &
        QueryableStorageEntry<ApiType, [u32, u32]>;
      /**
       * The collection, if any, of which an account is willing to take ownership.
       **/
      ownershipAcceptance: AugmentedQuery<
        ApiType,
        (arg: AccountId32 | string | Uint8Array) => Observable<Option<u32>>,
        [AccountId32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    verification: {
      /**
       * The map of account id of the holder indexed by the verification contexts of the
       * correspondent verification request
       **/
      accountIdsByVerificationContext: AugmentedQuery<
        ApiType,
        (
          arg:
            | VerificationVerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array
        ) => Observable<Vec<AccountId32>>,
        [VerificationVerificationContext]
      > &
        QueryableStorageEntry<ApiType, [VerificationVerificationContext]>;
      /**
       * The map of verification requests indexed by the account id of the holder and the
       * associated verification context
       **/
      verificationRequestByAccountIdAndVerificationContext: AugmentedQuery<
        ApiType,
        (
          arg1: AccountId32 | string | Uint8Array,
          arg2:
            | VerificationVerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array
        ) => Observable<Option<VerificationVerificationRequest>>,
        [AccountId32, VerificationVerificationContext]
      > &
        QueryableStorageEntry<ApiType, [AccountId32, VerificationVerificationContext]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    vesting: {
      /**
       * Storage version of the pallet.
       *
       * New networks start with latest version, as determined by the genesis build.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletVestingReleases>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Information regarding the vesting of a given account.
       **/
      vesting: AugmentedQuery<
        ApiType,
        (arg: AccountId32 | string | Uint8Array) => Observable<Option<Vec<PalletVestingVestingInfo>>>,
        [AccountId32]
      > &
        QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    workflows: {
      /**
       * Amount of saved workflows
       **/
      total: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Retrieve the Version.
       **/
      versionByVersionId: AugmentedQuery<
        ApiType,
        (arg: Bytes | string | Uint8Array) => Observable<Option<WorkflowsWorkflowVersionRecord>>,
        [Bytes]
      > &
        QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Retrieve all Versions for a single Workflow Manifest.
       **/
      versionIdsByWorkflowId: AugmentedQuery<
        ApiType,
        (arg: Bytes | string | Uint8Array) => Observable<Vec<Bytes>>,
        [Bytes]
      > &
        QueryableStorageEntry<ApiType, [Bytes]>;
      /**
       * Retrieve the Workflow Manifest with the WorkflowId and AccountId ( which is the owner )
       **/
      workflowByWorkflowIdAndAccountId: AugmentedQuery<
        ApiType,
        (
          arg1: Bytes | string | Uint8Array,
          arg2: AccountId32 | string | Uint8Array
        ) => Observable<Option<WorkflowsWorkflowRecord>>,
        [Bytes, AccountId32]
      > &
        QueryableStorageEntry<ApiType, [Bytes, AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  } // AugmentedQueries
} // declare module

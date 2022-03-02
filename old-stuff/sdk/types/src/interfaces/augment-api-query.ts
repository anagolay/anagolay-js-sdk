// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Option, Vec, bool, u128, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { GenericId } from '@anagolay/types/interfaces/anagolay';
import type { OperationRecord, OperationVersionRecord } from '@anagolay/types/interfaces/operations';
import type { PhashInfo, ProofRecord } from '@anagolay/types/interfaces/poe';
import type { RuleRecord } from '@anagolay/types/interfaces/rules';
import type { AnagolayStatementRecord } from '@anagolay/types/interfaces/statements';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import type {
  AccountId,
  Balance,
  BlockNumber,
  Hash,
  Moment,
  Releases,
} from '@polkadot/types/interfaces/runtime';
import type { SessionIndex } from '@polkadot/types/interfaces/session';
import type {
  AccountInfo,
  ConsumedWeight,
  DigestOf,
  EventIndex,
  EventRecord,
  LastRuntimeUpgradeInfo,
  Phase,
} from '@polkadot/types/interfaces/system';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    anagolay: {
      [key: string]: QueryableStorageEntry<ApiType>;
      something: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> &
        QueryableStorageEntry<ApiType, []>;
    };
    balances: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of an account.
       *
       * NOTE: This is only used in the case that this pallet is used to store balances.
       **/
      account: AugmentedQuery<
        ApiType,
        (arg: AccountId | string | Uint8Array) => Observable<AccountData>,
        [AccountId]
      > &
        QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<
        ApiType,
        (arg: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>,
        [AccountId]
      > &
        QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Storage version of the pallet.
       *
       * This is set to v2.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<Balance>, []> &
        QueryableStorageEntry<ApiType, []>;
    };
    grandpa: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<SetId>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<StoredPendingChange>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its
       * members were responsible.
       *
       * TWOX-NOTE: `SetId` is not under user control.
       **/
      setIdSession: AugmentedQuery<
        ApiType,
        (arg: SetId | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>,
        [SetId]
      > &
        QueryableStorageEntry<ApiType, [SetId]>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[BlockNumber, BlockNumber]>>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<StoredState>, []> & QueryableStorageEntry<ApiType, []>;
    };
    operations: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Manifests storage. Double map storage where the index is `[IPFSCid, OperationId]`.
       **/
      manifests: AugmentedQueryDoubleMap<
        ApiType,
        (key1: GenericId | string | Uint8Array, key2: GenericId | string | Uint8Array) => Observable<Bytes>,
        [GenericId, GenericId]
      > &
        QueryableStorageEntry<ApiType, [GenericId, GenericId]>;
      /**
       * Total amount of the stored Operations
       **/
      operationCount: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Operations storage. Double map storage where the index is `[OwnerAccountId, OperationId]`.
       **/
      operations: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: AccountId | string | Uint8Array,
          key2: GenericId | string | Uint8Array
        ) => Observable<OperationRecord>,
        [AccountId, GenericId]
      > &
        QueryableStorageEntry<ApiType, [AccountId, GenericId]>;
      /**
       * Operation Version storage. Map storage where index is `OperationId`
       **/
      operationVersions: AugmentedQuery<
        ApiType,
        (arg: GenericId | string | Uint8Array) => Observable<Vec<GenericId>>,
        [GenericId]
      > &
        QueryableStorageEntry<ApiType, [GenericId]>;
      /**
       * Operation Version storage. Map storage where index is `OperationId`
       **/
      versions: AugmentedQuery<
        ApiType,
        (arg: GenericId | string | Uint8Array) => Observable<OperationVersionRecord>,
        [GenericId]
      > &
        QueryableStorageEntry<ApiType, [GenericId]>;
    };
    poe: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * PHashes count
       **/
      pHashCount: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Perceptual hash finder hash(phash) : (PerceptualHash, ProofId)
       **/
      pHashes: AugmentedQueryDoubleMap<
        ApiType,
        (key1: Hash | string | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<PhashInfo>,
        [Hash, AccountId]
      > &
        QueryableStorageEntry<ApiType, [Hash, AccountId]>;
      /**
       * PoE Proofs
       **/
      proofs: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: GenericId | string | Uint8Array,
          key2: AccountId | string | Uint8Array
        ) => Observable<ProofRecord>,
        [GenericId, AccountId]
      > &
        QueryableStorageEntry<ApiType, [GenericId, AccountId]>;
      /**
       * Proofs count
       **/
      proofsCount: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
    };
    randomnessCollectiveFlip: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> &
        QueryableStorageEntry<ApiType, []>;
    };
    rules: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Amount of saved rules
       **/
      ruleCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Rules
       **/
      rules: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: GenericId | string | Uint8Array,
          key2: AccountId | string | Uint8Array
        ) => Observable<RuleRecord>,
        [GenericId, AccountId]
      > &
        QueryableStorageEntry<ApiType, [GenericId, AccountId]>;
    };
    statements: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * List of the statements connected to the Proof. If the statement claim is 100% then there
       * will be only one entry, if it's not then as many entries is needed to get to 100%
       **/
      proofValidStatements: AugmentedQuery<
        ApiType,
        (arg: GenericId | string | Uint8Array) => Observable<Vec<GenericId>>,
        [GenericId]
      > &
        QueryableStorageEntry<ApiType, [GenericId]>;
      /**
       * ALL statements
       **/
      statements: AugmentedQueryDoubleMap<
        ApiType,
        (
          key1: GenericId | string | Uint8Array,
          key2: AccountId | string | Uint8Array
        ) => Observable<AnagolayStatementRecord>,
        [GenericId, AccountId]
      > &
        QueryableStorageEntry<ApiType, [GenericId, AccountId]>;
      /**
       * Amount of saved statements
       **/
      statementsCount: AugmentedQuery<ApiType, () => Observable<u128>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Statement to previous statement index table for quick check.
       * The StatementB has a parent StatementA in `prev_id` field this will be
       * Example:
       * ```ts
       * const aStatement = {
       * //   ... normal as the rest,
       * prev_id: ''
       * }
       * const bStatement = {
       * //  ... normal as the rest,
       * prev_id: aStatement.id
       * }```
       * so this will be a map of bStatement.GenericId => aStatement.GenericId
       * And now if we try to revoke the `aStatement` it will fail,
       * because it is the part of the `bStatement`
       **/
      statementToPrevious: AugmentedQuery<
        ApiType,
        (arg: GenericId | string | Uint8Array) => Observable<GenericId>,
        [GenericId]
      > &
        QueryableStorageEntry<ApiType, [GenericId]>;
    };
    sudo: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId>, []> & QueryableStorageEntry<ApiType, []>;
    };
    system: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<
        ApiType,
        (arg: AccountId | string | Uint8Array) => Observable<AccountInfo>,
        [AccountId]
      > &
        QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<
        ApiType,
        (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Hash>,
        [BlockNumber]
      > &
        QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<ConsumedWeight>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<DigestOf>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<EventIndex>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * Events deposited for the current block.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<EventRecord>>, []> &
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
        (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[BlockNumber, EventIndex]>>>,
        [Hash]
      > &
        QueryableStorageEntry<ApiType, [Hash]>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<Phase>>, []> &
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
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<LastRuntimeUpgradeInfo>>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<Hash>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
       * (default) if not.
       **/
      upgradedToDualRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> &
        QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
       **/
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> &
        QueryableStorageEntry<ApiType, []>;
    };
    timestamp: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>, []> & QueryableStorageEntry<ApiType, []>;
    };
    transactionPayment: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>, []> &
        QueryableStorageEntry<ApiType, []>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> &
        QueryableStorageEntry<ApiType, []>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}

// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Compact, Option, Vec, u16, u32, u64 } from '@polkadot/types';
import type { AnyNumber } from '@polkadot/types/types';
import type { GenericId } from '@anagolay/types/interfaces/anagolay';
import type { Operation, OperationVersion } from '@anagolay/types/interfaces/operations';
import type { PhashInfo, Proof } from '@anagolay/types/interfaces/poe';
import type { Rule } from '@anagolay/types/interfaces/rules';
import type { AnagolayStatement } from '@anagolay/types/interfaces/statements';
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import type { GrandpaEquivocationProof, KeyOwnerProof } from '@polkadot/types/interfaces/grandpa';
import type {
  Balance,
  BlockNumber,
  Call,
  ChangesTrieConfiguration,
  KeyValue,
  LookupSource,
  Moment,
  Perbill,
  Weight,
} from '@polkadot/types/interfaces/runtime';
import type { Key } from '@polkadot/types/interfaces/system';
import type { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    anagolay: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      foo: AugmentedSubmittable<
        (something: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
    };
    balances: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       * # <weight>
       * - Same as transfer, but additional read and write because the source account is
       * not assumed to be in the overlay.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<
        (
          source:
            | LookupSource
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          dest:
            | LookupSource
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [LookupSource, LookupSource, Compact<Balance>]
      >;
      /**
       * Set the balances of a given account.
       *
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also decrease the total issuance of the system (`TotalIssuance`).
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       *
       * The dispatch origin for this call is `root`.
       *
       * # <weight>
       * - Independent of the arguments.
       * - Contains a limited number of reads and writes.
       * ---------------------
       * - Base Weight:
       * - Creating: 27.56 µs
       * - Killing: 35.11 µs
       * - DB Weight: 1 Read, 1 Write to `who`
       * # </weight>
       **/
      setBalance: AugmentedSubmittable<
        (
          who:
            | LookupSource
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          newFree: Compact<Balance> | AnyNumber | Uint8Array,
          newReserved: Compact<Balance> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [LookupSource, Compact<Balance>, Compact<Balance>]
      >;
      /**
       * Transfer some liquid free balance to another account.
       *
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * It will decrease the total issuance of the system by the `TransferFee`.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       *
       * The dispatch origin for this call must be `Signed` by the transactor.
       *
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for
       * input config types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex computation.
       *
       * Related functions:
       *
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional
       * check that the transfer will not kill the origin account.
       * ---------------------------------
       * - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
       * - DB Weight: 1 Read and 1 Write to destination account
       * - Origin account is already in memory, so no DB operations for them.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<
        (
          dest:
            | LookupSource
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [LookupSource, Compact<Balance>]
      >;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       *
       * 99% of the time you want [`transfer`] instead.
       *
       * [`transfer`]: struct.Pallet.html#method.transfer
       * # <weight>
       * - Cheaper than transfer because account cannot be killed.
       * - Base Weight: 51.4 µs
       * - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
       * #</weight>
       **/
      transferKeepAlive: AugmentedSubmittable<
        (
          dest:
            | LookupSource
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [LookupSource, Compact<Balance>]
      >;
    };
    grandpa: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Note that the current authority set of the GRANDPA finality gadget has
       * stalled. This will trigger a forced authority set change at the beginning
       * of the next session, to be enacted `delay` blocks after that. The delay
       * should be high enough to safely assume that the block signalling the
       * forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters
       * will start the new authority set using the given finalized block as base.
       * Only callable by root.
       **/
      noteStalled: AugmentedSubmittable<
        (
          delay: BlockNumber | AnyNumber | Uint8Array,
          bestFinalizedBlockNumber: BlockNumber | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [BlockNumber, BlockNumber]
      >;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       **/
      reportEquivocation: AugmentedSubmittable<
        (
          equivocationProof:
            | GrandpaEquivocationProof
            | { setId?: any; equivocation?: any }
            | string
            | Uint8Array,
          keyOwnerProof:
            | KeyOwnerProof
            | { session?: any; trieNodes?: any; validatorCount?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GrandpaEquivocationProof, KeyOwnerProof]
      >;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       *
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<
        (
          equivocationProof:
            | GrandpaEquivocationProof
            | { setId?: any; equivocation?: any }
            | string
            | Uint8Array,
          keyOwnerProof:
            | KeyOwnerProof
            | { session?: any; trieNodes?: any; validatorCount?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GrandpaEquivocationProof, KeyOwnerProof]
      >;
    };
    operations: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Create initial Operation Version.
       **/
      createInitialVersion: AugmentedSubmittable<
        (
          operationVersion: OperationVersion | { id?: any; data?: any; extra?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [OperationVersion]
      >;
      /**
       * Create Operation manifest
       **/
      createManifest: AugmentedSubmittable<
        (
          operation: Operation | { id?: any; data?: any; extra?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Operation]
      >;
      /**
       * Approve Operation Version
       **/
      versionApprove: AugmentedSubmittable<
        (
          operation: Operation | { id?: any; data?: any; extra?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Operation]
      >;
    };
    poe: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Create proof and claim
       **/
      createProof: AugmentedSubmittable<
        (
          proof: Proof | { id?: any; data?: any; extra?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Proof]
      >;
      /**
       * INDEX storage, save the connection phash <-> proofId for hamming/leven distance calc. Eventually refactor this, for now leave it
       **/
      savePhash: AugmentedSubmittable<
        (
          payloadData: PhashInfo | { pHash?: any; proofId?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [PhashInfo]
      >;
    };
    rules: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Create Rule
       **/
      createRule: AugmentedSubmittable<
        (
          rule: Rule | { id?: any; data?: any; extra?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Rule]
      >;
    };
    statements: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Create Copyright
       **/
      createCopyright: AugmentedSubmittable<
        (
          statement: AnagolayStatement | { id?: any; data?: any; extra?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [AnagolayStatement]
      >;
      /**
       * Create Ownership
       **/
      createOwnership: AugmentedSubmittable<
        (
          statement: AnagolayStatement | { id?: any; data?: any; extra?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [AnagolayStatement]
      >;
      /**
       * Allow the owner to revoke their statement.
       **/
      revoke: AugmentedSubmittable<
        (statementId: GenericId | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [GenericId]
      >;
    };
    sudo: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<
        (
          updated:
            | LookupSource
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [LookupSource]
      >;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<
        (call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Call]
      >;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<
        (
          who:
            | LookupSource
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          call: Call | { callIndex?: any; args?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [LookupSource, Call]
      >;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * # <weight>
       * - O(1).
       * - The weight of this call is defined by the caller.
       * # </weight>
       **/
      sudoUncheckedWeight: AugmentedSubmittable<
        (
          call: Call | { callIndex?: any; args?: any } | string | Uint8Array,
          weight: Weight | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call, Weight]
      >;
    };
    system: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<
        (ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Perbill]
      >;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       *
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       *
       * # <weight>
       * - `O(P)` where `P` amount of keys with prefix `prefix`
       * - `P` storage deletions.
       * - Base Weight: 0.834 * P µs
       * - Writes: Number of subkeys + 1
       * # </weight>
       **/
      killPrefix: AugmentedSubmittable<
        (
          prefix: Key | string | Uint8Array,
          subkeys: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Key, u32]
      >;
      /**
       * Kill some items from storage.
       *
       * # <weight>
       * - `O(IK)` where `I` length of `keys` and `K` length of one key
       * - `I` storage deletions.
       * - Base Weight: .378 * i µs
       * - Writes: Number of items
       * # </weight>
       **/
      killStorage: AugmentedSubmittable<
        (keys: Vec<Key> | (Key | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>,
        [Vec<Key>]
      >;
      /**
       * Make some on-chain remark.
       *
       * # <weight>
       * - `O(1)`
       * - Base Weight: 0.665 µs, independent of remark length.
       * - No DB operations.
       * # </weight>
       **/
      remark: AugmentedSubmittable<
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the new changes trie configuration.
       *
       * # <weight>
       * - `O(1)`
       * - 1 storage write or delete (codec `O(1)`).
       * - 1 call to `deposit_log`: Uses `append` API, so O(1)
       * - Base Weight: 7.218 µs
       * - DB Weight:
       * - Writes: Changes Trie, System Digest
       * # </weight>
       **/
      setChangesTrieConfig: AugmentedSubmittable<
        (
          changesTrieConfig: Option<ChangesTrieConfiguration> | null | object | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Option<ChangesTrieConfiguration>]
      >;
      /**
       * Set the new runtime code.
       *
       * # <weight>
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       * - 1 storage write (codec `O(C)`).
       * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is expensive).
       * - 1 event.
       * The weight of this function is dependent on the runtime, but generally this is very expensive.
       * We will treat this as a full block.
       * # </weight>
       **/
      setCode: AugmentedSubmittable<
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       *
       * # <weight>
       * - `O(C)` where `C` length of `code`
       * - 1 storage write (codec `O(C)`).
       * - 1 event.
       * The weight of this function is dependent on the runtime. We will treat this as a full block.
       * # </weight>
       **/
      setCodeWithoutChecks: AugmentedSubmittable<
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       *
       * # <weight>
       * - `O(1)`
       * - 1 storage write.
       * - Base Weight: 1.405 µs
       * - 1 write to HEAP_PAGES
       * # </weight>
       **/
      setHeapPages: AugmentedSubmittable<
        (pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u64]
      >;
      /**
       * Set some items of storage.
       *
       * # <weight>
       * - `O(I)` where `I` length of `items`
       * - `I` storage writes (`O(1)`).
       * - Base Weight: 0.568 * i µs
       * - Writes: Number of items
       * # </weight>
       **/
      setStorage: AugmentedSubmittable<
        (items: Vec<KeyValue> | KeyValue[]) => SubmittableExtrinsic<ApiType>,
        [Vec<KeyValue>]
      >;
    };
    timestamp: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the current time.
       *
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       *
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       *
       * The dispatch origin for this call must be `Inherent`.
       *
       * # <weight>
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       * # </weight>
       **/
      set: AugmentedSubmittable<
        (now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Compact<Moment>]
      >;
    };
    utility: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Send a call through an indexed pseudonym of the sender.
       *
       * Filter from origin are passed along. The call will be dispatched with an origin which
       * use the same filter as the origin of this call.
       *
       * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
       * because you expect `proxy` to have been used prior in the call stack and you do not want
       * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
       * in the Multisig pallet instead.
       *
       * NOTE: Prior to version *12, this was called `as_limited_sub`.
       *
       * The dispatch origin for this call must be _Signed_.
       **/
      asDerivative: AugmentedSubmittable<
        (
          index: u16 | AnyNumber | Uint8Array,
          call: Call | { callIndex?: any; args?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u16, Call]
      >;
      /**
       * Send a batch of dispatch calls.
       *
       * May be called from any origin.
       *
       * - `calls`: The calls to be dispatched from the same origin.
       *
       * If origin is root then call are dispatch without checking origin filter. (This includes
       * bypassing `frame_system::Config::BaseCallFilter`).
       *
       * # <weight>
       * - Complexity: O(C) where C is the number of calls to be batched.
       * # </weight>
       *
       * This will return `Ok` in all circumstances. To determine the success of the batch, an
       * event is deposited. If a call failed and the batch was interrupted, then the
       * `BatchInterrupted` event is deposited, along with the number of successful calls made
       * and the error of the failed call. If all were successful, then the `BatchCompleted`
       * event is deposited.
       **/
      batch: AugmentedSubmittable<
        (
          calls: Vec<Call> | (Call | { callIndex?: any; args?: any } | string | Uint8Array)[]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<Call>]
      >;
      /**
       * Send a batch of dispatch calls and atomically execute them.
       * The whole transaction will rollback and fail if any of the calls failed.
       *
       * May be called from any origin.
       *
       * - `calls`: The calls to be dispatched from the same origin.
       *
       * If origin is root then call are dispatch without checking origin filter. (This includes
       * bypassing `frame_system::Config::BaseCallFilter`).
       *
       * # <weight>
       * - Complexity: O(C) where C is the number of calls to be batched.
       * # </weight>
       **/
      batchAll: AugmentedSubmittable<
        (
          calls: Vec<Call> | (Call | { callIndex?: any; args?: any } | string | Uint8Array)[]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<Call>]
      >;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}

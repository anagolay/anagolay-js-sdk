// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Compact, Option, Vec, u16, u32, u64 } from '@polkadot/types'
import type { AnyNumber } from '@polkadot/types/types'
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics'
import type { GrandpaEquivocationProof, KeyOwnerProof } from '@polkadot/types/interfaces/grandpa'
import type {
  AccountId,
  AccountIndex,
  Address,
  Balance,
  Call,
  ChangesTrieConfiguration,
  KeyValue,
  LookupSource,
  Moment,
  Perbill,
  Weight,
} from '@polkadot/types/interfaces/runtime'
import type { Key } from '@polkadot/types/interfaces/system'
import type { Operation } from '@sensio/types/interfaces/operations'
import type { PhashInfo, Proof } from '@sensio/types/interfaces/poe'
import type { Rule } from '@sensio/types/interfaces/rules'
import type { GenericId } from '@sensio/types/interfaces/sensio'
import type { SensioStatement } from '@sensio/types/interfaces/statements'
import type { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types'

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    balances: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
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
          source: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
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
          who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          newFree: Compact<Balance> | AnyNumber | Uint8Array,
          newReserved: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
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
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       *
       * 99% of the time you want [`transfer`] instead.
       *
       * [`transfer`]: struct.Module.html#method.transfer
       * # <weight>
       * - Cheaper than transfer because account cannot be killed.
       * - Base Weight: 51.4 µs
       * - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
       * #</weight>
       **/
      transferKeepAlive: AugmentedSubmittable<
        (
          dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          value: Compact<Balance> | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
    }
    grandpa: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       *
       * Since the weight of the extrinsic is 0, in order to avoid DoS by
       * submission of invalid equivocation reports, a mandatory pre-validation of
       * the extrinsic is implemented in a `SignedExtension`.
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
            | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
    }
    operations: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      /**
       * Create Operation
       **/
      create: AugmentedSubmittable<
        (
          data: Operation | { id?: any; data?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
    }
    poe: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      /**
       * Create proof and claim
       **/
      createProof: AugmentedSubmittable<
        (
          proof: Proof | { id?: any; data?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
      /**
       * INDEX storage, save the connection phash <-> proofId for hamming/leven distance calc. Eventually refactor this, for now leave it
       **/
      savePhash: AugmentedSubmittable<
        (
          payloadData: PhashInfo | { pHash?: any; proofId?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
    }
    rules: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      /**
       * Create Rule
       **/
      createRule: AugmentedSubmittable<
        (
          rule: Rule | { id?: any; data?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
    }
    sensio: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      foo: AugmentedSubmittable<
        (something: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
    }
    statements: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      /**
       * Create Copyright
       **/
      createCopyright: AugmentedSubmittable<
        (
          statement: SensioStatement | { id?: any; data?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
      /**
       * Create Ownership
       **/
      createOwnership: AugmentedSubmittable<
        (
          statement: SensioStatement | { id?: any; data?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
      /**
       * Allow the owner to revoke their statement.
       **/
      revoke: AugmentedSubmittable<
        (statementId: GenericId | string | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
    }
    sudo: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
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
          updated: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
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
        (
          call: Call | { callIndex?: any; args?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
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
          who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array,
          call: Call | { callIndex?: any; args?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
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
          weight: Weight | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
    }
    system: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<
        (ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
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
          subkeys: u32 | AnyNumber | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
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
        (keys: Vec<Key> | (Key | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>
      >
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
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
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
          changesTrieConfig: Option<ChangesTrieConfiguration> | null | object | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
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
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
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
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
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
        (pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
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
        (items: Vec<KeyValue> | KeyValue[]) => SubmittableExtrinsic<ApiType>
      >
      /**
       * Kill the sending account, assuming there are no references outstanding and the composite
       * data is equal to its default value.
       *
       * # <weight>
       * - `O(1)`
       * - 1 storage read and deletion.
       * --------------------
       * Base Weight: 8.626 µs
       * No DB Read or Write operations because caller is already in overlay
       * # </weight>
       **/
      suicide: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>
    }
    timestamp: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
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
       * - `O(T)` where `T` complexity of `on_timestamp_set`
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in `on_finalize`)
       * - 1 event handler `on_timestamp_set` `O(T)`.
       * - Benchmark: 7.678 (min squares analysis)
       * - NOTE: This benchmark was done for a runtime with insignificant `on_timestamp_set` handlers.
       * New benchmarking is needed when adding new handlers.
       * # </weight>
       **/
      set: AugmentedSubmittable<
        (now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>
      >
    }
    utility: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>
      /**
       * Send a call through an indexed pseudonym of the sender.
       *
       * Filter from origin are passed along. The call will be dispatched with an origin which
       * use the same filter as the origin of this call.
       *
       * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
       * because you expect `proxy` to have been used prior in the call stack and you do not want
       * the call restrictions to apply to any sub-accounts), then use `as_sub` instead.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * # <weight>
       * - Base weight: 2.861 µs
       * - Plus the weight of the `call`
       * # </weight>
       **/
      asLimitedSub: AugmentedSubmittable<
        (
          index: u16 | AnyNumber | Uint8Array,
          call: Call | { callIndex?: any; args?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
      /**
       * Send a call through an indexed pseudonym of the sender.
       *
       * NOTE: If you need to ensure that any account-based filtering is honored (i.e. because
       * you expect `proxy` to have been used prior in the call stack and you want it to apply to
       * any sub-accounts), then use `as_limited_sub` instead.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * # <weight>
       * - Base weight: 2.861 µs
       * - Plus the weight of the `call`
       * # </weight>
       **/
      asSub: AugmentedSubmittable<
        (
          index: u16 | AnyNumber | Uint8Array,
          call: Call | { callIndex?: any; args?: any } | string | Uint8Array,
        ) => SubmittableExtrinsic<ApiType>
      >
      /**
       * Send a batch of dispatch calls.
       *
       * May be called from any origin.
       *
       * - `calls`: The calls to be dispatched from the same origin.
       *
       * If origin is root then call are dispatch without checking origin filter. (This includes
       * bypassing `frame_system::Trait::BaseCallFilter`).
       *
       * # <weight>
       * - Base weight: 14.39 + .987 * c µs
       * - Plus the sum of the weights of the `calls`.
       * - Plus one additional event. (repeat read/write)
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
          calls: Vec<Call> | (Call | { callIndex?: any; args?: any } | string | Uint8Array)[],
        ) => SubmittableExtrinsic<ApiType>
      >
    }
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes>
    extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>
    [key: string]: SubmittableModuleExtrinsics<ApiType>
  }
}

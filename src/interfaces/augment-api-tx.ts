// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber } from '@polkadot/types/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { Bytes, u32, u64 } from '@polkadot/types/primitive';
import { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import { AccountId, AccountIndex, Address, Balance, Call, ChangesTrieConfiguration, KeyValue, LookupSource, Moment, Perbill } from '@polkadot/types/interfaces/runtime';
import { Key } from '@polkadot/types/interfaces/system';
import { Rule } from 'sensio-network/interfaces/poe';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    balances: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       **/
      forceTransfer: AugmentedSubmittable<(source: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the balances of a given account.
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also decrease the total issuance of the system (`TotalIssuance`).
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       * The dispatch origin for this call is `root`.
       * # <weight>
       * - Independent of the arguments.
       * - Contains a limited number of reads and writes.
       * # </weight>
       **/
      setBalance: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, newFree: Compact<Balance> | AnyNumber | Uint8Array, newReserved: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer some liquid free balance to another account.
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * It will decrease the total issuance of the system by the `TransferFee`.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * The dispatch origin for this call must be `Signed` by the transactor.
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for
       * input config types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex computation.
       * Related functions:
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional
       * check that the transfer will not kill the origin account.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 99% of the time you want [`transfer`] instead.
       * [`transfer`]: struct.Module.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    grandpa: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Report some misbehavior.
       **/
      reportMisbehavior: AugmentedSubmittable<(report: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    poeModule: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Allow a user to claim ownership of an unclaimed proof
       **/
      createClaim: AugmentedSubmittable<(proof: Bytes | string | Uint8Array, payload: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Create rule with type
       **/
      createRule: AugmentedSubmittable<(ruleCid: Bytes | string | Uint8Array, payload: Rule | { description?: any; createdAt?: any; creator?: any; version?: any; forWhat?: any; parent?: any; buildParams?: any; ops?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * create rule with decoding
       **/
      createRuleSimple: AugmentedSubmittable<(ruleCid: Bytes | string | Uint8Array, payload: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Allow the owner to revoke their claim
       **/
      revokeClaim: AugmentedSubmittable<(proof: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    sudo: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<(updated: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * The dispatch origin for this call must be _Signed_.
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<(who: LookupSource | Address | AccountId | AccountIndex | string | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    system: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Key | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Key> | (Key | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Make some on-chain remark.
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new changes trie configuration.
       **/
      setChangesTrieConfig: AugmentedSubmittable<(changesTrieConfig: Option<ChangesTrieConfiguration> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new runtime code.
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<KeyValue> | (KeyValue)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill the sending account, assuming there are no references outstanding and the composite
       * data is equal to its default value.
       **/
      suicide: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    templateModule: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Another dummy entry point.
       * takes no parameters, attempts to increment storage value, and possibly throws an error
       **/
      causeError: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * Just a dummy entry point.
       * function that can be called by the external world as an extrinsics call
       * takes a parameter of the type `AccountId`, stores it, and emits an event
       **/
      doSomething: AugmentedSubmittable<(something: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    timestamp: {
      [index: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the current time.
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * The dispatch origin for this call must be `Inherent`.
       **/
      set: AugmentedSubmittable<(now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [index: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}

// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type {
  ApiTypes,
  AugmentedSubmittable,
  SubmittableExtrinsic,
  SubmittableExtrinsicFunction,
} from '@polkadot/api-base/types';
import type { Bytes, Compact, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { Call, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
import type {
  AnagolayRuntimeOriginCaller,
  AnagolaySupportAnagolayVersionDataOperationArtifactType,
  AnagolaySupportAnagolayVersionDataWorkflowArtifactType,
  OperationsOperationData,
  PalletVestingVestingInfo,
  PoePhashInfo,
  PoeProofData,
  SpCoreVoid,
  SpFinalityGrandpaEquivocationProof,
  StatementsStatementData,
  WorkflowsWorkflowData,
} from '@polkadot/types/lookup';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       * # <weight>
       * - Same as transfer, but additional read and write because the source account is not
       * assumed to be in the overlay.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<
        (
          source:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, MultiAddress, Compact<u128>]
      >;
      /**
       * Unreserve some balance from a user by force.
       *
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<
        (
          who:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          amount: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, u128]
      >;
      /**
       * Set the balances of a given account.
       *
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also alter the total issuance of the system (`TotalIssuance`) appropriately.
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       *
       * The dispatch origin for this call is `root`.
       **/
      setBalance: AugmentedSubmittable<
        (
          who:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          newFree: Compact<u128> | AnyNumber | Uint8Array,
          newReserved: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>, Compact<u128>]
      >;
      /**
       * Transfer some liquid free balance to another account.
       *
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       *
       * The dispatch origin for this call must be `Signed` by the transactor.
       *
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for input config
       * types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex
       * computation.
       *
       * Related functions:
       *
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
       * that the transfer will not kill the origin account.
       * ---------------------------------
       * - Origin account is already in memory, so no DB operations for them.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<
        (
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>]
      >;
      /**
       * Transfer the entire transferable balance from the caller account.
       *
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       *
       * The dispatch origin of this call must be Signed.
       *
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true). # <weight>
       * - O(1). Just like transfer, but reading the user's transferable balance first.
       * #</weight>
       **/
      transferAll: AugmentedSubmittable<
        (
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          keepAlive: bool | boolean | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, bool]
      >;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       *
       * 99% of the time you want [`transfer`] instead.
       *
       * [`transfer`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<
        (
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * Note that the current authority set of the GRANDPA finality gadget has stalled.
       *
       * This will trigger a forced authority set change at the beginning of the next session, to
       * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
       * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
       * The block production rate (which may be slowed down because of finality lagging) should
       * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
       * authority will start voting on top of `best_finalized_block_number` for new finalized
       * blocks. `best_finalized_block_number` should be the highest of the latest finalized
       * block of all validators of the new authority set.
       *
       * Only callable by root.
       **/
      noteStalled: AugmentedSubmittable<
        (
          delay: u32 | AnyNumber | Uint8Array,
          bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
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
            | SpFinalityGrandpaEquivocationProof
            | { setId?: any; equivocation?: any }
            | string
            | Uint8Array,
          keyOwnerProof: SpCoreVoid | null
        ) => SubmittableExtrinsic<ApiType>,
        [SpFinalityGrandpaEquivocationProof, SpCoreVoid]
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
            | SpFinalityGrandpaEquivocationProof
            | { setId?: any; equivocation?: any }
            | string
            | Uint8Array,
          keyOwnerProof: SpCoreVoid | null
        ) => SubmittableExtrinsic<ApiType>,
        [SpFinalityGrandpaEquivocationProof, SpCoreVoid]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    operations: {
      /**
       * Create Operation manifest and the initial Version.
       *
       * Once you have created the Manifest this extrinsic will always fail with different
       * errors, each depend on the parts of the structure.
       * There is a check that a user cannot cheat and create new package if the package is
       * connected to other Operation or any other Version.
       *
       * # Arguments
       * * origin - the call origin
       * * operation_data - the data section of the Operation manifest
       * * version_data - the data section of the Version manifest
       *
       * # Errors
       * * `OperationAlreadyExists` - if an Operation with the same manifest was already created by
       * the caller or by another user
       * * `OperationAlreadyInitialized` - if the Operation already has an initial Version
       * * `OperationVersionPackageAlreadyExists` - one of the packages of the Version is already
       * registered to another Operation
       * * `BadRequest` - if the request is invalid or does not respect a given constraint
       *
       * # Return
       * `DispatchResultWithPostInfo` containing Unit type
       **/
      create: AugmentedSubmittable<
        (
          operationData:
            | OperationsOperationData
            | {
                name?: any;
                description?: any;
                inputs?: any;
                config?: any;
                groups?: any;
                output?: any;
                repository?: any;
                license?: any;
                features?: any;
              }
            | string
            | Uint8Array,
          versionData:
            | AnagolaySupportAnagolayVersionDataOperationArtifactType
            | { entityId?: any; parentId?: any; artifacts?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [OperationsOperationData, AnagolaySupportAnagolayVersionDataOperationArtifactType]
      >;
      /**
       * Approve Operation Version
       *
       * # Arguments
       * * origin - The call origin
       * * operation_id - The id of the Operation to approve
       **/
      versionApprove: AugmentedSubmittable<
        (operationId: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    poe: {
      /**
       * Create proof and claim
       *
       * # Arguments
       * * origin - the call origin
       * * proof_data - the data section of the Proof
       *
       * # Errors
       * * `ProofWorkflowTypeMismatch` - if the Workflow groups don't match the Proof groups
       * * `ProofAlreadyClaimed` - if the Proof is already registered as claimed
       *
       * # Return
       * `DispatchResultWithPostInfo` containing Unit type
       **/
      createProof: AugmentedSubmittable<
        (
          proofData:
            | PoeProofData
            | { workflowId?: any; prevId?: any; creator?: any; groups?: any; params?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [PoeProofData]
      >;
      /**
       * INDEX storage, save the connection phash <-> proofId for hamming/leven distance calc.
       * Eventually refactor this, for now leave it
       *
       * # Arguments
       * * origin - the call origin
       * * phash_info - the perceptive hash information
       *
       * # Errors
       * * `NoSuchProof` - if there is no such Proof as indicated in the phash_info
       * * `PHashAndProofIdComboAlreadyExist` - if the relation between the perceptive hash and the
       * proof is already existing
       *
       * # Return
       * `DispatchResultWithPostInfo` containing Unit type
       **/
      savePhash: AugmentedSubmittable<
        (
          phashInfo: PoePhashInfo | { pHash?: any; proofId?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [PoePhashInfo]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    statements: {
      /**
       * Create Copyright.
       *
       * On Anagolay Copyright statement is a exclusive right that holder claims over a subject in
       * question.
       *
       * # Arguments
       * * origin - the call origin
       * * statement_data - the data section of the Statement
       *
       * # Errors
       * * `WrongClaimType` - if the Statement type is not[`ClaimType::Copyright`]
       * * `CreatingChildStatementNotSupported` - creating child Statements is not supported at the
       * moment
       * * `ProofHasStatement` - the Statement is already associated to an existing Proof
       * * `BadRequest` - if the request is invalid or does not respect a given constraint
       *
       * # Return
       * `DispatchResultWithPostInfo` containing Unit type
       **/
      createCopyright: AugmentedSubmittable<
        (
          statementData: StatementsStatementData | { signatures?: any; claim?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [StatementsStatementData]
      >;
      /**
       * Create Ownership.
       *
       * On Anagolay Ownership statement is a exclusive right that holder claims over a subject in
       * question.
       *
       * # Arguments
       * * origin - the call origin
       * * statement_data - the data section of the Statement
       *
       * # Errors
       * * `WrongClaimType` - if the Statement type is not [`ClaimType::Ownership`]
       * * `CreatingChildStatementNotSupported` - creating child Statements is not supported at the
       * moment
       * * `ProofHasStatement` - the Statement is already associated to an existing Proof
       * * `BadRequest` - if the request is invalid or does not respect a given constraint
       *
       * # Return
       * `DispatchResultWithPostInfo` containing Unit type
       **/
      createOwnership: AugmentedSubmittable<
        (
          statementData: StatementsStatementData | { signatures?: any; claim?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [StatementsStatementData]
      >;
      /**
       * Allow the owner to revoke their statement.
       *
       *
       * # Arguments
       * * origin - the call origin
       * * statement_id - the id of the Statement to revoke
       *
       * # Errors
       * * `NoSuchStatement` - if the Statement cannot be revoked since it does not exist
       * * `StatementHasChildStatement` - if the Statement cannot be revoked since it has child
       * statement
       *
       * # Return
       * `DispatchResultWithPostInfo` containing Unit type
       **/
      revoke: AugmentedSubmittable<
        (statementId: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
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
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress]
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
        (call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
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
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Call]
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
          call: Call | IMethod | string | Uint8Array,
          weight: u64 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call, u64]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
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
       **/
      killPrefix: AugmentedSubmittable<
        (
          prefix: Bytes | string | Uint8Array,
          subkeys: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Bytes, u32]
      >;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<
        (keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>,
        [Vec<Bytes>]
      >;
      /**
       * Make some on-chain remark.
       *
       * # <weight>
       * - `O(1)`
       * # </weight>
       **/
      remark: AugmentedSubmittable<
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the new runtime code.
       *
       * # <weight>
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
       * expensive).
       * - 1 storage write (codec `O(C)`).
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime, but generally this is very
       * expensive. We will treat this as a full block.
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
       * - 1 digest item.
       * - 1 event.
       * The weight of this function is dependent on the runtime. We will treat this as a full
       * block. # </weight>
       **/
      setCodeWithoutChecks: AugmentedSubmittable<
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<
        (pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u64]
      >;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<
        (
          items: Vec<ITuple<[Bytes, Bytes]>> | [Bytes | string | Uint8Array, Bytes | string | Uint8Array][]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<ITuple<[Bytes, Bytes]>>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
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
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       * # </weight>
       **/
      set: AugmentedSubmittable<
        (now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Compact<u64>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
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
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u16, Call]
      >;
      /**
       * Send a batch of dispatch calls.
       *
       * May be called from any origin.
       *
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
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
        (calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>,
        [Vec<Call>]
      >;
      /**
       * Send a batch of dispatch calls and atomically execute them.
       * The whole transaction will rollback and fail if any of the calls failed.
       *
       * May be called from any origin.
       *
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       *
       * If origin is root then call are dispatch without checking origin filter. (This includes
       * bypassing `frame_system::Config::BaseCallFilter`).
       *
       * # <weight>
       * - Complexity: O(C) where C is the number of calls to be batched.
       * # </weight>
       **/
      batchAll: AugmentedSubmittable<
        (calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>,
        [Vec<Call>]
      >;
      /**
       * Dispatches a function call with a provided origin.
       *
       * The dispatch origin for this call must be _Root_.
       *
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
       * # </weight>
       **/
      dispatchAs: AugmentedSubmittable<
        (
          asOrigin: AnagolayRuntimeOriginCaller | { system: any } | { Void: any } | string | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [AnagolayRuntimeOriginCaller, Call]
      >;
      /**
       * Send a batch of dispatch calls.
       * Unlike `batch`, it allows errors and won't interrupt.
       *
       * May be called from any origin.
       *
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       *
       * If origin is root then call are dispatch without checking origin filter. (This includes
       * bypassing `frame_system::Config::BaseCallFilter`).
       *
       * # <weight>
       * - Complexity: O(C) where C is the number of calls to be batched.
       * # </weight>
       **/
      forceBatch: AugmentedSubmittable<
        (calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>,
        [Vec<Call>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    vesting: {
      /**
       * Force a vested transfer.
       *
       * The dispatch origin for this call must be _Root_.
       *
       * - `source`: The account whose funds should be transferred.
       * - `target`: The account that should be transferred the vested funds.
       * - `schedule`: The vesting schedule attached to the transfer.
       *
       * Emits `VestingCreated`.
       *
       * NOTE: This will unlock all schedules through the current block.
       *
       * # <weight>
       * - `O(1)`.
       * - DbWeight: 4 Reads, 4 Writes
       * - Reads: Vesting Storage, Balances Locks, Target Account, Source Account
       * - Writes: Vesting Storage, Balances Locks, Target Account, Source Account
       * # </weight>
       **/
      forceVestedTransfer: AugmentedSubmittable<
        (
          source:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          target:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          schedule:
            | PalletVestingVestingInfo
            | { locked?: any; perBlock?: any; startingBlock?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, MultiAddress, PalletVestingVestingInfo]
      >;
      /**
       * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
       * the highest possible start and end blocks. If both schedules have already started the
       * current block will be used as the schedule start; with the caveat that if one schedule
       * is finished by the current block, the other will be treated as the new merged schedule,
       * unmodified.
       *
       * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
       * NOTE: This will unlock all schedules through the current block prior to merging.
       * NOTE: If both schedules have ended by the current block, no new schedule will be created
       * and both will be removed.
       *
       * Merged schedule attributes:
       * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
       * current_block)`.
       * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
       * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `schedule1_index`: index of the first schedule to merge.
       * - `schedule2_index`: index of the second schedule to merge.
       **/
      mergeSchedules: AugmentedSubmittable<
        (
          schedule1Index: u32 | AnyNumber | Uint8Array,
          schedule2Index: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * Unlock any vested funds of the sender account.
       *
       * The dispatch origin for this call must be _Signed_ and the sender must have funds still
       * locked under this pallet.
       *
       * Emits either `VestingCompleted` or `VestingUpdated`.
       *
       * # <weight>
       * - `O(1)`.
       * - DbWeight: 2 Reads, 2 Writes
       * - Reads: Vesting Storage, Balances Locks, [Sender Account]
       * - Writes: Vesting Storage, Balances Locks, [Sender Account]
       * # </weight>
       **/
      vest: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Create a vested transfer.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `target`: The account receiving the vested funds.
       * - `schedule`: The vesting schedule attached to the transfer.
       *
       * Emits `VestingCreated`.
       *
       * NOTE: This will unlock all schedules through the current block.
       *
       * # <weight>
       * - `O(1)`.
       * - DbWeight: 3 Reads, 3 Writes
       * - Reads: Vesting Storage, Balances Locks, Target Account, [Sender Account]
       * - Writes: Vesting Storage, Balances Locks, Target Account, [Sender Account]
       * # </weight>
       **/
      vestedTransfer: AugmentedSubmittable<
        (
          target:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          schedule:
            | PalletVestingVestingInfo
            | { locked?: any; perBlock?: any; startingBlock?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, PalletVestingVestingInfo]
      >;
      /**
       * Unlock any vested funds of a `target` account.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `target`: The account whose vested funds should be unlocked. Must have funds still
       * locked under this pallet.
       *
       * Emits either `VestingCompleted` or `VestingUpdated`.
       *
       * # <weight>
       * - `O(1)`.
       * - DbWeight: 3 Reads, 3 Writes
       * - Reads: Vesting Storage, Balances Locks, Target Account
       * - Writes: Vesting Storage, Balances Locks, Target Account
       * # </weight>
       **/
      vestOther: AugmentedSubmittable<
        (
          target:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    workflows: {
      /**
       * Create Workflow manifest and the initial Version.
       *
       * Once you have created the Manifest this extrinsic will always fail with 3 different
       * errors, each depend on the parts of the structure.
       * There is a check that a user cannot cheat and create new package if the package is
       * connected to other Workflow or any other Version.
       *
       * # Arguments
       * * origin - the call origin
       * * operation_data - the data section of the Workflow manifest
       * * version_data - the data section of the Version manifest
       *
       * # Errors
       * * `WorkflowAlreadyExists` - if an Workflow with the same manifest was already created by the
       * caller or by another user
       * * `WorkflowAlreadyInitialized` - if the Workflow already has an initial Version
       * * `WorkflowVersionPackageAlreadyExists` - one of the packages of the Version is already
       * registered to another Workflow
       * * `BadRequest` - if the request is invalid or does not respect a given constraint
       *
       * # Return
       * `DispatchResultWithPostInfo` containing Unit type
       **/
      create: AugmentedSubmittable<
        (
          workflowData:
            | WorkflowsWorkflowData
            | { name?: any; creators?: any; description?: any; groups?: any; segments?: any }
            | string
            | Uint8Array,
          versionData:
            | AnagolaySupportAnagolayVersionDataWorkflowArtifactType
            | { entityId?: any; parentId?: any; artifacts?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [WorkflowsWorkflowData, AnagolaySupportAnagolayVersionDataWorkflowArtifactType]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module

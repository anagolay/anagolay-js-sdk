// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/calls';

import type {
  Operation,
  OperationId,
  OperationVersion,
  OperationVersionId
} from '@anagolay/types/interfaces/operations';
import type { Tip } from '@anagolay/types/interfaces/tipping';
import type {
  VerificationContext,
  VerificationRequest,
  VerificationStatus
} from '@anagolay/types/interfaces/verification';
import type {
  Workflow,
  WorkflowId,
  WorkflowVersion,
  WorkflowVersionId
} from '@anagolay/types/interfaces/workflows';
import type { ApiTypes, AugmentedCall, DecoratedCallBase } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Vec, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { OpaqueKeyOwnershipProof } from '@polkadot/types/interfaces/babe';
import type { CheckInherentsResult, InherentData } from '@polkadot/types/interfaces/blockbuilder';
import type { BlockHash } from '@polkadot/types/interfaces/chain';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import type { AuthorityList, GrandpaEquivocationProof, SetId } from '@polkadot/types/interfaces/grandpa';
import type { OpaqueMetadata } from '@polkadot/types/interfaces/metadata';
import type { FeeDetails, RuntimeDispatchInfo } from '@polkadot/types/interfaces/payment';
import type {
  AccountId,
  Balance,
  Block,
  Hash,
  Header,
  Index,
  KeyTypeId,
  SlotDuration
} from '@polkadot/types/interfaces/runtime';
import type { RuntimeVersion } from '@polkadot/types/interfaces/state';
import type { ApplyExtrinsicResult } from '@polkadot/types/interfaces/system';
import type { TransactionSource, TransactionValidity } from '@polkadot/types/interfaces/txqueue';
import type { IExtrinsic, Observable } from '@polkadot/types/types';

export type __AugmentedCall<ApiType extends ApiTypes> = AugmentedCall<ApiType>;
export type __DecoratedCallBase<ApiType extends ApiTypes> = DecoratedCallBase<ApiType>;

declare module '@polkadot/api-base/types/calls' {
  interface AugmentedCalls<ApiType extends ApiTypes> {
    /** 0xbc9d89904f5b923f/1 */
    accountNonceApi: {
      /**
       * The API to query account nonce (aka transaction index)
       **/
      accountNonce: AugmentedCall<ApiType, (accountId: AccountId | string | Uint8Array) => Observable<Index>>;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xdd718d5cc53262d4/1 */
    auraApi: {
      /**
       * Return the current set of authorities.
       **/
      authorities: AugmentedCall<ApiType, () => Observable<Vec<AuthorityId>>>;
      /**
       * Returns the slot duration for Aura.
       **/
      slotDuration: AugmentedCall<ApiType, () => Observable<SlotDuration>>;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0x40fe3ad401f8959a/6 */
    blockBuilder: {
      /**
       * Apply the given extrinsic.
       **/
      applyExtrinsic: AugmentedCall<
        ApiType,
        (extrinsic: Extrinsic | IExtrinsic | string | Uint8Array) => Observable<ApplyExtrinsicResult>
      >;
      /**
       * Check that the inherents are valid.
       **/
      checkInherents: AugmentedCall<
        ApiType,
        (
          block: Block | { header?: any; extrinsics?: any } | string | Uint8Array,
          data: InherentData | { data?: any } | string | Uint8Array
        ) => Observable<CheckInherentsResult>
      >;
      /**
       * Finish the current block.
       **/
      finalizeBlock: AugmentedCall<ApiType, () => Observable<Header>>;
      /**
       * Generate inherent extrinsics.
       **/
      inherentExtrinsics: AugmentedCall<
        ApiType,
        (inherent: InherentData | { data?: any } | string | Uint8Array) => Observable<Vec<Extrinsic>>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xdf6acb689907609b/4 */
    core: {
      /**
       * Execute the given block.
       **/
      executeBlock: AugmentedCall<
        ApiType,
        (block: Block | { header?: any; extrinsics?: any } | string | Uint8Array) => Observable<Null>
      >;
      /**
       * Initialize a block with the given header.
       **/
      initializeBlock: AugmentedCall<
        ApiType,
        (
          header:
            | Header
            | { parentHash?: any; number?: any; stateRoot?: any; extrinsicsRoot?: any; digest?: any }
            | string
            | Uint8Array
        ) => Observable<Null>
      >;
      /**
       * Returns the version of the runtime.
       **/
      version: AugmentedCall<ApiType, () => Observable<RuntimeVersion>>;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xed99c5acb25eedf5/3 */
    grandpaApi: {
      /**
       * Get current GRANDPA authority set id.
       **/
      currentSetId: AugmentedCall<ApiType, () => Observable<SetId>>;
      /**
       * Generates a proof of key ownership for the given authority in the given set.
       **/
      generateKeyOwnershipProof: AugmentedCall<
        ApiType,
        (
          setId: SetId | AnyNumber | Uint8Array,
          authorityId: AuthorityId | string | Uint8Array
        ) => Observable<Option<OpaqueKeyOwnershipProof>>
      >;
      /**
       * Get the current GRANDPA authorities and weights. This should not change except for when changes are scheduled and the corresponding delay has passed.
       **/
      grandpaAuthorities: AugmentedCall<ApiType, () => Observable<AuthorityList>>;
      /**
       * Submits an unsigned extrinsic to report an equivocation.
       **/
      submitReportEquivocationUnsignedExtrinsic: AugmentedCall<
        ApiType,
        (
          equivocationProof:
            | GrandpaEquivocationProof
            | { setId?: any; equivocation?: any }
            | string
            | Uint8Array,
          keyOwnerProof: OpaqueKeyOwnershipProof | string | Uint8Array
        ) => Observable<Option<Null>>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0x37e397fc7c91f5e4/1 */
    metadata: {
      /**
       * Returns the metadata of a runtime
       **/
      metadata: AugmentedCall<ApiType, () => Observable<OpaqueMetadata>>;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xf78b278be53f454c/2 */
    offchainWorkerApi: {
      /**
       * Starts the off-chain task for given block header.
       **/
      offchainWorker: AugmentedCall<
        ApiType,
        (
          header:
            | Header
            | { parentHash?: any; number?: any; stateRoot?: any; extrinsicsRoot?: any; digest?: any }
            | string
            | Uint8Array
        ) => Observable<Null>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xd0b20503a4d3bbc9/1 */
    operationsApi: {
      /**
       * Get a subset of Operations representing a page, given the full set of the ids to paginate and the pagination information
       **/
      getOperationsByIds: AugmentedCall<
        ApiType,
        (
          operation_ids: Vec<OperationId> | (OperationId | {} | string | Uint8Array)[],
          offset: u64 | AnyNumber | Uint8Array,
          limit: u16 | AnyNumber | Uint8Array,
          at: Hash | string | Uint8Array
        ) => Observable<Vec<Operation>>
      >;
      /**
       * Get a subset of OperationVersions representing a page, given the full set of the ids to paginate and the pagination information
       **/
      getOperationVersionsByIds: AugmentedCall<
        ApiType,
        (
          operation_version_ids: Vec<OperationVersionId> | (OperationVersionId | {} | string | Uint8Array)[],
          offset: u64 | AnyNumber | Uint8Array,
          limit: u16 | AnyNumber | Uint8Array,
          at: Hash | string | Uint8Array
        ) => Observable<Vec<OperationVersion>>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xab3c0572291feb8b/1 */
    sessionKeys: {
      /**
       * Decode the given public session keys.
       **/
      decodeSessionKeys: AugmentedCall<
        ApiType,
        (encoded: Bytes | string | Uint8Array) => Observable<Option<Vec<ITuple<[Bytes, KeyTypeId]>>>>
      >;
      /**
       * Generate a set of session keys with optionally using the given seed.
       **/
      generateSessionKeys: AugmentedCall<
        ApiType,
        (seed: Option<Bytes> | null | Uint8Array | Bytes | string) => Observable<Bytes>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xd2bc9897eed08f15/3 */
    taggedTransactionQueue: {
      /**
       * Validate the transaction.
       **/
      validateTransaction: AugmentedCall<
        ApiType,
        (
          source: TransactionSource | 'InBlock' | 'Local' | 'External' | number | Uint8Array,
          tx: Extrinsic | IExtrinsic | string | Uint8Array,
          blockHash: BlockHash | string | Uint8Array
        ) => Observable<TransactionValidity>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xa44ef6da77a84d88/1 */
    tippingApi: {
      /**
       * Retrieve tips for specific account and verification context. It is sorted by createdAt DESC. New tips come first.
       **/
      getTips: AugmentedCall<
        ApiType,
        (
          account_id: AccountId | string | Uint8Array,
          verification_context:
            | VerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array,
          offset: u64 | AnyNumber | Uint8Array,
          limit: u16 | AnyNumber | Uint8Array,
          at: BlockHash | string | Uint8Array
        ) => Observable<Vec<Tip>>
      >;
      /**
       * Get the count of tips for a [`VerificationContext`]
       **/
      total: AugmentedCall<
        ApiType,
        (
          account_id: AccountId | string | Uint8Array,
          verification_context:
            | VerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array,
          at: BlockHash | string | Uint8Array
        ) => Observable<u64>
      >;
      /**
       * Get the total balance of tips received for a [`VerificationContext`]
       **/
      totalReceived: AugmentedCall<
        ApiType,
        (
          account_id: AccountId | string | Uint8Array,
          verification_context:
            | VerificationContext
            | { Unbounded: any }
            | { UrlForDomain: any }
            | { UrlForDomainWithUsername: any }
            | { UrlForDomainWithSubdomain: any }
            | { UrlForDomainWithUsernameAndRepository: any }
            | string
            | Uint8Array,
          at: BlockHash | string | Uint8Array
        ) => Observable<Balance>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0x37c8bb1350a9a2a8/1 */
    transactionPaymentApi: {
      /**
       * The transaction fee details
       **/
      queryFeeDetails: AugmentedCall<
        ApiType,
        (
          uxt: Extrinsic | IExtrinsic | string | Uint8Array,
          len: u32 | AnyNumber | Uint8Array
        ) => Observable<FeeDetails>
      >;
      /**
       * The transaction info
       **/
      queryInfo: AugmentedCall<
        ApiType,
        (
          uxt: Extrinsic | IExtrinsic | string | Uint8Array,
          len: u32 | AnyNumber | Uint8Array
        ) => Observable<RuntimeDispatchInfo>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xa78c229d7d8522c8/1 */
    verificationApi: {
      /**
       * Retrieve verification context data
       **/
      getRequests: AugmentedCall<
        ApiType,
        (
          contexts:
            | Vec<VerificationContext>
            | (
                | VerificationContext
                | { Unbounded: any }
                | { UrlForDomain: any }
                | { UrlForDomainWithUsername: any }
                | { UrlForDomainWithSubdomain: any }
                | { UrlForDomainWithUsernameAndRepository: any }
                | string
                | Uint8Array
              )[],
          status:
            | Option<VerificationStatus>
            | null
            | Uint8Array
            | VerificationStatus
            | { Waiting: any }
            | { Pending: any }
            | { Failure: any }
            | { Success: any }
            | string,
          offset: u64 | AnyNumber | Uint8Array,
          limit: u16 | AnyNumber | Uint8Array,
          at: BlockHash | string | Uint8Array
        ) => Observable<Vec<VerificationRequest>>
      >;
      /**
       * Retrieve verification contexts for a specific account
       **/
      getRequestsForAccount: AugmentedCall<
        ApiType,
        (
          account: AccountId | string | Uint8Array,
          status:
            | Option<VerificationStatus>
            | null
            | Uint8Array
            | VerificationStatus
            | { Waiting: any }
            | { Pending: any }
            | { Failure: any }
            | { Success: any }
            | string,
          offset: u64 | AnyNumber | Uint8Array,
          limit: u16 | AnyNumber | Uint8Array
        ) => Observable<Vec<VerificationRequest>>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
    /** 0xf1ecacfc40875385/1 */
    workflowsApi: {
      /**
       * Get a subset of Workflows representing a page, given the full set of the ids to paginate and the pagination information
       **/
      getWorkflowsByIds: AugmentedCall<
        ApiType,
        (
          workflow_ids: Vec<WorkflowId> | (WorkflowId | {} | string | Uint8Array)[],
          offset: u64 | AnyNumber | Uint8Array,
          limit: u16 | AnyNumber | Uint8Array,
          at: Hash | string | Uint8Array
        ) => Observable<Vec<Workflow>>
      >;
      /**
       * Get a subset of WorkflowVersions representing a page, given the full set of the ids to paginate and the pagination information
       **/
      getWorkflowVersionsByIds: AugmentedCall<
        ApiType,
        (
          workflow_version_ids: Vec<WorkflowVersionId> | (WorkflowVersionId | {} | string | Uint8Array)[],
          offset: u64 | AnyNumber | Uint8Array,
          limit: u16 | AnyNumber | Uint8Array,
          at: Hash | string | Uint8Array
        ) => Observable<Vec<WorkflowVersion>>
      >;
      /**
       * Generic call
       **/
      [key: string]: DecoratedCallBase<ApiType>;
    };
  } // AugmentedCalls
} // declare module

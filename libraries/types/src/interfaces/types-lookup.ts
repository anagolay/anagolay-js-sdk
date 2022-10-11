// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type {
  BTreeMap,
  Bytes,
  Compact,
  Enum,
  Null,
  Option,
  Result,
  Struct,
  Text,
  U8aFixed,
  Vec,
  bool,
  i8,
  u128,
  u16,
  u32,
  u64,
  u8,
} from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name FrameSystemAccountInfo (3) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (16) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (18) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type:
      | 'ExtrinsicSuccess'
      | 'ExtrinsicFailed'
      | 'CodeUpdated'
      | 'NewAccount'
      | 'KilledAccount'
      | 'Remarked';
  }

  /** @name FrameSupportWeightsDispatchInfo (19) */
  interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (20) */
  interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (21) */
  interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (22) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly type:
      | 'Other'
      | 'CannotLookup'
      | 'BadOrigin'
      | 'Module'
      | 'ConsumerRemaining'
      | 'NoProviders'
      | 'TooManyConsumers'
      | 'Token'
      | 'Arithmetic'
      | 'Transactional';
  }

  /** @name SpRuntimeModuleError (23) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (24) */
  interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type:
      | 'NoFunds'
      | 'WouldDie'
      | 'BelowMinimum'
      | 'CannotCreate'
      | 'UnknownAsset'
      | 'Frozen'
      | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (25) */
  interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (26) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletGrandpaEvent (27) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (30) */
  interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (31) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletBalancesEvent (32) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
      readonly reserved: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type:
      | 'Endowed'
      | 'DustLost'
      | 'Transfer'
      | 'BalanceSet'
      | 'Reserved'
      | 'Unreserved'
      | 'ReserveRepatriated'
      | 'Deposit'
      | 'Withdraw'
      | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (33) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletTransactionPaymentEvent (34) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly type: 'TransactionFeePaid';
  }

  /** @name PalletSudoEvent (35) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletTreasuryEvent (39) */
  interface PalletTreasuryEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
    } & Struct;
    readonly isSpending: boolean;
    readonly asSpending: {
      readonly budgetRemaining: u128;
    } & Struct;
    readonly isAwarded: boolean;
    readonly asAwarded: {
      readonly proposalIndex: u32;
      readonly award: u128;
      readonly account: AccountId32;
    } & Struct;
    readonly isRejected: boolean;
    readonly asRejected: {
      readonly proposalIndex: u32;
      readonly slashed: u128;
    } & Struct;
    readonly isBurnt: boolean;
    readonly asBurnt: {
      readonly burntFunds: u128;
    } & Struct;
    readonly isRollover: boolean;
    readonly asRollover: {
      readonly rolloverBalance: u128;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly value: u128;
    } & Struct;
    readonly isSpendApproved: boolean;
    readonly asSpendApproved: {
      readonly proposalIndex: u32;
      readonly amount: u128;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly type:
      | 'Proposed'
      | 'Spending'
      | 'Awarded'
      | 'Rejected'
      | 'Burnt'
      | 'Rollover'
      | 'Deposit'
      | 'SpendApproved';
  }

  /** @name PalletUtilityEvent (40) */
  interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isBatchCompletedWithErrors: boolean;
    readonly isItemCompleted: boolean;
    readonly isItemFailed: boolean;
    readonly asItemFailed: {
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type:
      | 'BatchInterrupted'
      | 'BatchCompleted'
      | 'BatchCompletedWithErrors'
      | 'ItemCompleted'
      | 'ItemFailed'
      | 'DispatchedAs';
  }

  /** @name PalletVestingEvent (41) */
  interface PalletVestingEvent extends Enum {
    readonly isVestingUpdated: boolean;
    readonly asVestingUpdated: {
      readonly account: AccountId32;
      readonly unvested: u128;
    } & Struct;
    readonly isVestingCompleted: boolean;
    readonly asVestingCompleted: {
      readonly account: AccountId32;
    } & Struct;
    readonly type: 'VestingUpdated' | 'VestingCompleted';
  }

  /** @name PalletSchedulerEvent (42) */
  interface PalletSchedulerEvent extends Enum {
    readonly isScheduled: boolean;
    readonly asScheduled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isCanceled: boolean;
    readonly asCanceled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isDispatched: boolean;
    readonly asDispatched: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<Bytes>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isCallLookupFailed: boolean;
    readonly asCallLookupFailed: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<Bytes>;
      readonly error: FrameSupportScheduleLookupError;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched' | 'CallLookupFailed';
  }

  /** @name FrameSupportScheduleLookupError (45) */
  interface FrameSupportScheduleLookupError extends Enum {
    readonly isUnknown: boolean;
    readonly isBadFormat: boolean;
    readonly type: 'Unknown' | 'BadFormat';
  }

  /** @name PalletUniquesEvent (46) */
  interface PalletUniquesEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly collection: u32;
      readonly creator: AccountId32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isForceCreated: boolean;
    readonly asForceCreated: {
      readonly collection: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isDestroyed: boolean;
    readonly asDestroyed: {
      readonly collection: u32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly collection: u32;
      readonly item: u32;
      readonly from: AccountId32;
      readonly to: AccountId32;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isCollectionFrozen: boolean;
    readonly asCollectionFrozen: {
      readonly collection: u32;
    } & Struct;
    readonly isCollectionThawed: boolean;
    readonly asCollectionThawed: {
      readonly collection: u32;
    } & Struct;
    readonly isOwnerChanged: boolean;
    readonly asOwnerChanged: {
      readonly collection: u32;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isTeamChanged: boolean;
    readonly asTeamChanged: {
      readonly collection: u32;
      readonly issuer: AccountId32;
      readonly admin: AccountId32;
      readonly freezer: AccountId32;
    } & Struct;
    readonly isApprovedTransfer: boolean;
    readonly asApprovedTransfer: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isApprovalCancelled: boolean;
    readonly asApprovalCancelled: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isItemStatusChanged: boolean;
    readonly asItemStatusChanged: {
      readonly collection: u32;
    } & Struct;
    readonly isCollectionMetadataSet: boolean;
    readonly asCollectionMetadataSet: {
      readonly collection: u32;
      readonly data: Bytes;
      readonly isFrozen: bool;
    } & Struct;
    readonly isCollectionMetadataCleared: boolean;
    readonly asCollectionMetadataCleared: {
      readonly collection: u32;
    } & Struct;
    readonly isMetadataSet: boolean;
    readonly asMetadataSet: {
      readonly collection: u32;
      readonly item: u32;
      readonly data: Bytes;
      readonly isFrozen: bool;
    } & Struct;
    readonly isMetadataCleared: boolean;
    readonly asMetadataCleared: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isRedeposited: boolean;
    readonly asRedeposited: {
      readonly collection: u32;
      readonly successfulItems: Vec<u32>;
    } & Struct;
    readonly isAttributeSet: boolean;
    readonly asAttributeSet: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
      readonly value: Bytes;
    } & Struct;
    readonly isAttributeCleared: boolean;
    readonly asAttributeCleared: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
    } & Struct;
    readonly isOwnershipAcceptanceChanged: boolean;
    readonly asOwnershipAcceptanceChanged: {
      readonly who: AccountId32;
      readonly maybeCollection: Option<u32>;
    } & Struct;
    readonly isCollectionMaxSupplySet: boolean;
    readonly asCollectionMaxSupplySet: {
      readonly collection: u32;
      readonly maxSupply: u32;
    } & Struct;
    readonly type:
      | 'Created'
      | 'ForceCreated'
      | 'Destroyed'
      | 'Issued'
      | 'Transferred'
      | 'Burned'
      | 'Frozen'
      | 'Thawed'
      | 'CollectionFrozen'
      | 'CollectionThawed'
      | 'OwnerChanged'
      | 'TeamChanged'
      | 'ApprovedTransfer'
      | 'ApprovalCancelled'
      | 'ItemStatusChanged'
      | 'CollectionMetadataSet'
      | 'CollectionMetadataCleared'
      | 'MetadataSet'
      | 'MetadataCleared'
      | 'Redeposited'
      | 'AttributeSet'
      | 'AttributeCleared'
      | 'OwnershipAcceptanceChanged'
      | 'CollectionMaxSupplySet';
  }

  /** @name OperationsEvent (53) */
  interface OperationsEvent extends Enum {
    readonly isOperationCreated: boolean;
    readonly asOperationCreated: ITuple<[AccountId32, Bytes]>;
    readonly isBadRequestError: boolean;
    readonly asBadRequestError: ITuple<[AccountId32, Bytes]>;
    readonly type: 'OperationCreated' | 'BadRequestError';
  }

  /** @name PoeEvent (58) */
  interface PoeEvent extends Enum {
    readonly isProofCreated: boolean;
    readonly asProofCreated: ITuple<[AccountId32, Bytes]>;
    readonly isPhashCreated: boolean;
    readonly asPhashCreated: ITuple<[AccountId32, H256]>;
    readonly isBadRequestError: boolean;
    readonly asBadRequestError: ITuple<[AccountId32, Bytes]>;
    readonly type: 'ProofCreated' | 'PhashCreated' | 'BadRequestError';
  }

  /** @name StatementsEvent (60) */
  interface StatementsEvent extends Enum {
    readonly isCopyrightCreated: boolean;
    readonly asCopyrightCreated: ITuple<[AccountId32, Bytes]>;
    readonly isOwnershipCreated: boolean;
    readonly asOwnershipCreated: ITuple<[AccountId32, Bytes]>;
    readonly isStatementRevoked: boolean;
    readonly asStatementRevoked: ITuple<[AccountId32, Bytes]>;
    readonly isBadRequestError: boolean;
    readonly asBadRequestError: ITuple<[AccountId32, Bytes]>;
    readonly type: 'CopyrightCreated' | 'OwnershipCreated' | 'StatementRevoked' | 'BadRequestError';
  }

  /** @name WorkflowsEvent (62) */
  interface WorkflowsEvent extends Enum {
    readonly isWorkflowCreated: boolean;
    readonly asWorkflowCreated: ITuple<[AccountId32, Bytes]>;
    readonly isBadRequestError: boolean;
    readonly asBadRequestError: ITuple<[AccountId32, Bytes]>;
    readonly type: 'WorkflowCreated' | 'BadRequestError';
  }

  /** @name FrameSystemPhase (64) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (67) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (70) */
  interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type:
      | 'FillBlock'
      | 'Remark'
      | 'SetHeapPages'
      | 'SetCode'
      | 'SetCodeWithoutChecks'
      | 'SetStorage'
      | 'KillStorage'
      | 'KillPrefix'
      | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (75) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (76) */
  interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (77) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (79) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (80) */
  interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (81) */
  interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (82) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (88) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type:
      | 'InvalidSpecName'
      | 'SpecVersionNeedsToIncrease'
      | 'FailedToExtractRuntimeVersion'
      | 'NonDefaultComposite'
      | 'NonZeroRefCount'
      | 'CallFiltered';
  }

  /** @name PalletTimestampCall (90) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name SpConsensusAuraSr25519AppSr25519Public (93) */
  interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (94) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletGrandpaStoredState (97) */
  interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (98) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (100) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (101) */
  interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (102) */
  interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (103) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (104) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (105) */
  interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (106) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (109) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (110) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (112) */
  type SpCoreVoid = Null;

  /** @name PalletGrandpaError (113) */
  interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type:
      | 'PauseFailed'
      | 'ResumeFailed'
      | 'ChangePending'
      | 'TooSoon'
      | 'InvalidKeyOwnershipProof'
      | 'InvalidEquivocationProof'
      | 'DuplicateOffenceReport';
  }

  /** @name PalletBalancesBalanceLock (115) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (116) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (119) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (121) */
  interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (122) */
  interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly type:
      | 'Transfer'
      | 'SetBalance'
      | 'ForceTransfer'
      | 'TransferKeepAlive'
      | 'TransferAll'
      | 'ForceUnreserve';
  }

  /** @name PalletBalancesError (127) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type:
      | 'VestingBalance'
      | 'LiquidityRestrictions'
      | 'InsufficientBalance'
      | 'ExistentialDeposit'
      | 'KeepAlive'
      | 'ExistingVestingSchedule'
      | 'DeadAccount'
      | 'TooManyReserves';
  }

  /** @name PalletTransactionPaymentReleases (129) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PalletSudoCall (130) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletTreasuryCall (132) */
  interface PalletTreasuryCall extends Enum {
    readonly isProposeSpend: boolean;
    readonly asProposeSpend: {
      readonly value: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRejectProposal: boolean;
    readonly asRejectProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isApproveProposal: boolean;
    readonly asApproveProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isSpend: boolean;
    readonly asSpend: {
      readonly amount: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRemoveApproval: boolean;
    readonly asRemoveApproval: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal' | 'Spend' | 'RemoveApproval';
  }

  /** @name PalletUtilityCall (133) */
  interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: AnagolayRuntimeOriginCaller;
      readonly call: Call;
    } & Struct;
    readonly isForceBatch: boolean;
    readonly asForceBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch';
  }

  /** @name AnagolayRuntimeOriginCaller (135) */
  interface AnagolayRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly type: 'System' | 'Void';
  }

  /** @name FrameSupportDispatchRawOrigin (136) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletVestingCall (137) */
  interface PalletVestingCall extends Enum {
    readonly isVest: boolean;
    readonly isVestOther: boolean;
    readonly asVestOther: {
      readonly target: MultiAddress;
    } & Struct;
    readonly isVestedTransfer: boolean;
    readonly asVestedTransfer: {
      readonly target: MultiAddress;
      readonly schedule: PalletVestingVestingInfo;
    } & Struct;
    readonly isForceVestedTransfer: boolean;
    readonly asForceVestedTransfer: {
      readonly source: MultiAddress;
      readonly target: MultiAddress;
      readonly schedule: PalletVestingVestingInfo;
    } & Struct;
    readonly isMergeSchedules: boolean;
    readonly asMergeSchedules: {
      readonly schedule1Index: u32;
      readonly schedule2Index: u32;
    } & Struct;
    readonly type: 'Vest' | 'VestOther' | 'VestedTransfer' | 'ForceVestedTransfer' | 'MergeSchedules';
  }

  /** @name PalletVestingVestingInfo (138) */
  interface PalletVestingVestingInfo extends Struct {
    readonly locked: u128;
    readonly perBlock: u128;
    readonly startingBlock: u32;
  }

  /** @name PalletSchedulerCall (139) */
  interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: Bytes;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: Bytes;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: Bytes;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly type:
      | 'Schedule'
      | 'Cancel'
      | 'ScheduleNamed'
      | 'CancelNamed'
      | 'ScheduleAfter'
      | 'ScheduleNamedAfter';
  }

  /** @name FrameSupportScheduleMaybeHashed (141) */
  interface FrameSupportScheduleMaybeHashed extends Enum {
    readonly isValue: boolean;
    readonly asValue: Call;
    readonly isHash: boolean;
    readonly asHash: H256;
    readonly type: 'Value' | 'Hash';
  }

  /** @name PalletUniquesCall (142) */
  interface PalletUniquesCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly collection: u32;
      readonly admin: MultiAddress;
    } & Struct;
    readonly isForceCreate: boolean;
    readonly asForceCreate: {
      readonly collection: u32;
      readonly owner: MultiAddress;
      readonly freeHolding: bool;
    } & Struct;
    readonly isDestroy: boolean;
    readonly asDestroy: {
      readonly collection: u32;
      readonly witness: PalletUniquesDestroyWitness;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: MultiAddress;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly collection: u32;
      readonly item: u32;
      readonly checkOwner: Option<MultiAddress>;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly collection: u32;
      readonly item: u32;
      readonly dest: MultiAddress;
    } & Struct;
    readonly isRedeposit: boolean;
    readonly asRedeposit: {
      readonly collection: u32;
      readonly items: Vec<u32>;
    } & Struct;
    readonly isFreeze: boolean;
    readonly asFreeze: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isThaw: boolean;
    readonly asThaw: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isFreezeCollection: boolean;
    readonly asFreezeCollection: {
      readonly collection: u32;
    } & Struct;
    readonly isThawCollection: boolean;
    readonly asThawCollection: {
      readonly collection: u32;
    } & Struct;
    readonly isTransferOwnership: boolean;
    readonly asTransferOwnership: {
      readonly collection: u32;
      readonly owner: MultiAddress;
    } & Struct;
    readonly isSetTeam: boolean;
    readonly asSetTeam: {
      readonly collection: u32;
      readonly issuer: MultiAddress;
      readonly admin: MultiAddress;
      readonly freezer: MultiAddress;
    } & Struct;
    readonly isApproveTransfer: boolean;
    readonly asApproveTransfer: {
      readonly collection: u32;
      readonly item: u32;
      readonly delegate: MultiAddress;
    } & Struct;
    readonly isCancelApproval: boolean;
    readonly asCancelApproval: {
      readonly collection: u32;
      readonly item: u32;
      readonly maybeCheckDelegate: Option<MultiAddress>;
    } & Struct;
    readonly isForceItemStatus: boolean;
    readonly asForceItemStatus: {
      readonly collection: u32;
      readonly owner: MultiAddress;
      readonly issuer: MultiAddress;
      readonly admin: MultiAddress;
      readonly freezer: MultiAddress;
      readonly freeHolding: bool;
      readonly isFrozen: bool;
    } & Struct;
    readonly isSetAttribute: boolean;
    readonly asSetAttribute: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
      readonly value: Bytes;
    } & Struct;
    readonly isClearAttribute: boolean;
    readonly asClearAttribute: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
    } & Struct;
    readonly isSetMetadata: boolean;
    readonly asSetMetadata: {
      readonly collection: u32;
      readonly item: u32;
      readonly data: Bytes;
      readonly isFrozen: bool;
    } & Struct;
    readonly isClearMetadata: boolean;
    readonly asClearMetadata: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isSetCollectionMetadata: boolean;
    readonly asSetCollectionMetadata: {
      readonly collection: u32;
      readonly data: Bytes;
      readonly isFrozen: bool;
    } & Struct;
    readonly isClearCollectionMetadata: boolean;
    readonly asClearCollectionMetadata: {
      readonly collection: u32;
    } & Struct;
    readonly isSetAcceptOwnership: boolean;
    readonly asSetAcceptOwnership: {
      readonly maybeCollection: Option<u32>;
    } & Struct;
    readonly isSetCollectionMaxSupply: boolean;
    readonly asSetCollectionMaxSupply: {
      readonly collection: u32;
      readonly maxSupply: u32;
    } & Struct;
    readonly type:
      | 'Create'
      | 'ForceCreate'
      | 'Destroy'
      | 'Mint'
      | 'Burn'
      | 'Transfer'
      | 'Redeposit'
      | 'Freeze'
      | 'Thaw'
      | 'FreezeCollection'
      | 'ThawCollection'
      | 'TransferOwnership'
      | 'SetTeam'
      | 'ApproveTransfer'
      | 'CancelApproval'
      | 'ForceItemStatus'
      | 'SetAttribute'
      | 'ClearAttribute'
      | 'SetMetadata'
      | 'ClearMetadata'
      | 'SetCollectionMetadata'
      | 'ClearCollectionMetadata'
      | 'SetAcceptOwnership'
      | 'SetCollectionMaxSupply';
  }

  /** @name PalletUniquesDestroyWitness (143) */
  interface PalletUniquesDestroyWitness extends Struct {
    readonly items: Compact<u32>;
    readonly itemMetadatas: Compact<u32>;
    readonly attributes: Compact<u32>;
  }

  /** @name OperationsCall (145) */
  interface OperationsCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly operationData: OperationsOperationData;
      readonly versionData: OperationsOperationVersionData;
    } & Struct;
    readonly isVersionApprove: boolean;
    readonly asVersionApprove: {
      readonly operationId: Bytes;
    } & Struct;
    readonly type: 'Create' | 'VersionApprove';
  }

  /** @name OperationsOperationData (146) */
  interface OperationsOperationData extends Struct {
    readonly name: Bytes;
    readonly description: Bytes;
    readonly inputs: Vec<Bytes>;
    readonly config: BTreeMap<Bytes, Vec<Bytes>>;
    readonly groups: Vec<AnagolaySupportForWhat>;
    readonly output: Bytes;
    readonly repository: Bytes;
    readonly license: Bytes;
    readonly features: Vec<Bytes>;
  }

  /** @name AnagolaySupportForWhat (155) */
  interface AnagolaySupportForWhat extends Enum {
    readonly isGeneric: boolean;
    readonly isPhoto: boolean;
    readonly isCamera: boolean;
    readonly isLens: boolean;
    readonly isSmartphone: boolean;
    readonly isUser: boolean;
    readonly isSys: boolean;
    readonly isFlowcontrol: boolean;
    readonly type: 'Generic' | 'Photo' | 'Camera' | 'Lens' | 'Smartphone' | 'User' | 'Sys' | 'Flowcontrol';
  }

  /** @name OperationsOperationVersionData (158) */
  interface OperationsOperationVersionData extends Struct {
    readonly entityId: Option<Bytes>;
    readonly parentId: Option<Bytes>;
    readonly artifacts: Vec<AnagolaySupportAnagolayArtifactStructureOperationArtifactType>;
  }

  /** @name AnagolaySupportAnagolayArtifactStructureOperationArtifactType (163) */
  interface AnagolaySupportAnagolayArtifactStructureOperationArtifactType extends Struct {
    readonly artifactType: OperationsOperationArtifactType;
    readonly fileExtension: Bytes;
    readonly ipfsCid: Bytes;
  }

  /** @name OperationsOperationArtifactType (164) */
  interface OperationsOperationArtifactType extends Enum {
    readonly isDocs: boolean;
    readonly isGit: boolean;
    readonly isWasm: boolean;
    readonly asWasm: AnagolaySupportWasmArtifactSubType;
    readonly type: 'Docs' | 'Git' | 'Wasm';
  }

  /** @name AnagolaySupportWasmArtifactSubType (165) */
  interface AnagolaySupportWasmArtifactSubType extends Enum {
    readonly isCjs: boolean;
    readonly isEsm: boolean;
    readonly isWasm: boolean;
    readonly isWeb: boolean;
    readonly type: 'Cjs' | 'Esm' | 'Wasm' | 'Web';
  }

  /** @name PoeCall (168) */
  interface PoeCall extends Enum {
    readonly isCreateProof: boolean;
    readonly asCreateProof: {
      readonly proofData: PoeProofData;
    } & Struct;
    readonly isSavePhash: boolean;
    readonly asSavePhash: {
      readonly phashInfo: PoePhashInfo;
    } & Struct;
    readonly type: 'CreateProof' | 'SavePhash';
  }

  /** @name PoeProofData (169) */
  interface PoeProofData extends Struct {
    readonly workflowId: Bytes;
    readonly prevId: Bytes;
    readonly creator: Bytes;
    readonly groups: Vec<AnagolaySupportForWhat>;
    readonly params: Vec<PoeProofParams>;
  }

  /** @name PoeProofParams (171) */
  interface PoeProofParams extends Struct {
    readonly k: Bytes;
    readonly v: Bytes;
  }

  /** @name PoePhashInfo (174) */
  interface PoePhashInfo extends Struct {
    readonly pHash: Bytes;
    readonly proofId: Bytes;
  }

  /** @name StatementsCall (176) */
  interface StatementsCall extends Enum {
    readonly isCreateCopyright: boolean;
    readonly asCreateCopyright: {
      readonly statementData: StatementsStatementData;
    } & Struct;
    readonly isCreateOwnership: boolean;
    readonly asCreateOwnership: {
      readonly statementData: StatementsStatementData;
    } & Struct;
    readonly isRevoke: boolean;
    readonly asRevoke: {
      readonly statementId: Bytes;
    } & Struct;
    readonly type: 'CreateCopyright' | 'CreateOwnership' | 'Revoke';
  }

  /** @name StatementsStatementData (177) */
  interface StatementsStatementData extends Struct {
    readonly signatures: StatementsSignatures;
    readonly claim: StatementsClaim;
  }

  /** @name StatementsSignatures (178) */
  interface StatementsSignatures extends Struct {
    readonly holder: StatementsSignature;
    readonly issuer: StatementsSignature;
  }

  /** @name StatementsSignature (179) */
  interface StatementsSignature extends Struct {
    readonly sigKey: Bytes;
    readonly sig: Bytes;
    readonly cid: Bytes;
  }

  /** @name StatementsClaim (182) */
  interface StatementsClaim extends Struct {
    readonly prevId: Option<Bytes>;
    readonly poeId: Bytes;
    readonly proportion: StatementsProportion;
    readonly subjectId: Bytes;
    readonly holder: Bytes;
    readonly issuer: Bytes;
    readonly claimType: StatementsClaimType;
    readonly valid: StatementsValidity;
    readonly expiration: StatementsExpiration;
    readonly onExpiration: Bytes;
  }

  /** @name StatementsProportion (184) */
  interface StatementsProportion extends Struct {
    readonly sign: Bytes;
    readonly name: Bytes;
    readonly value: Bytes;
  }

  /** @name StatementsClaimType (185) */
  interface StatementsClaimType extends Enum {
    readonly isCopyright: boolean;
    readonly isOwnership: boolean;
    readonly type: 'Copyright' | 'Ownership';
  }

  /** @name StatementsValidity (186) */
  interface StatementsValidity extends Struct {
    readonly from: Bytes;
    readonly until: Bytes;
  }

  /** @name StatementsExpiration (187) */
  interface StatementsExpiration extends Struct {
    readonly expirationType: StatementsExpirationType;
    readonly value: Bytes;
  }

  /** @name StatementsExpirationType (188) */
  interface StatementsExpirationType extends Enum {
    readonly isForever: boolean;
    readonly isYears: boolean;
    readonly isMonths: boolean;
    readonly isDays: boolean;
    readonly isMinutes: boolean;
    readonly isSeconds: boolean;
    readonly type: 'Forever' | 'Years' | 'Months' | 'Days' | 'Minutes' | 'Seconds';
  }

  /** @name WorkflowsCall (189) */
  interface WorkflowsCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly workflowData: WorkflowsWorkflowData;
      readonly versionData: WorkflowsWorkflowVersionData;
    } & Struct;
    readonly type: 'Create';
  }

  /** @name WorkflowsWorkflowData (190) */
  interface WorkflowsWorkflowData extends Struct {
    readonly name: Bytes;
    readonly creators: Vec<Bytes>;
    readonly description: Bytes;
    readonly groups: Vec<AnagolaySupportForWhat>;
    readonly segments: Vec<WorkflowsWorkflowSegment>;
  }

  /** @name WorkflowsWorkflowSegment (193) */
  interface WorkflowsWorkflowSegment extends Struct {
    readonly inputs: Vec<i8>;
    readonly sequence: Vec<WorkflowsOperationVersionReference>;
  }

  /** @name WorkflowsOperationVersionReference (198) */
  interface WorkflowsOperationVersionReference extends Struct {
    readonly versionId: Bytes;
    readonly config: BTreeMap<Bytes, Bytes>;
  }

  /** @name WorkflowsWorkflowVersionData (205) */
  interface WorkflowsWorkflowVersionData extends Struct {
    readonly entityId: Option<Bytes>;
    readonly parentId: Option<Bytes>;
    readonly artifacts: Vec<AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType>;
  }

  /** @name AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType (210) */
  interface AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType extends Struct {
    readonly artifactType: WorkflowsWorkflowArtifactType;
    readonly fileExtension: Bytes;
    readonly ipfsCid: Bytes;
  }

  /** @name WorkflowsWorkflowArtifactType (211) */
  interface WorkflowsWorkflowArtifactType extends Enum {
    readonly isDocs: boolean;
    readonly isGit: boolean;
    readonly isWasm: boolean;
    readonly asWasm: AnagolaySupportWasmArtifactSubType;
    readonly type: 'Docs' | 'Git' | 'Wasm';
  }

  /** @name PalletSudoError (213) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletTreasuryProposal (214) */
  interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly beneficiary: AccountId32;
    readonly bond: u128;
  }

  /** @name FrameSupportPalletId (218) */
  interface FrameSupportPalletId extends U8aFixed {}

  /** @name PalletTreasuryError (219) */
  interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly isInsufficientPermission: boolean;
    readonly isProposalNotApproved: boolean;
    readonly type:
      | 'InsufficientProposersBalance'
      | 'InvalidIndex'
      | 'TooManyApprovals'
      | 'InsufficientPermission'
      | 'ProposalNotApproved';
  }

  /** @name PalletUtilityError (220) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletVestingReleases (223) */
  interface PalletVestingReleases extends Enum {
    readonly isV0: boolean;
    readonly isV1: boolean;
    readonly type: 'V0' | 'V1';
  }

  /** @name PalletVestingError (224) */
  interface PalletVestingError extends Enum {
    readonly isNotVesting: boolean;
    readonly isAtMaxVestingSchedules: boolean;
    readonly isAmountLow: boolean;
    readonly isScheduleIndexOutOfBounds: boolean;
    readonly isInvalidScheduleParams: boolean;
    readonly type:
      | 'NotVesting'
      | 'AtMaxVestingSchedules'
      | 'AmountLow'
      | 'ScheduleIndexOutOfBounds'
      | 'InvalidScheduleParams';
  }

  /** @name PalletSchedulerScheduledV3 (227) */
  interface PalletSchedulerScheduledV3 extends Struct {
    readonly maybeId: Option<Bytes>;
    readonly priority: u8;
    readonly call: FrameSupportScheduleMaybeHashed;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: AnagolayRuntimeOriginCaller;
  }

  /** @name PalletSchedulerError (228) */
  interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange';
  }

  /** @name PalletUniquesCollectionDetails (229) */
  interface PalletUniquesCollectionDetails extends Struct {
    readonly owner: AccountId32;
    readonly issuer: AccountId32;
    readonly admin: AccountId32;
    readonly freezer: AccountId32;
    readonly totalDeposit: u128;
    readonly freeHolding: bool;
    readonly items: u32;
    readonly itemMetadatas: u32;
    readonly attributes: u32;
    readonly isFrozen: bool;
  }

  /** @name PalletUniquesItemDetails (232) */
  interface PalletUniquesItemDetails extends Struct {
    readonly owner: AccountId32;
    readonly approved: Option<AccountId32>;
    readonly isFrozen: bool;
    readonly deposit: u128;
  }

  /** @name PalletUniquesCollectionMetadata (233) */
  interface PalletUniquesCollectionMetadata extends Struct {
    readonly deposit: u128;
    readonly data: Bytes;
    readonly isFrozen: bool;
  }

  /** @name PalletUniquesItemMetadata (234) */
  interface PalletUniquesItemMetadata extends Struct {
    readonly deposit: u128;
    readonly data: Bytes;
    readonly isFrozen: bool;
  }

  /** @name PalletUniquesError (237) */
  interface PalletUniquesError extends Enum {
    readonly isNoPermission: boolean;
    readonly isUnknownCollection: boolean;
    readonly isAlreadyExists: boolean;
    readonly isWrongOwner: boolean;
    readonly isBadWitness: boolean;
    readonly isInUse: boolean;
    readonly isFrozen: boolean;
    readonly isWrongDelegate: boolean;
    readonly isNoDelegate: boolean;
    readonly isUnapproved: boolean;
    readonly isUnaccepted: boolean;
    readonly isLocked: boolean;
    readonly isMaxSupplyReached: boolean;
    readonly isMaxSupplyAlreadySet: boolean;
    readonly isMaxSupplyTooSmall: boolean;
    readonly type:
      | 'NoPermission'
      | 'UnknownCollection'
      | 'AlreadyExists'
      | 'WrongOwner'
      | 'BadWitness'
      | 'InUse'
      | 'Frozen'
      | 'WrongDelegate'
      | 'NoDelegate'
      | 'Unapproved'
      | 'Unaccepted'
      | 'Locked'
      | 'MaxSupplyReached'
      | 'MaxSupplyAlreadySet'
      | 'MaxSupplyTooSmall';
  }

  /** @name AnagolaySupportError (238) */
  interface AnagolaySupportError extends Enum {
    readonly isMaxArtifactsLimitReached: boolean;
    readonly type: 'MaxArtifactsLimitReached';
  }

  /** @name OperationsOperationRecord (240) */
  interface OperationsOperationRecord extends Struct {
    readonly record: OperationsOperation;
    readonly accountId: AccountId32;
    readonly blockNumber: u32;
  }

  /** @name OperationsOperation (241) */
  interface OperationsOperation extends Struct {
    readonly id: Bytes;
    readonly data: OperationsOperationData;
    readonly extra: Option<OperationsOperationExtra>;
  }

  /** @name OperationsOperationExtra (243) */
  type OperationsOperationExtra = Null;

  /** @name OperationsOperationVersionRecord (246) */
  interface OperationsOperationVersionRecord extends Struct {
    readonly record: OperationsOperationVersion;
    readonly accountId: AccountId32;
    readonly blockNumber: u32;
  }

  /** @name OperationsOperationVersion (247) */
  interface OperationsOperationVersion extends Struct {
    readonly id: Bytes;
    readonly data: OperationsOperationVersionData;
    readonly extra: Option<OperationsOperationVersionExtra>;
  }

  /** @name OperationsOperationVersionExtra (249) */
  interface OperationsOperationVersionExtra extends Struct {
    readonly createdAt: u64;
  }

  /** @name OperationsError (250) */
  interface OperationsError extends Enum {
    readonly isOperationAlreadyExists: boolean;
    readonly isOperationVersionPackageAlreadyExists: boolean;
    readonly isOperationAlreadyInitialized: boolean;
    readonly isBadRequest: boolean;
    readonly isMaxArtifactsLimitReached: boolean;
    readonly isMaxVersionsPerOperationLimitReached: boolean;
    readonly type:
      | 'OperationAlreadyExists'
      | 'OperationVersionPackageAlreadyExists'
      | 'OperationAlreadyInitialized'
      | 'BadRequest'
      | 'MaxArtifactsLimitReached'
      | 'MaxVersionsPerOperationLimitReached';
  }

  /** @name PoeProofRecord (252) */
  interface PoeProofRecord extends Struct {
    readonly record: PoeProof;
    readonly accountId: AccountId32;
    readonly blockNumber: u32;
  }

  /** @name PoeProof (253) */
  interface PoeProof extends Struct {
    readonly id: Bytes;
    readonly data: PoeProofData;
    readonly extra: Option<PoeProofExtra>;
  }

  /** @name PoeProofExtra (255) */
  type PoeProofExtra = Null;

  /** @name PoeError (257) */
  interface PoeError extends Enum {
    readonly isProofAlreadyClaimed: boolean;
    readonly isNoSuchProof: boolean;
    readonly isNoSuchWorkflow: boolean;
    readonly isProofWorkflowTypeMismatch: boolean;
    readonly isPHashAndProofIdComboAlreadyExist: boolean;
    readonly isBadRequest: boolean;
    readonly type:
      | 'ProofAlreadyClaimed'
      | 'NoSuchProof'
      | 'NoSuchWorkflow'
      | 'ProofWorkflowTypeMismatch'
      | 'PHashAndProofIdComboAlreadyExist'
      | 'BadRequest';
  }

  /** @name StatementsStatementRecord (259) */
  interface StatementsStatementRecord extends Struct {
    readonly record: StatementsStatement;
    readonly accountId: AccountId32;
    readonly blockNumber: u32;
  }

  /** @name StatementsStatement (260) */
  interface StatementsStatement extends Struct {
    readonly id: Bytes;
    readonly data: StatementsStatementData;
    readonly extra: Option<StatementsStatementExtra>;
  }

  /** @name StatementsStatementExtra (262) */
  type StatementsStatementExtra = Null;

  /** @name StatementsError (265) */
  interface StatementsError extends Enum {
    readonly isWrongClaimType: boolean;
    readonly isStatementAlreadyExists: boolean;
    readonly isProofHasStatements: boolean;
    readonly isNoSuchStatement: boolean;
    readonly isStatementHasChildStatement: boolean;
    readonly isCreatingChildStatementNotSupported: boolean;
    readonly isBadRequest: boolean;
    readonly isMaxStatementsPerProofLimitReached: boolean;
    readonly isInvalidSignature: boolean;
    readonly isUnrecognizedSignature: boolean;
    readonly type:
      | 'WrongClaimType'
      | 'StatementAlreadyExists'
      | 'ProofHasStatements'
      | 'NoSuchStatement'
      | 'StatementHasChildStatement'
      | 'CreatingChildStatementNotSupported'
      | 'BadRequest'
      | 'MaxStatementsPerProofLimitReached'
      | 'InvalidSignature'
      | 'UnrecognizedSignature';
  }

  /** @name WorkflowsWorkflowRecord (267) */
  interface WorkflowsWorkflowRecord extends Struct {
    readonly record: WorkflowsWorkflow;
    readonly accountId: AccountId32;
    readonly blockNumber: u32;
  }

  /** @name WorkflowsWorkflow (268) */
  interface WorkflowsWorkflow extends Struct {
    readonly id: Bytes;
    readonly data: WorkflowsWorkflowData;
    readonly extra: Option<WorkflowsWorkflowExtra>;
  }

  /** @name WorkflowsWorkflowExtra (270) */
  type WorkflowsWorkflowExtra = Null;

  /** @name WorkflowsWorkflowVersionRecord (273) */
  interface WorkflowsWorkflowVersionRecord extends Struct {
    readonly record: WorkflowsWorkflowVersion;
    readonly accountId: AccountId32;
    readonly blockNumber: u32;
  }

  /** @name WorkflowsWorkflowVersion (274) */
  interface WorkflowsWorkflowVersion extends Struct {
    readonly id: Bytes;
    readonly data: WorkflowsWorkflowVersionData;
    readonly extra: Option<WorkflowsWorkflowVersionExtra>;
  }

  /** @name WorkflowsWorkflowVersionExtra (276) */
  interface WorkflowsWorkflowVersionExtra extends Struct {
    readonly createdAt: u64;
  }

  /** @name WorkflowsError (277) */
  interface WorkflowsError extends Enum {
    readonly isWorkflowAlreadyExists: boolean;
    readonly isWorkflowVersionPackageAlreadyExists: boolean;
    readonly isWorkflowAlreadyInitialized: boolean;
    readonly isBadRequest: boolean;
    readonly isMaxArtifactsLimitReached: boolean;
    readonly isMaxVersionsPerWorkflowLimitReached: boolean;
    readonly type:
      | 'WorkflowAlreadyExists'
      | 'WorkflowVersionPackageAlreadyExists'
      | 'WorkflowAlreadyInitialized'
      | 'BadRequest'
      | 'MaxArtifactsLimitReached'
      | 'MaxVersionsPerWorkflowLimitReached';
  }

  /** @name SpRuntimeMultiSignature (279) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (280) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (281) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (284) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (285) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (286) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (287) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (290) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (291) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (292) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name AnagolayRuntimeRuntime (293) */
  type AnagolayRuntimeRuntime = Null;
} // declare module

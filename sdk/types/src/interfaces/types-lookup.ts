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

  /** @name PalletUtilityEvent (39) */
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

  /** @name PalletVestingEvent (40) */
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

  /** @name OperationsEvent (41) */
  interface OperationsEvent extends Enum {
    readonly isOperationCreated: boolean;
    readonly asOperationCreated: ITuple<[AccountId32, Bytes]>;
    readonly isBadRequestError: boolean;
    readonly asBadRequestError: ITuple<[AccountId32, Bytes]>;
    readonly type: 'OperationCreated' | 'BadRequestError';
  }

  /** @name PoeEvent (46) */
  interface PoeEvent extends Enum {
    readonly isProofCreated: boolean;
    readonly asProofCreated: ITuple<[AccountId32, Bytes]>;
    readonly isPhashCreated: boolean;
    readonly asPhashCreated: ITuple<[AccountId32, H256]>;
    readonly isBadRequestError: boolean;
    readonly asBadRequestError: ITuple<[AccountId32, Bytes]>;
    readonly type: 'ProofCreated' | 'PhashCreated' | 'BadRequestError';
  }

  /** @name StatementsEvent (47) */
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

  /** @name WorkflowsEvent (48) */
  interface WorkflowsEvent extends Enum {
    readonly isWorkflowCreated: boolean;
    readonly asWorkflowCreated: ITuple<[AccountId32, Bytes]>;
    readonly isBadRequestError: boolean;
    readonly asBadRequestError: ITuple<[AccountId32, Bytes]>;
    readonly type: 'WorkflowCreated' | 'BadRequestError';
  }

  /** @name FrameSystemPhase (49) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (53) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (57) */
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

  /** @name FrameSystemLimitsBlockWeights (62) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (63) */
  interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (64) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (66) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (67) */
  interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (68) */
  interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (69) */
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

  /** @name FrameSystemError (75) */
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

  /** @name PalletTimestampCall (77) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name SpConsensusAuraSr25519AppSr25519Public (80) */
  interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (81) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletGrandpaStoredState (84) */
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

  /** @name PalletGrandpaStoredPendingChange (85) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (88) */
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

  /** @name SpFinalityGrandpaEquivocationProof (89) */
  interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (90) */
  interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (91) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (92) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (93) */
  interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (94) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (97) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (98) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (100) */
  type SpCoreVoid = Null;

  /** @name PalletGrandpaError (101) */
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

  /** @name PalletBalancesBalanceLock (103) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (104) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (107) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (109) */
  interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (110) */
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

  /** @name PalletBalancesError (115) */
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

  /** @name PalletTransactionPaymentReleases (117) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PalletSudoCall (118) */
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

  /** @name PalletUtilityCall (120) */
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

  /** @name AnagolayRuntimeOriginCaller (122) */
  interface AnagolayRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly type: 'System' | 'Void';
  }

  /** @name FrameSupportDispatchRawOrigin (123) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletVestingCall (124) */
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

  /** @name PalletVestingVestingInfo (125) */
  interface PalletVestingVestingInfo extends Struct {
    readonly locked: u128;
    readonly perBlock: u128;
    readonly startingBlock: u32;
  }

  /** @name OperationsCall (126) */
  interface OperationsCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly operationData: OperationsOperationData;
      readonly versionData: AnagolaySupportAnagolayVersionDataOperationArtifactType;
    } & Struct;
    readonly isVersionApprove: boolean;
    readonly asVersionApprove: {
      readonly operationId: Bytes;
    } & Struct;
    readonly type: 'Create' | 'VersionApprove';
  }

  /** @name OperationsOperationData (127) */
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

  /** @name AnagolaySupportForWhat (136) */
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

  /** @name AnagolaySupportAnagolayVersionDataOperationArtifactType (139) */
  interface AnagolaySupportAnagolayVersionDataOperationArtifactType extends Struct {
    readonly entityId: Option<Bytes>;
    readonly parentId: Option<Bytes>;
    readonly artifacts: Vec<AnagolaySupportAnagolayArtifactStructureOperationArtifactType>;
  }

  /** @name OperationsOperationArtifactType (140) */
  interface OperationsOperationArtifactType extends Enum {
    readonly isDocs: boolean;
    readonly isGit: boolean;
    readonly isWasm: boolean;
    readonly asWasm: AnagolaySupportWasmArtifactSubType;
    readonly type: 'Docs' | 'Git' | 'Wasm';
  }

  /** @name AnagolaySupportWasmArtifactSubType (141) */
  interface AnagolaySupportWasmArtifactSubType extends Enum {
    readonly isCjs: boolean;
    readonly isEsm: boolean;
    readonly isWasm: boolean;
    readonly isWeb: boolean;
    readonly type: 'Cjs' | 'Esm' | 'Wasm' | 'Web';
  }

  /** @name AnagolaySupportAnagolayArtifactStructureOperationArtifactType (144) */
  interface AnagolaySupportAnagolayArtifactStructureOperationArtifactType extends Struct {
    readonly artifactType: OperationsOperationArtifactType;
    readonly fileExtension: Bytes;
    readonly ipfsCid: Bytes;
  }

  /** @name PoeCall (146) */
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

  /** @name PoeProofData (147) */
  interface PoeProofData extends Struct {
    readonly workflowId: Bytes;
    readonly prevId: Bytes;
    readonly creator: Bytes;
    readonly groups: Vec<AnagolaySupportForWhat>;
    readonly params: Vec<PoeProofParams>;
  }

  /** @name PoeProofParams (149) */
  interface PoeProofParams extends Struct {
    readonly k: Bytes;
    readonly v: Bytes;
  }

  /** @name PoePhashInfo (152) */
  interface PoePhashInfo extends Struct {
    readonly pHash: Bytes;
    readonly proofId: Bytes;
  }

  /** @name StatementsCall (154) */
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

  /** @name StatementsStatementData (155) */
  interface StatementsStatementData extends Struct {
    readonly signatures: StatementsSignatures;
    readonly claim: StatementsClaim;
  }

  /** @name StatementsSignatures (156) */
  interface StatementsSignatures extends Struct {
    readonly holder: StatementsSignature;
    readonly issuer: StatementsSignature;
  }

  /** @name StatementsSignature (157) */
  interface StatementsSignature extends Struct {
    readonly sigKey: Bytes;
    readonly sig: Bytes;
    readonly cid: Bytes;
  }

  /** @name StatementsClaim (159) */
  interface StatementsClaim extends Struct {
    readonly prevId: Option<Bytes>;
    readonly poeId: Bytes;
    readonly workflowId: Bytes;
    readonly proportion: StatementsProportion;
    readonly subjectId: Bytes;
    readonly holder: Bytes;
    readonly issuer: Bytes;
    readonly claimType: StatementsClaimType;
    readonly valid: StatementsValidity;
    readonly expiration: StatementsExpiration;
    readonly onExpiration: Bytes;
  }

  /** @name StatementsProportion (160) */
  interface StatementsProportion extends Struct {
    readonly sign: Bytes;
    readonly name: Bytes;
    readonly value: Bytes;
  }

  /** @name StatementsClaimType (161) */
  interface StatementsClaimType extends Enum {
    readonly isCopyright: boolean;
    readonly isOwnership: boolean;
    readonly type: 'Copyright' | 'Ownership';
  }

  /** @name StatementsValidity (162) */
  interface StatementsValidity extends Struct {
    readonly from: Bytes;
    readonly until: Bytes;
  }

  /** @name StatementsExpiration (163) */
  interface StatementsExpiration extends Struct {
    readonly expirationType: StatementsExpirationType;
    readonly value: Bytes;
  }

  /** @name StatementsExpirationType (164) */
  interface StatementsExpirationType extends Enum {
    readonly isForever: boolean;
    readonly isYears: boolean;
    readonly isMonths: boolean;
    readonly isDays: boolean;
    readonly isMinutes: boolean;
    readonly isSeconds: boolean;
    readonly type: 'Forever' | 'Years' | 'Months' | 'Days' | 'Minutes' | 'Seconds';
  }

  /** @name WorkflowsCall (165) */
  interface WorkflowsCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly workflowData: WorkflowsWorkflowData;
      readonly versionData: AnagolaySupportAnagolayVersionDataWorkflowArtifactType;
    } & Struct;
    readonly type: 'Create';
  }

  /** @name WorkflowsWorkflowData (166) */
  interface WorkflowsWorkflowData extends Struct {
    readonly name: Bytes;
    readonly creators: Vec<Bytes>;
    readonly description: Bytes;
    readonly groups: Vec<AnagolaySupportForWhat>;
    readonly segments: Vec<WorkflowsWorkflowSegment>;
  }

  /** @name WorkflowsWorkflowSegment (169) */
  interface WorkflowsWorkflowSegment extends Struct {
    readonly inputs: Vec<i8>;
    readonly sequence: Vec<WorkflowsOperationVersionReference>;
  }

  /** @name WorkflowsOperationVersionReference (174) */
  interface WorkflowsOperationVersionReference extends Struct {
    readonly versionId: Bytes;
    readonly config: BTreeMap<Bytes, Bytes>;
  }

  /** @name AnagolaySupportAnagolayVersionDataWorkflowArtifactType (181) */
  interface AnagolaySupportAnagolayVersionDataWorkflowArtifactType extends Struct {
    readonly entityId: Option<Bytes>;
    readonly parentId: Option<Bytes>;
    readonly artifacts: Vec<AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType>;
  }

  /** @name WorkflowsWorkflowArtifactType (182) */
  interface WorkflowsWorkflowArtifactType extends Enum {
    readonly isDocs: boolean;
    readonly isGit: boolean;
    readonly isWasm: boolean;
    readonly asWasm: AnagolaySupportWasmArtifactSubType;
    readonly type: 'Docs' | 'Git' | 'Wasm';
  }

  /** @name AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType (184) */
  interface AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType extends Struct {
    readonly artifactType: WorkflowsWorkflowArtifactType;
    readonly fileExtension: Bytes;
    readonly ipfsCid: Bytes;
  }

  /** @name PalletSudoError (186) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletUtilityError (187) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletVestingReleases (190) */
  interface PalletVestingReleases extends Enum {
    readonly isV0: boolean;
    readonly isV1: boolean;
    readonly type: 'V0' | 'V1';
  }

  /** @name PalletVestingError (191) */
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

  /** @name AnagolaySupportError (192) */
  interface AnagolaySupportError extends Enum {
    readonly isMaxArtifactsLimitReached: boolean;
    readonly type: 'MaxArtifactsLimitReached';
  }

  /** @name OperationsOperationExtra (196) */
  type OperationsOperationExtra = Null;

  /** @name AnagolaySupportAnagolayVersionExtra (202) */
  interface AnagolaySupportAnagolayVersionExtra extends Struct {
    readonly createdAt: u64;
  }

  /** @name OperationsError (204) */
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

  /** @name AnagolaySupportAnagolayStructureProofData (206) */
  interface AnagolaySupportAnagolayStructureProofData extends Struct {
    readonly id: Bytes;
    readonly data: PoeProofData;
    readonly extra: Option<PoeProofExtra>;
  }

  /** @name PoeProofExtra (207) */
  type PoeProofExtra = Null;

  /** @name PoeError (210) */
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

  /** @name AnagolaySupportAnagolayStructureStatementData (212) */
  interface AnagolaySupportAnagolayStructureStatementData extends Struct {
    readonly id: Bytes;
    readonly data: StatementsStatementData;
    readonly extra: Option<StatementsStatementExtra>;
  }

  /** @name StatementsStatementExtra (213) */
  type StatementsStatementExtra = Null;

  /** @name StatementsError (216) */
  interface StatementsError extends Enum {
    readonly isWrongClaimType: boolean;
    readonly isProofHasStatement: boolean;
    readonly isNoSuchStatement: boolean;
    readonly isStatementHasChildStatement: boolean;
    readonly isCreatingChildStatementNotSupported: boolean;
    readonly isBadRequest: boolean;
    readonly isMaxStatementsPerProofLimitReached: boolean;
    readonly type:
      | 'WrongClaimType'
      | 'ProofHasStatement'
      | 'NoSuchStatement'
      | 'StatementHasChildStatement'
      | 'CreatingChildStatementNotSupported'
      | 'BadRequest'
      | 'MaxStatementsPerProofLimitReached';
  }

  /** @name AnagolaySupportAnagolayStructureWorkflowData (218) */
  interface AnagolaySupportAnagolayStructureWorkflowData extends Struct {
    readonly id: Bytes;
    readonly data: WorkflowsWorkflowData;
    readonly extra: Option<WorkflowsWorkflowExtra>;
  }

  /** @name WorkflowsWorkflowExtra (219) */
  type WorkflowsWorkflowExtra = Null;

  /** @name AnagolaySupportAnagolayRecord (222) */
  interface AnagolaySupportAnagolayRecord extends Struct {
    readonly record: AnagolaySupportAnagolayStructureAnagolayVersionData;
    readonly accountId: AccountId32;
    readonly blockNumber: u32;
  }

  /** @name AnagolaySupportAnagolayStructureAnagolayVersionData (223) */
  interface AnagolaySupportAnagolayStructureAnagolayVersionData extends Struct {
    readonly id: Bytes;
    readonly data: AnagolaySupportAnagolayVersionDataWorkflowArtifactType;
    readonly extra: Option<AnagolaySupportAnagolayVersionExtra>;
  }

  /** @name WorkflowsError (224) */
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

  /** @name SpRuntimeMultiSignature (226) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (227) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (228) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (231) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (232) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (233) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (234) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (237) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (238) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (239) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name AnagolayRuntimeRuntime (240) */
  type AnagolayRuntimeRuntime = Null;
} // declare module

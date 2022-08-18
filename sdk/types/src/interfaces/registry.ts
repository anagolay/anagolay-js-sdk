// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/types/registry';

import type {
  AnagolayRuntimeOriginCaller,
  AnagolayRuntimeRuntime,
  AnagolaySupportAnagolayArtifactStructureOperationArtifactType,
  AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType,
  AnagolaySupportAnagolayRecord,
  AnagolaySupportAnagolayStructureAnagolayVersionData,
  AnagolaySupportAnagolayStructureProofData,
  AnagolaySupportAnagolayStructureStatementData,
  AnagolaySupportAnagolayStructureWorkflowData,
  AnagolaySupportAnagolayVersionDataOperationArtifactType,
  AnagolaySupportAnagolayVersionDataWorkflowArtifactType,
  AnagolaySupportAnagolayVersionExtra,
  AnagolaySupportError,
  AnagolaySupportForWhat,
  AnagolaySupportWasmArtifactSubType,
  FinalityGrandpaEquivocationPrecommit,
  FinalityGrandpaEquivocationPrevote,
  FinalityGrandpaPrecommit,
  FinalityGrandpaPrevote,
  FrameSupportDispatchRawOrigin,
  FrameSupportTokensMiscBalanceStatus,
  FrameSupportWeightsDispatchClass,
  FrameSupportWeightsDispatchInfo,
  FrameSupportWeightsPays,
  FrameSupportWeightsPerDispatchClassU32,
  FrameSupportWeightsPerDispatchClassU64,
  FrameSupportWeightsPerDispatchClassWeightsPerClass,
  FrameSupportWeightsRuntimeDbWeight,
  FrameSystemAccountInfo,
  FrameSystemCall,
  FrameSystemError,
  FrameSystemEvent,
  FrameSystemEventRecord,
  FrameSystemExtensionsCheckGenesis,
  FrameSystemExtensionsCheckNonZeroSender,
  FrameSystemExtensionsCheckNonce,
  FrameSystemExtensionsCheckSpecVersion,
  FrameSystemExtensionsCheckTxVersion,
  FrameSystemExtensionsCheckWeight,
  FrameSystemLastRuntimeUpgradeInfo,
  FrameSystemLimitsBlockLength,
  FrameSystemLimitsBlockWeights,
  FrameSystemLimitsWeightsPerClass,
  FrameSystemPhase,
  OperationsCall,
  OperationsError,
  OperationsEvent,
  OperationsOperationArtifactType,
  OperationsOperationData,
  OperationsOperationExtra,
  PalletBalancesAccountData,
  PalletBalancesBalanceLock,
  PalletBalancesCall,
  PalletBalancesError,
  PalletBalancesEvent,
  PalletBalancesReasons,
  PalletBalancesReleases,
  PalletBalancesReserveData,
  PalletGrandpaCall,
  PalletGrandpaError,
  PalletGrandpaEvent,
  PalletGrandpaStoredPendingChange,
  PalletGrandpaStoredState,
  PalletSudoCall,
  PalletSudoError,
  PalletSudoEvent,
  PalletTimestampCall,
  PalletTransactionPaymentChargeTransactionPayment,
  PalletTransactionPaymentEvent,
  PalletTransactionPaymentReleases,
  PalletUtilityCall,
  PalletUtilityError,
  PalletUtilityEvent,
  PalletVestingCall,
  PalletVestingError,
  PalletVestingEvent,
  PalletVestingReleases,
  PalletVestingVestingInfo,
  PoeCall,
  PoeError,
  PoeEvent,
  PoePhashInfo,
  PoeProofData,
  PoeProofExtra,
  PoeProofParams,
  SpConsensusAuraSr25519AppSr25519Public,
  SpCoreEcdsaSignature,
  SpCoreEd25519Public,
  SpCoreEd25519Signature,
  SpCoreSr25519Public,
  SpCoreSr25519Signature,
  SpCoreVoid,
  SpFinalityGrandpaAppPublic,
  SpFinalityGrandpaAppSignature,
  SpFinalityGrandpaEquivocation,
  SpFinalityGrandpaEquivocationProof,
  SpRuntimeArithmeticError,
  SpRuntimeDigest,
  SpRuntimeDigestDigestItem,
  SpRuntimeDispatchError,
  SpRuntimeModuleError,
  SpRuntimeMultiSignature,
  SpRuntimeTokenError,
  SpRuntimeTransactionalError,
  SpVersionRuntimeVersion,
  StatementsCall,
  StatementsClaim,
  StatementsClaimType,
  StatementsError,
  StatementsEvent,
  StatementsExpiration,
  StatementsExpirationType,
  StatementsProportion,
  StatementsSignature,
  StatementsSignatures,
  StatementsStatementData,
  StatementsStatementExtra,
  StatementsValidity,
  WorkflowsCall,
  WorkflowsError,
  WorkflowsEvent,
  WorkflowsOperationVersionReference,
  WorkflowsWorkflowArtifactType,
  WorkflowsWorkflowData,
  WorkflowsWorkflowExtra,
  WorkflowsWorkflowSegment,
} from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    AnagolayRuntimeOriginCaller: AnagolayRuntimeOriginCaller;
    AnagolayRuntimeRuntime: AnagolayRuntimeRuntime;
    AnagolaySupportAnagolayArtifactStructureOperationArtifactType: AnagolaySupportAnagolayArtifactStructureOperationArtifactType;
    AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType: AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType;
    AnagolaySupportAnagolayRecord: AnagolaySupportAnagolayRecord;
    AnagolaySupportAnagolayStructureAnagolayVersionData: AnagolaySupportAnagolayStructureAnagolayVersionData;
    AnagolaySupportAnagolayStructureProofData: AnagolaySupportAnagolayStructureProofData;
    AnagolaySupportAnagolayStructureStatementData: AnagolaySupportAnagolayStructureStatementData;
    AnagolaySupportAnagolayStructureWorkflowData: AnagolaySupportAnagolayStructureWorkflowData;
    AnagolaySupportAnagolayVersionDataOperationArtifactType: AnagolaySupportAnagolayVersionDataOperationArtifactType;
    AnagolaySupportAnagolayVersionDataWorkflowArtifactType: AnagolaySupportAnagolayVersionDataWorkflowArtifactType;
    AnagolaySupportAnagolayVersionExtra: AnagolaySupportAnagolayVersionExtra;
    AnagolaySupportError: AnagolaySupportError;
    AnagolaySupportForWhat: AnagolaySupportForWhat;
    AnagolaySupportWasmArtifactSubType: AnagolaySupportWasmArtifactSubType;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSupportWeightsDispatchClass: FrameSupportWeightsDispatchClass;
    FrameSupportWeightsDispatchInfo: FrameSupportWeightsDispatchInfo;
    FrameSupportWeightsPays: FrameSupportWeightsPays;
    FrameSupportWeightsPerDispatchClassU32: FrameSupportWeightsPerDispatchClassU32;
    FrameSupportWeightsPerDispatchClassU64: FrameSupportWeightsPerDispatchClassU64;
    FrameSupportWeightsPerDispatchClassWeightsPerClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
    FrameSupportWeightsRuntimeDbWeight: FrameSupportWeightsRuntimeDbWeight;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonZeroSender: FrameSystemExtensionsCheckNonZeroSender;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    OperationsCall: OperationsCall;
    OperationsError: OperationsError;
    OperationsEvent: OperationsEvent;
    OperationsOperationArtifactType: OperationsOperationArtifactType;
    OperationsOperationData: OperationsOperationData;
    OperationsOperationExtra: OperationsOperationExtra;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReleases: PalletBalancesReleases;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentEvent: PalletTransactionPaymentEvent;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletUtilityCall: PalletUtilityCall;
    PalletUtilityError: PalletUtilityError;
    PalletUtilityEvent: PalletUtilityEvent;
    PalletVestingCall: PalletVestingCall;
    PalletVestingError: PalletVestingError;
    PalletVestingEvent: PalletVestingEvent;
    PalletVestingReleases: PalletVestingReleases;
    PalletVestingVestingInfo: PalletVestingVestingInfo;
    PoeCall: PoeCall;
    PoeError: PoeError;
    PoeEvent: PoeEvent;
    PoePhashInfo: PoePhashInfo;
    PoeProofData: PoeProofData;
    PoeProofExtra: PoeProofExtra;
    PoeProofParams: PoeProofParams;
    SpConsensusAuraSr25519AppSr25519Public: SpConsensusAuraSr25519AppSr25519Public;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Public: SpCoreEd25519Public;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreSr25519Public: SpCoreSr25519Public;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpFinalityGrandpaAppPublic: SpFinalityGrandpaAppPublic;
    SpFinalityGrandpaAppSignature: SpFinalityGrandpaAppSignature;
    SpFinalityGrandpaEquivocation: SpFinalityGrandpaEquivocation;
    SpFinalityGrandpaEquivocationProof: SpFinalityGrandpaEquivocationProof;
    SpRuntimeArithmeticError: SpRuntimeArithmeticError;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    StatementsCall: StatementsCall;
    StatementsClaim: StatementsClaim;
    StatementsClaimType: StatementsClaimType;
    StatementsError: StatementsError;
    StatementsEvent: StatementsEvent;
    StatementsExpiration: StatementsExpiration;
    StatementsExpirationType: StatementsExpirationType;
    StatementsProportion: StatementsProportion;
    StatementsSignature: StatementsSignature;
    StatementsSignatures: StatementsSignatures;
    StatementsStatementData: StatementsStatementData;
    StatementsStatementExtra: StatementsStatementExtra;
    StatementsValidity: StatementsValidity;
    WorkflowsCall: WorkflowsCall;
    WorkflowsError: WorkflowsError;
    WorkflowsEvent: WorkflowsEvent;
    WorkflowsOperationVersionReference: WorkflowsOperationVersionReference;
    WorkflowsWorkflowArtifactType: WorkflowsWorkflowArtifactType;
    WorkflowsWorkflowData: WorkflowsWorkflowData;
    WorkflowsWorkflowExtra: WorkflowsWorkflowExtra;
    WorkflowsWorkflowSegment: WorkflowsWorkflowSegment;
  } // InterfaceTypes
} // declare module

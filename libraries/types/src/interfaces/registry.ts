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
  AnagolaySupportError,
  AnagolaySupportForWhat,
  AnagolaySupportWasmArtifactSubType,
  FinalityGrandpaEquivocationPrecommit,
  FinalityGrandpaEquivocationPrevote,
  FinalityGrandpaPrecommit,
  FinalityGrandpaPrevote,
  FrameSupportDispatchRawOrigin,
  FrameSupportPalletId,
  FrameSupportScheduleLookupError,
  FrameSupportScheduleMaybeHashed,
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
  OperationsOperation,
  OperationsOperationArtifactType,
  OperationsOperationData,
  OperationsOperationExtra,
  OperationsOperationRecord,
  OperationsOperationVersion,
  OperationsOperationVersionData,
  OperationsOperationVersionExtra,
  OperationsOperationVersionRecord,
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
  PalletSchedulerCall,
  PalletSchedulerError,
  PalletSchedulerEvent,
  PalletSchedulerScheduledV3,
  PalletSudoCall,
  PalletSudoError,
  PalletSudoEvent,
  PalletTimestampCall,
  PalletTransactionPaymentChargeTransactionPayment,
  PalletTransactionPaymentEvent,
  PalletTransactionPaymentReleases,
  PalletTreasuryCall,
  PalletTreasuryError,
  PalletTreasuryEvent,
  PalletTreasuryProposal,
  PalletUniquesCall,
  PalletUniquesCollectionDetails,
  PalletUniquesCollectionMetadata,
  PalletUniquesDestroyWitness,
  PalletUniquesError,
  PalletUniquesEvent,
  PalletUniquesItemDetails,
  PalletUniquesItemMetadata,
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
  PoeProof,
  PoeProofData,
  PoeProofExtra,
  PoeProofRecord,
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
  StatementsStatement,
  StatementsStatementData,
  StatementsStatementExtra,
  StatementsStatementRecord,
  StatementsValidity,
  VerificationCall,
  VerificationError,
  VerificationEvent,
  VerificationOffchainVerificationIndexingData,
  VerificationVerificationAction,
  VerificationVerificationContext,
  VerificationVerificationRequest,
  VerificationVerificationStatus,
  WorkflowsCall,
  WorkflowsError,
  WorkflowsEvent,
  WorkflowsOperationVersionReference,
  WorkflowsWorkflow,
  WorkflowsWorkflowArtifactType,
  WorkflowsWorkflowData,
  WorkflowsWorkflowExtra,
  WorkflowsWorkflowRecord,
  WorkflowsWorkflowSegment,
  WorkflowsWorkflowVersion,
  WorkflowsWorkflowVersionData,
  WorkflowsWorkflowVersionExtra,
  WorkflowsWorkflowVersionRecord
} from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    AnagolayRuntimeOriginCaller: AnagolayRuntimeOriginCaller;
    AnagolayRuntimeRuntime: AnagolayRuntimeRuntime;
    AnagolaySupportAnagolayArtifactStructureOperationArtifactType: AnagolaySupportAnagolayArtifactStructureOperationArtifactType;
    AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType: AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType;
    AnagolaySupportError: AnagolaySupportError;
    AnagolaySupportForWhat: AnagolaySupportForWhat;
    AnagolaySupportWasmArtifactSubType: AnagolaySupportWasmArtifactSubType;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPalletId: FrameSupportPalletId;
    FrameSupportScheduleLookupError: FrameSupportScheduleLookupError;
    FrameSupportScheduleMaybeHashed: FrameSupportScheduleMaybeHashed;
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
    OperationsOperation: OperationsOperation;
    OperationsOperationArtifactType: OperationsOperationArtifactType;
    OperationsOperationData: OperationsOperationData;
    OperationsOperationExtra: OperationsOperationExtra;
    OperationsOperationRecord: OperationsOperationRecord;
    OperationsOperationVersion: OperationsOperationVersion;
    OperationsOperationVersionData: OperationsOperationVersionData;
    OperationsOperationVersionExtra: OperationsOperationVersionExtra;
    OperationsOperationVersionRecord: OperationsOperationVersionRecord;
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
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerScheduledV3: PalletSchedulerScheduledV3;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentEvent: PalletTransactionPaymentEvent;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletTreasuryCall: PalletTreasuryCall;
    PalletTreasuryError: PalletTreasuryError;
    PalletTreasuryEvent: PalletTreasuryEvent;
    PalletTreasuryProposal: PalletTreasuryProposal;
    PalletUniquesCall: PalletUniquesCall;
    PalletUniquesCollectionDetails: PalletUniquesCollectionDetails;
    PalletUniquesCollectionMetadata: PalletUniquesCollectionMetadata;
    PalletUniquesDestroyWitness: PalletUniquesDestroyWitness;
    PalletUniquesError: PalletUniquesError;
    PalletUniquesEvent: PalletUniquesEvent;
    PalletUniquesItemDetails: PalletUniquesItemDetails;
    PalletUniquesItemMetadata: PalletUniquesItemMetadata;
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
    PoeProof: PoeProof;
    PoeProofData: PoeProofData;
    PoeProofExtra: PoeProofExtra;
    PoeProofRecord: PoeProofRecord;
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
    StatementsStatement: StatementsStatement;
    StatementsStatementData: StatementsStatementData;
    StatementsStatementExtra: StatementsStatementExtra;
    StatementsStatementRecord: StatementsStatementRecord;
    StatementsValidity: StatementsValidity;
    VerificationCall: VerificationCall;
    VerificationError: VerificationError;
    VerificationEvent: VerificationEvent;
    VerificationOffchainVerificationIndexingData: VerificationOffchainVerificationIndexingData;
    VerificationVerificationAction: VerificationVerificationAction;
    VerificationVerificationContext: VerificationVerificationContext;
    VerificationVerificationRequest: VerificationVerificationRequest;
    VerificationVerificationStatus: VerificationVerificationStatus;
    WorkflowsCall: WorkflowsCall;
    WorkflowsError: WorkflowsError;
    WorkflowsEvent: WorkflowsEvent;
    WorkflowsOperationVersionReference: WorkflowsOperationVersionReference;
    WorkflowsWorkflow: WorkflowsWorkflow;
    WorkflowsWorkflowArtifactType: WorkflowsWorkflowArtifactType;
    WorkflowsWorkflowData: WorkflowsWorkflowData;
    WorkflowsWorkflowExtra: WorkflowsWorkflowExtra;
    WorkflowsWorkflowRecord: WorkflowsWorkflowRecord;
    WorkflowsWorkflowSegment: WorkflowsWorkflowSegment;
    WorkflowsWorkflowVersion: WorkflowsWorkflowVersion;
    WorkflowsWorkflowVersionData: WorkflowsWorkflowVersionData;
    WorkflowsWorkflowVersionExtra: WorkflowsWorkflowVersionExtra;
    WorkflowsWorkflowVersionRecord: WorkflowsWorkflowVersionRecord;
  } // InterfaceTypes
} // declare module

// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData',
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128',
  },
  /**
   * Lookup7: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64',
  },
  /**
   * Lookup11: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>',
  },
  /**
   * Lookup13: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null',
    },
  },
  /**
   * Lookup16: frame_system::EventRecord<anagolay_runtime::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>',
  },
  /**
   * Lookup18: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256',
      },
    },
  },
  /**
   * Lookup19: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays',
  },
  /**
   * Lookup20: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory'],
  },
  /**
   * Lookup21: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No'],
  },
  /**
   * Lookup22: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
    },
  },
  /**
   * Lookup23: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]',
  },
  /**
   * Lookup24: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported'],
  },
  /**
   * Lookup25: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero'],
  },
  /**
   * Lookup26: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer'],
  },
  /**
   * Lookup27: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null',
    },
  },
  /**
   * Lookup30: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup31: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup32: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u128',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u128',
      },
    },
  },
  /**
   * Lookup33: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved'],
  },
  /**
   * Lookup34: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u128',
        tip: 'u128',
      },
    },
  },
  /**
   * Lookup35: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        oldSudoer: 'Option<AccountId32>',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
    },
  },
  /**
   * Lookup39: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError',
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
    },
  },
  /**
   * Lookup40: pallet_vesting::pallet::Event<T>
   **/
  PalletVestingEvent: {
    _enum: {
      VestingUpdated: {
        account: 'AccountId32',
        unvested: 'u128',
      },
      VestingCompleted: {
        account: 'AccountId32',
      },
    },
  },
  /**
   * Lookup41: operations::pallet::Event<T>
   **/
  OperationsEvent: {
    _enum: {
      OperationCreated: '(AccountId32,Bytes)',
      BadRequestError: '(AccountId32,Bytes)',
    },
  },
  /**
   * Lookup46: poe::pallet::Event<T>
   **/
  PoeEvent: {
    _enum: {
      ProofCreated: '(AccountId32,Bytes)',
      PhashCreated: '(AccountId32,H256)',
      BadRequestError: '(AccountId32,Bytes)',
    },
  },
  /**
   * Lookup47: statements::pallet::Event<T>
   **/
  StatementsEvent: {
    _enum: {
      CopyrightCreated: '(AccountId32,Bytes)',
      OwnershipCreated: '(AccountId32,Bytes)',
      StatementRevoked: '(AccountId32,Bytes)',
      BadRequestError: '(AccountId32,Bytes)',
    },
  },
  /**
   * Lookup48: workflows::pallet::Event<T>
   **/
  WorkflowsEvent: {
    _enum: {
      WorkflowCreated: '(AccountId32,Bytes)',
      BadRequestError: '(AccountId32,Bytes)',
    },
  },
  /**
   * Lookup49: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null',
    },
  },
  /**
   * Lookup53: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text',
  },
  /**
   * Lookup57: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes',
      },
    },
  },
  /**
   * Lookup62: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass',
  },
  /**
   * Lookup63: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass',
  },
  /**
   * Lookup64: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>',
  },
  /**
   * Lookup66: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32',
  },
  /**
   * Lookup67: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32',
  },
  /**
   * Lookup68: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64',
  },
  /**
   * Lookup69: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8',
  },
  /**
   * Lookup75: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: [
      'InvalidSpecName',
      'SpecVersionNeedsToIncrease',
      'FailedToExtractRuntimeVersion',
      'NonDefaultComposite',
      'NonZeroRefCount',
      'CallFiltered',
    ],
  },
  /**
   * Lookup77: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>',
      },
    },
  },
  /**
   * Lookup80: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup81: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup84: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
    },
  },
  /**
   * Lookup85: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>',
  },
  /**
   * Lookup88: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32',
      },
    },
  },
  /**
   * Lookup89: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation',
  },
  /**
   * Lookup90: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit',
    },
  },
  /**
   * Lookup91: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
  },
  /**
   * Lookup92: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32',
  },
  /**
   * Lookup93: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup94: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup97: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
  },
  /**
   * Lookup98: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32',
  },
  /**
   * Lookup100: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup101: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: [
      'PauseFailed',
      'ResumeFailed',
      'ChangePending',
      'TooSoon',
      'InvalidKeyOwnershipProof',
      'InvalidEquivocationProof',
      'DuplicateOffenceReport',
    ],
  },
  /**
   * Lookup103: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons',
  },
  /**
   * Lookup104: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All'],
  },
  /**
   * Lookup107: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128',
  },
  /**
   * Lookup109: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0'],
  },
  /**
   * Lookup110: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>',
      },
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u128',
      },
    },
  },
  /**
   * Lookup115: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: [
      'VestingBalance',
      'LiquidityRestrictions',
      'InsufficientBalance',
      'ExistentialDeposit',
      'KeepAlive',
      'ExistingVestingSchedule',
      'DeadAccount',
      'TooManyReserves',
    ],
  },
  /**
   * Lookup117: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2'],
  },
  /**
   * Lookup118: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call',
      },
    },
  },
  /**
   * Lookup120: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'AnagolayRuntimeOriginCaller',
        call: 'Call',
      },
      force_batch: {
        calls: 'Vec<Call>',
      },
    },
  },
  /**
   * Lookup122: anagolay_runtime::OriginCaller
   **/
  AnagolayRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      Void: 'SpCoreVoid',
    },
  },
  /**
   * Lookup123: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null',
    },
  },
  /**
   * Lookup124: pallet_vesting::pallet::Call<T>
   **/
  PalletVestingCall: {
    _enum: {
      vest: 'Null',
      vest_other: {
        target: 'MultiAddress',
      },
      vested_transfer: {
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo',
      },
      force_vested_transfer: {
        source: 'MultiAddress',
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo',
      },
      merge_schedules: {
        schedule1Index: 'u32',
        schedule2Index: 'u32',
      },
    },
  },
  /**
   * Lookup125: pallet_vesting::vesting_info::VestingInfo<Balance, BlockNumber>
   **/
  PalletVestingVestingInfo: {
    locked: 'u128',
    perBlock: 'u128',
    startingBlock: 'u32',
  },
  /**
   * Lookup126: operations::pallet::Call<T>
   **/
  OperationsCall: {
    _enum: {
      create: {
        operationData: 'OperationsOperationData',
        versionData: 'AnagolaySupportAnagolayVersionDataOperationArtifactType',
      },
      version_approve: {
        operationId: 'Bytes',
      },
    },
  },
  /**
   * Lookup127: operations::types::OperationData
   **/
  OperationsOperationData: {
    name: 'Bytes',
    description: 'Bytes',
    inputs: 'Vec<Bytes>',
    config: 'BTreeMap<Bytes, Vec<Bytes>>',
    groups: 'Vec<AnagolaySupportForWhat>',
    output: 'Bytes',
    repository: 'Bytes',
    license: 'Bytes',
    features: 'Vec<Bytes>',
  },
  /**
   * Lookup136: anagolay_support::types::ForWhat
   **/
  AnagolaySupportForWhat: {
    _enum: ['GENERIC', 'PHOTO', 'CAMERA', 'LENS', 'SMARTPHONE', 'USER', 'SYS', 'FLOWCONTROL'],
  },
  /**
   * Lookup139: anagolay_support::types::AnagolayVersionData<operations::types::OperationArtifactType>
   **/
  AnagolaySupportAnagolayVersionDataOperationArtifactType: {
    entityId: 'Option<Bytes>',
    parentId: 'Option<Bytes>',
    artifacts: 'Vec<AnagolaySupportAnagolayArtifactStructureOperationArtifactType>',
  },
  /**
   * Lookup140: operations::types::OperationArtifactType
   **/
  OperationsOperationArtifactType: {
    _enum: {
      Docs: 'Null',
      Git: 'Null',
      Wasm: 'AnagolaySupportWasmArtifactSubType',
    },
  },
  /**
   * Lookup141: anagolay_support::types::WasmArtifactSubType
   **/
  AnagolaySupportWasmArtifactSubType: {
    _enum: ['Cjs', 'Esm', 'Wasm', 'Web'],
  },
  /**
   * Lookup144: anagolay_support::types::AnagolayArtifactStructure<operations::types::OperationArtifactType>
   **/
  AnagolaySupportAnagolayArtifactStructureOperationArtifactType: {
    artifactType: 'OperationsOperationArtifactType',
    fileExtension: 'Bytes',
    ipfsCid: 'Bytes',
  },
  /**
   * Lookup146: poe::pallet::Call<T>
   **/
  PoeCall: {
    _enum: {
      create_proof: {
        proofData: 'PoeProofData',
      },
      save_phash: {
        phashInfo: 'PoePhashInfo',
      },
    },
  },
  /**
   * Lookup147: poe::types::ProofData
   **/
  PoeProofData: {
    workflowId: 'Bytes',
    prevId: 'Bytes',
    creator: 'Bytes',
    groups: 'Vec<AnagolaySupportForWhat>',
    params: 'Vec<PoeProofParams>',
  },
  /**
   * Lookup149: poe::types::ProofParams
   **/
  PoeProofParams: {
    k: 'Bytes',
    v: 'Bytes',
  },
  /**
   * Lookup152: poe::types::PhashInfo
   **/
  PoePhashInfo: {
    pHash: 'Bytes',
    proofId: 'Bytes',
  },
  /**
   * Lookup154: statements::pallet::Call<T>
   **/
  StatementsCall: {
    _enum: {
      create_copyright: {
        statementData: 'StatementsStatementData',
      },
      create_ownership: {
        statementData: 'StatementsStatementData',
      },
      revoke: {
        statementId: 'Bytes',
      },
    },
  },
  /**
   * Lookup155: statements::types::StatementData
   **/
  StatementsStatementData: {
    signatures: 'StatementsSignatures',
    claim: 'StatementsClaim',
  },
  /**
   * Lookup156: statements::types::Signatures
   **/
  StatementsSignatures: {
    holder: 'StatementsSignature',
    issuer: 'StatementsSignature',
  },
  /**
   * Lookup157: statements::types::Signature
   **/
  StatementsSignature: {
    sigKey: 'Bytes',
    sig: 'Bytes',
    cid: 'Bytes',
  },
  /**
   * Lookup159: statements::types::Claim
   **/
  StatementsClaim: {
    prevId: 'Option<Bytes>',
    poeId: 'Bytes',
    workflowId: 'Bytes',
    proportion: 'StatementsProportion',
    subjectId: 'Bytes',
    holder: 'Bytes',
    issuer: 'Bytes',
    claimType: 'StatementsClaimType',
    valid: 'StatementsValidity',
    expiration: 'StatementsExpiration',
    onExpiration: 'Bytes',
  },
  /**
   * Lookup160: statements::types::Proportion
   **/
  StatementsProportion: {
    sign: 'Bytes',
    name: 'Bytes',
    value: 'Bytes',
  },
  /**
   * Lookup161: statements::types::ClaimType
   **/
  StatementsClaimType: {
    _enum: ['Copyright', 'Ownership'],
  },
  /**
   * Lookup162: statements::types::Validity
   **/
  StatementsValidity: {
    from: 'Bytes',
    until: 'Bytes',
  },
  /**
   * Lookup163: statements::types::Expiration
   **/
  StatementsExpiration: {
    expirationType: 'StatementsExpirationType',
    value: 'Bytes',
  },
  /**
   * Lookup164: statements::types::ExpirationType
   **/
  StatementsExpirationType: {
    _enum: ['Forever', 'Years', 'Months', 'Days', 'Minutes', 'Seconds'],
  },
  /**
   * Lookup165: workflows::pallet::Call<T>
   **/
  WorkflowsCall: {
    _enum: {
      create: {
        workflowData: 'WorkflowsWorkflowData',
        versionData: 'AnagolaySupportAnagolayVersionDataWorkflowArtifactType',
      },
    },
  },
  /**
   * Lookup166: workflows::types::WorkflowData
   **/
  WorkflowsWorkflowData: {
    name: 'Bytes',
    creators: 'Vec<Bytes>',
    description: 'Bytes',
    groups: 'Vec<AnagolaySupportForWhat>',
    segments: 'Vec<WorkflowsWorkflowSegment>',
  },
  /**
   * Lookup169: workflows::types::WorkflowSegment
   **/
  WorkflowsWorkflowSegment: {
    inputs: 'Vec<i8>',
    sequence: 'Vec<WorkflowsOperationVersionReference>',
  },
  /**
   * Lookup174: workflows::types::OperationVersionReference
   **/
  WorkflowsOperationVersionReference: {
    versionId: 'Bytes',
    config: 'BTreeMap<Bytes, Bytes>',
  },
  /**
   * Lookup181: anagolay_support::types::AnagolayVersionData<workflows::types::WorkflowArtifactType>
   **/
  AnagolaySupportAnagolayVersionDataWorkflowArtifactType: {
    entityId: 'Option<Bytes>',
    parentId: 'Option<Bytes>',
    artifacts: 'Vec<AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType>',
  },
  /**
   * Lookup182: workflows::types::WorkflowArtifactType
   **/
  WorkflowsWorkflowArtifactType: {
    _enum: {
      Docs: 'Null',
      Git: 'Null',
      Wasm: 'AnagolaySupportWasmArtifactSubType',
    },
  },
  /**
   * Lookup184: anagolay_support::types::AnagolayArtifactStructure<workflows::types::WorkflowArtifactType>
   **/
  AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType: {
    artifactType: 'WorkflowsWorkflowArtifactType',
    fileExtension: 'Bytes',
    ipfsCid: 'Bytes',
  },
  /**
   * Lookup186: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo'],
  },
  /**
   * Lookup187: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls'],
  },
  /**
   * Lookup190: pallet_vesting::Releases
   **/
  PalletVestingReleases: {
    _enum: ['V0', 'V1'],
  },
  /**
   * Lookup191: pallet_vesting::pallet::Error<T>
   **/
  PalletVestingError: {
    _enum: [
      'NotVesting',
      'AtMaxVestingSchedules',
      'AmountLow',
      'ScheduleIndexOutOfBounds',
      'InvalidScheduleParams',
    ],
  },
  /**
   * Lookup192: anagolay_support::pallet::Error<T>
   **/
  AnagolaySupportError: {
    _enum: ['MaxArtifactsLimitReached'],
  },
  /**
   * Lookup196: operations::types::OperationExtra
   **/
  OperationsOperationExtra: 'Null',
  /**
   * Lookup202: anagolay_support::types::AnagolayVersionExtra
   **/
  AnagolaySupportAnagolayVersionExtra: {
    createdAt: 'u64',
  },
  /**
   * Lookup204: operations::pallet::Error<T>
   **/
  OperationsError: {
    _enum: [
      'OperationAlreadyExists',
      'OperationVersionPackageAlreadyExists',
      'OperationAlreadyInitialized',
      'BadRequest',
      'MaxArtifactsLimitReached',
      'MaxVersionsPerOperationLimitReached',
    ],
  },
  /**
   * Lookup206: anagolay_support::types::AnagolayStructure<poe::types::ProofData, poe::types::ProofExtra>
   **/
  AnagolaySupportAnagolayStructureProofData: {
    id: 'Bytes',
    data: 'PoeProofData',
    extra: 'Option<PoeProofExtra>',
  },
  /**
   * Lookup207: poe::types::ProofExtra
   **/
  PoeProofExtra: 'Null',
  /**
   * Lookup210: poe::pallet::Error<T>
   **/
  PoeError: {
    _enum: [
      'ProofAlreadyClaimed',
      'NoSuchProof',
      'NoSuchWorkflow',
      'ProofWorkflowTypeMismatch',
      'PHashAndProofIdComboAlreadyExist',
      'BadRequest',
    ],
  },
  /**
   * Lookup212: anagolay_support::types::AnagolayStructure<statements::types::StatementData, statements::types::StatementExtra>
   **/
  AnagolaySupportAnagolayStructureStatementData: {
    id: 'Bytes',
    data: 'StatementsStatementData',
    extra: 'Option<StatementsStatementExtra>',
  },
  /**
   * Lookup213: statements::types::StatementExtra
   **/
  StatementsStatementExtra: 'Null',
  /**
   * Lookup216: statements::pallet::Error<T>
   **/
  StatementsError: {
    _enum: [
      'WrongClaimType',
      'ProofHasStatement',
      'NoSuchStatement',
      'StatementHasChildStatement',
      'CreatingChildStatementNotSupported',
      'BadRequest',
      'MaxStatementsPerProofLimitReached',
    ],
  },
  /**
   * Lookup218: anagolay_support::types::AnagolayStructure<workflows::types::WorkflowData, workflows::types::WorkflowExtra>
   **/
  AnagolaySupportAnagolayStructureWorkflowData: {
    id: 'Bytes',
    data: 'WorkflowsWorkflowData',
    extra: 'Option<WorkflowsWorkflowExtra>',
  },
  /**
   * Lookup219: workflows::types::WorkflowExtra
   **/
  WorkflowsWorkflowExtra: 'Null',
  /**
   * Lookup222: anagolay_support::types::AnagolayRecord<anagolay_support::types::AnagolayStructure<anagolay_support::types::AnagolayVersionData<workflows::types::WorkflowArtifactType>, anagolay_support::types::AnagolayVersionExtra>, sp_core::crypto::AccountId32, B>
   **/
  AnagolaySupportAnagolayRecord: {
    record: 'AnagolaySupportAnagolayStructureAnagolayVersionData',
    accountId: 'AccountId32',
    blockNumber: 'u32',
  },
  /**
   * Lookup223: anagolay_support::types::AnagolayStructure<anagolay_support::types::AnagolayVersionData<workflows::types::WorkflowArtifactType>, anagolay_support::types::AnagolayVersionExtra>
   **/
  AnagolaySupportAnagolayStructureAnagolayVersionData: {
    id: 'Bytes',
    data: 'AnagolaySupportAnagolayVersionDataWorkflowArtifactType',
    extra: 'Option<AnagolaySupportAnagolayVersionExtra>',
  },
  /**
   * Lookup224: workflows::pallet::Error<T>
   **/
  WorkflowsError: {
    _enum: [
      'WorkflowAlreadyExists',
      'WorkflowVersionPackageAlreadyExists',
      'WorkflowAlreadyInitialized',
      'BadRequest',
      'MaxArtifactsLimitReached',
      'MaxVersionsPerWorkflowLimitReached',
    ],
  },
  /**
   * Lookup226: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature',
    },
  },
  /**
   * Lookup227: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup228: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup231: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup232: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup233: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup234: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup237: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup238: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup239: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup240: anagolay_runtime::Runtime
   **/
  AnagolayRuntimeRuntime: 'Null',
};

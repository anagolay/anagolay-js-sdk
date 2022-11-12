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
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128'
  },
  /**
   * Lookup7: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64'
  },
  /**
   * Lookup11: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
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
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup16: frame_system::EventRecord<anagolay_runtime::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup18: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportWeightsDispatchInfo'
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportWeightsDispatchInfo'
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32'
      },
      KilledAccount: {
        account: 'AccountId32'
      },
      Remarked: {
        _alias: {
          hash_: 'hash'
        },
        sender: 'AccountId32',
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup19: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays'
  },
  /**
   * Lookup20: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup21: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No']
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
      Transactional: 'SpRuntimeTransactionalError'
    }
  },
  /**
   * Lookup23: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup24: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup25: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup26: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup27: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>'
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
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
        freeBalance: 'u128'
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u128'
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128'
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128'
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u128'
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u128'
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus'
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u128'
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u128'
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup33: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup34: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u128',
        tip: 'u128'
      }
    }
  },
  /**
   * Lookup35: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      },
      KeyChanged: {
        oldSudoer: 'Option<AccountId32>'
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup39: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32'
      },
      Spending: {
        budgetRemaining: 'u128'
      },
      Awarded: {
        proposalIndex: 'u32',
        award: 'u128',
        account: 'AccountId32'
      },
      Rejected: {
        proposalIndex: 'u32',
        slashed: 'u128'
      },
      Burnt: {
        burntFunds: 'u128'
      },
      Rollover: {
        rolloverBalance: 'u128'
      },
      Deposit: {
        value: 'u128'
      },
      SpendApproved: {
        proposalIndex: 'u32',
        amount: 'u128',
        beneficiary: 'AccountId32'
      }
    }
  },
  /**
   * Lookup40: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError'
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError'
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup41: pallet_vesting::pallet::Event<T>
   **/
  PalletVestingEvent: {
    _enum: {
      VestingUpdated: {
        account: 'AccountId32',
        unvested: 'u128'
      },
      VestingCompleted: {
        account: 'AccountId32'
      }
    }
  },
  /**
   * Lookup42: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: {
        when: 'u32',
        index: 'u32'
      },
      Canceled: {
        when: 'u32',
        index: 'u32'
      },
      Dispatched: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        result: 'Result<Null, SpRuntimeDispatchError>'
      },
      CallLookupFailed: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        error: 'FrameSupportScheduleLookupError'
      }
    }
  },
  /**
   * Lookup45: frame_support::traits::schedule::LookupError
   **/
  FrameSupportScheduleLookupError: {
    _enum: ['Unknown', 'BadFormat']
  },
  /**
   * Lookup46: pallet_uniques::pallet::Event<T, I>
   **/
  PalletUniquesEvent: {
    _enum: {
      Created: {
        collection: 'u32',
        creator: 'AccountId32',
        owner: 'AccountId32'
      },
      ForceCreated: {
        collection: 'u32',
        owner: 'AccountId32'
      },
      Destroyed: {
        collection: 'u32'
      },
      Issued: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32'
      },
      Transferred: {
        collection: 'u32',
        item: 'u32',
        from: 'AccountId32',
        to: 'AccountId32'
      },
      Burned: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32'
      },
      Frozen: {
        collection: 'u32',
        item: 'u32'
      },
      Thawed: {
        collection: 'u32',
        item: 'u32'
      },
      CollectionFrozen: {
        collection: 'u32'
      },
      CollectionThawed: {
        collection: 'u32'
      },
      OwnerChanged: {
        collection: 'u32',
        newOwner: 'AccountId32'
      },
      TeamChanged: {
        collection: 'u32',
        issuer: 'AccountId32',
        admin: 'AccountId32',
        freezer: 'AccountId32'
      },
      ApprovedTransfer: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32'
      },
      ApprovalCancelled: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32'
      },
      ItemStatusChanged: {
        collection: 'u32'
      },
      CollectionMetadataSet: {
        collection: 'u32',
        data: 'Bytes',
        isFrozen: 'bool'
      },
      CollectionMetadataCleared: {
        collection: 'u32'
      },
      MetadataSet: {
        collection: 'u32',
        item: 'u32',
        data: 'Bytes',
        isFrozen: 'bool'
      },
      MetadataCleared: {
        collection: 'u32',
        item: 'u32'
      },
      Redeposited: {
        collection: 'u32',
        successfulItems: 'Vec<u32>'
      },
      AttributeSet: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
        value: 'Bytes'
      },
      AttributeCleared: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes'
      },
      OwnershipAcceptanceChanged: {
        who: 'AccountId32',
        maybeCollection: 'Option<u32>'
      },
      CollectionMaxSupplySet: {
        collection: 'u32',
        maxSupply: 'u32'
      }
    }
  },
  /**
   * Lookup53: operations::pallet::Event<T>
   **/
  OperationsEvent: {
    _enum: {
      OperationCreated: '(AccountId32,Bytes)',
      BadRequestError: '(AccountId32,Bytes)'
    }
  },
  /**
   * Lookup58: poe::pallet::Event<T>
   **/
  PoeEvent: {
    _enum: {
      ProofCreated: '(AccountId32,Bytes)',
      PhashCreated: '(AccountId32,H256)',
      BadRequestError: '(AccountId32,Bytes)'
    }
  },
  /**
   * Lookup60: statements::pallet::Event<T>
   **/
  StatementsEvent: {
    _enum: {
      CopyrightCreated: '(AccountId32,Bytes)',
      OwnershipCreated: '(AccountId32,Bytes)',
      StatementRevoked: '(AccountId32,Bytes)',
      BadRequestError: '(AccountId32,Bytes)'
    }
  },
  /**
   * Lookup62: workflows::pallet::Event<T>
   **/
  WorkflowsEvent: {
    _enum: {
      WorkflowCreated: '(AccountId32,Bytes)',
      BadRequestError: '(AccountId32,Bytes)'
    }
  },
  /**
   * Lookup64: verification::pallet::Event<T>
   **/
  VerificationEvent: {
    _enum: {
      VerificationRequested: '(AccountId32,VerificationVerificationRequest)',
      VerificationSuccessful: '(AccountId32,VerificationVerificationRequest)',
      VerificationFailed: '(AccountId32,AccountId32,VerificationVerificationRequest,Bytes)'
    }
  },
  /**
   * Lookup65: verification::types::VerificationRequest<T>
   **/
  VerificationVerificationRequest: {
    context: 'VerificationVerificationContext',
    action: 'VerificationVerificationAction',
    status: 'VerificationVerificationStatus',
    holder: 'AccountId32',
    key: 'Bytes',
    id: 'Option<Bytes>'
  },
  /**
   * Lookup66: verification::types::VerificationContext
   **/
  VerificationVerificationContext: {
    _enum: {
      UrlForDomain: '(Bytes,Bytes)',
      UrlForDomainWithUsername: '(Bytes,Bytes,Bytes)',
      UrlForDomainWithSubdomain: '(Bytes,Bytes,Bytes)',
      UrlForDomainWithUsernameAndRepository: '(Bytes,Bytes,Bytes,Bytes)'
    }
  },
  /**
   * Lookup69: verification::types::VerificationAction
   **/
  VerificationVerificationAction: {
    _enum: ['DnsTxtRecord']
  },
  /**
   * Lookup70: verification::types::VerificationStatus
   **/
  VerificationVerificationStatus: {
    _enum: {
      Waiting: 'Null',
      Pending: 'Null',
      Failure: 'Bytes',
      Success: 'Null'
    }
  },
  /**
   * Lookup72: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup75: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup78: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill'
      },
      remark: {
        remark: 'Bytes'
      },
      set_heap_pages: {
        pages: 'u64'
      },
      set_code: {
        code: 'Bytes'
      },
      set_code_without_checks: {
        code: 'Bytes'
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>'
      },
      kill_storage: {
        _alias: {
          keys_: 'keys'
        },
        keys_: 'Vec<Bytes>'
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32'
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup83: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup84: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup85: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup87: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup88: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup89: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup90: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8'
  },
  /**
   * Lookup96: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: [
      'InvalidSpecName',
      'SpecVersionNeedsToIncrease',
      'FailedToExtractRuntimeVersion',
      'NonDefaultComposite',
      'NonZeroRefCount',
      'CallFiltered'
    ]
  },
  /**
   * Lookup98: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup101: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup102: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup105: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32'
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup106: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup108: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid'
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid'
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup109: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup110: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup111: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup112: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup113: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup114: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup117: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup118: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup120: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup121: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: [
      'PauseFailed',
      'ResumeFailed',
      'ChangePending',
      'TooSoon',
      'InvalidKeyOwnershipProof',
      'InvalidEquivocationProof',
      'DuplicateOffenceReport'
    ]
  },
  /**
   * Lookup123: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup124: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup127: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup129: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup130: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>'
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>'
      },
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u128>'
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u128>'
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool'
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup135: pallet_balances::pallet::Error<T, I>
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
      'TooManyReserves'
    ]
  },
  /**
   * Lookup137: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup138: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call'
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64'
      },
      set_key: {
        _alias: {
          new_: 'new'
        },
        new_: 'MultiAddress'
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup140: pallet_treasury::pallet::Call<T, I>
   **/
  PalletTreasuryCall: {
    _enum: {
      propose_spend: {
        value: 'Compact<u128>',
        beneficiary: 'MultiAddress'
      },
      reject_proposal: {
        proposalId: 'Compact<u32>'
      },
      approve_proposal: {
        proposalId: 'Compact<u32>'
      },
      spend: {
        amount: 'Compact<u128>',
        beneficiary: 'MultiAddress'
      },
      remove_approval: {
        proposalId: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup141: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>'
      },
      as_derivative: {
        index: 'u16',
        call: 'Call'
      },
      batch_all: {
        calls: 'Vec<Call>'
      },
      dispatch_as: {
        asOrigin: 'AnagolayRuntimeOriginCaller',
        call: 'Call'
      },
      force_batch: {
        calls: 'Vec<Call>'
      }
    }
  },
  /**
   * Lookup143: anagolay_runtime::OriginCaller
   **/
  AnagolayRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      Void: 'SpCoreVoid'
    }
  },
  /**
   * Lookup144: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup145: pallet_vesting::pallet::Call<T>
   **/
  PalletVestingCall: {
    _enum: {
      vest: 'Null',
      vest_other: {
        target: 'MultiAddress'
      },
      vested_transfer: {
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo'
      },
      force_vested_transfer: {
        source: 'MultiAddress',
        target: 'MultiAddress',
        schedule: 'PalletVestingVestingInfo'
      },
      merge_schedules: {
        schedule1Index: 'u32',
        schedule2Index: 'u32'
      }
    }
  },
  /**
   * Lookup146: pallet_vesting::vesting_info::VestingInfo<Balance, BlockNumber>
   **/
  PalletVestingVestingInfo: {
    locked: 'u128',
    perBlock: 'u128',
    startingBlock: 'u32'
  },
  /**
   * Lookup147: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      },
      cancel: {
        when: 'u32',
        index: 'u32'
      },
      schedule_named: {
        id: 'Bytes',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      },
      cancel_named: {
        id: 'Bytes'
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      }
    }
  },
  /**
   * Lookup149: frame_support::traits::schedule::MaybeHashed<anagolay_runtime::Call, primitive_types::H256>
   **/
  FrameSupportScheduleMaybeHashed: {
    _enum: {
      Value: 'Call',
      Hash: 'H256'
    }
  },
  /**
   * Lookup150: pallet_uniques::pallet::Call<T, I>
   **/
  PalletUniquesCall: {
    _enum: {
      create: {
        collection: 'u32',
        admin: 'MultiAddress'
      },
      force_create: {
        collection: 'u32',
        owner: 'MultiAddress',
        freeHolding: 'bool'
      },
      destroy: {
        collection: 'u32',
        witness: 'PalletUniquesDestroyWitness'
      },
      mint: {
        collection: 'u32',
        item: 'u32',
        owner: 'MultiAddress'
      },
      burn: {
        collection: 'u32',
        item: 'u32',
        checkOwner: 'Option<MultiAddress>'
      },
      transfer: {
        collection: 'u32',
        item: 'u32',
        dest: 'MultiAddress'
      },
      redeposit: {
        collection: 'u32',
        items: 'Vec<u32>'
      },
      freeze: {
        collection: 'u32',
        item: 'u32'
      },
      thaw: {
        collection: 'u32',
        item: 'u32'
      },
      freeze_collection: {
        collection: 'u32'
      },
      thaw_collection: {
        collection: 'u32'
      },
      transfer_ownership: {
        collection: 'u32',
        owner: 'MultiAddress'
      },
      set_team: {
        collection: 'u32',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress'
      },
      approve_transfer: {
        collection: 'u32',
        item: 'u32',
        delegate: 'MultiAddress'
      },
      cancel_approval: {
        collection: 'u32',
        item: 'u32',
        maybeCheckDelegate: 'Option<MultiAddress>'
      },
      force_item_status: {
        collection: 'u32',
        owner: 'MultiAddress',
        issuer: 'MultiAddress',
        admin: 'MultiAddress',
        freezer: 'MultiAddress',
        freeHolding: 'bool',
        isFrozen: 'bool'
      },
      set_attribute: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
        value: 'Bytes'
      },
      clear_attribute: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes'
      },
      set_metadata: {
        collection: 'u32',
        item: 'u32',
        data: 'Bytes',
        isFrozen: 'bool'
      },
      clear_metadata: {
        collection: 'u32',
        item: 'u32'
      },
      set_collection_metadata: {
        collection: 'u32',
        data: 'Bytes',
        isFrozen: 'bool'
      },
      clear_collection_metadata: {
        collection: 'u32'
      },
      set_accept_ownership: {
        maybeCollection: 'Option<u32>'
      },
      set_collection_max_supply: {
        collection: 'u32',
        maxSupply: 'u32'
      }
    }
  },
  /**
   * Lookup151: pallet_uniques::types::DestroyWitness
   **/
  PalletUniquesDestroyWitness: {
    items: 'Compact<u32>',
    itemMetadatas: 'Compact<u32>',
    attributes: 'Compact<u32>'
  },
  /**
   * Lookup153: operations::pallet::Call<T>
   **/
  OperationsCall: {
    _enum: {
      create: {
        operationData: 'OperationsOperationData',
        versionData: 'OperationsOperationVersionData'
      },
      version_approve: {
        operationId: 'Bytes'
      }
    }
  },
  /**
   * Lookup154: operations::types::OperationData
   **/
  OperationsOperationData: {
    name: 'Bytes',
    description: 'Bytes',
    inputs: 'Vec<Bytes>',
    config: 'AnagolaySupportMapsSerializableMaybeSerializableBoundedBTreeMapBoundedVec',
    groups: 'Vec<AnagolaySupportForWhat>',
    output: 'Bytes',
    repository: 'Bytes',
    license: 'Bytes',
    features: 'Vec<Bytes>'
  },
  /**
   * Lookup157: anagolay_support::types::maps::serializable::MaybeSerializableBoundedBTreeMap<anagolay_support::types::characters::Characters, sp_runtime::bounded::bounded_vec::BoundedVec<anagolay_support::types::characters::Characters, S>, anagolay_support::constants::MaxOperationConfigEntriesGet>
   **/
  AnagolaySupportMapsSerializableMaybeSerializableBoundedBTreeMapBoundedVec: 'BTreeMap<Bytes, Vec<Bytes>>',
  /**
   * Lookup159: anagolay_support::constants::MaxOperationConfigEntriesGet
   **/
  AnagolaySupportConstantsMaxOperationConfigEntriesGet: 'Null',
  /**
   * Lookup165: anagolay_support::types::ForWhat
   **/
  AnagolaySupportForWhat: {
    _enum: ['GENERIC', 'PHOTO', 'CAMERA', 'LENS', 'SMARTPHONE', 'USER', 'SYS', 'FLOWCONTROL']
  },
  /**
   * Lookup168: operations::types::OperationVersionData
   **/
  OperationsOperationVersionData: {
    entityId: 'Option<Bytes>',
    parentId: 'Option<Bytes>',
    artifacts: 'Vec<AnagolaySupportAnagolayArtifactStructureOperationArtifactType>'
  },
  /**
   * Lookup173: anagolay_support::types::AnagolayArtifactStructure<operations::types::OperationArtifactType>
   **/
  AnagolaySupportAnagolayArtifactStructureOperationArtifactType: {
    artifactType: 'OperationsOperationArtifactType',
    fileExtension: 'Bytes',
    ipfsCid: 'Bytes'
  },
  /**
   * Lookup174: operations::types::OperationArtifactType
   **/
  OperationsOperationArtifactType: {
    _enum: {
      Docs: 'Null',
      Git: 'Null',
      Wasm: 'AnagolaySupportWasmArtifactSubType'
    }
  },
  /**
   * Lookup175: anagolay_support::types::WasmArtifactSubType
   **/
  AnagolaySupportWasmArtifactSubType: {
    _enum: ['Cjs', 'Esm', 'Wasm', 'Web']
  },
  /**
   * Lookup178: poe::pallet::Call<T>
   **/
  PoeCall: {
    _enum: {
      create_proof: {
        proofData: 'PoeProofData'
      },
      save_phash: {
        phashInfo: 'PoePhashInfo'
      }
    }
  },
  /**
   * Lookup179: poe::types::ProofData
   **/
  PoeProofData: {
    workflowId: 'Bytes',
    prevId: 'Bytes',
    creator: 'Bytes',
    groups: 'Vec<AnagolaySupportForWhat>',
    params: 'Vec<Bytes>'
  },
  /**
   * Lookup181: poe::types::PhashInfo
   **/
  PoePhashInfo: {
    pHash: 'Bytes',
    proofId: 'Bytes'
  },
  /**
   * Lookup183: statements::pallet::Call<T>
   **/
  StatementsCall: {
    _enum: {
      create_copyright: {
        statementData: 'StatementsStatementData'
      },
      create_ownership: {
        statementData: 'StatementsStatementData'
      },
      revoke: {
        statementId: 'Bytes'
      }
    }
  },
  /**
   * Lookup184: statements::types::StatementData
   **/
  StatementsStatementData: {
    signatures: 'StatementsSignatures',
    claim: 'StatementsClaim'
  },
  /**
   * Lookup185: statements::types::Signatures
   **/
  StatementsSignatures: {
    holder: 'StatementsSignature',
    issuer: 'StatementsSignature'
  },
  /**
   * Lookup186: statements::types::Signature
   **/
  StatementsSignature: {
    sigKey: 'Bytes',
    sig: 'Bytes',
    cid: 'Bytes'
  },
  /**
   * Lookup189: statements::types::Claim
   **/
  StatementsClaim: {
    prevId: 'Option<Bytes>',
    poeId: 'Bytes',
    proportion: 'StatementsProportion',
    subjectId: 'Bytes',
    holder: 'Bytes',
    issuer: 'Bytes',
    claimType: 'StatementsClaimType',
    valid: 'StatementsValidity',
    expiration: 'StatementsExpiration',
    onExpiration: 'Bytes'
  },
  /**
   * Lookup191: statements::types::Proportion
   **/
  StatementsProportion: {
    sign: 'Bytes',
    name: 'Bytes',
    value: 'Bytes'
  },
  /**
   * Lookup192: statements::types::ClaimType
   **/
  StatementsClaimType: {
    _enum: ['Copyright', 'Ownership']
  },
  /**
   * Lookup193: statements::types::Validity
   **/
  StatementsValidity: {
    from: 'Bytes',
    until: 'Bytes'
  },
  /**
   * Lookup194: statements::types::Expiration
   **/
  StatementsExpiration: {
    expirationType: 'StatementsExpirationType',
    value: 'Bytes'
  },
  /**
   * Lookup195: statements::types::ExpirationType
   **/
  StatementsExpirationType: {
    _enum: ['Forever', 'Years', 'Months', 'Days', 'Minutes', 'Seconds']
  },
  /**
   * Lookup196: workflows::pallet::Call<T>
   **/
  WorkflowsCall: {
    _enum: {
      create: {
        workflowData: 'WorkflowsWorkflowData',
        versionData: 'WorkflowsWorkflowVersionData'
      }
    }
  },
  /**
   * Lookup197: workflows::types::WorkflowData
   **/
  WorkflowsWorkflowData: {
    name: 'Bytes',
    creators: 'Vec<Bytes>',
    description: 'Bytes',
    groups: 'Vec<AnagolaySupportForWhat>',
    segments: 'Vec<WorkflowsWorkflowSegment>'
  },
  /**
   * Lookup200: workflows::types::WorkflowSegment
   **/
  WorkflowsWorkflowSegment: {
    inputs: 'Vec<i8>',
    sequence: 'Vec<WorkflowsOperationVersionReference>'
  },
  /**
   * Lookup205: workflows::types::OperationVersionReference
   **/
  WorkflowsOperationVersionReference: {
    versionId: 'Bytes',
    config: 'AnagolaySupportMapsSerializableMaybeSerializableBoundedBTreeMapCharacters'
  },
  /**
   * Lookup206: anagolay_support::types::maps::serializable::MaybeSerializableBoundedBTreeMap<anagolay_support::types::characters::Characters, anagolay_support::types::characters::Characters, anagolay_support::constants::MaxOperationConfigEntriesGet>
   **/
  AnagolaySupportMapsSerializableMaybeSerializableBoundedBTreeMapCharacters: 'BTreeMap<Bytes, Bytes>',
  /**
   * Lookup213: workflows::types::WorkflowVersionData
   **/
  WorkflowsWorkflowVersionData: {
    entityId: 'Option<Bytes>',
    parentId: 'Option<Bytes>',
    artifacts: 'Vec<AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType>'
  },
  /**
   * Lookup218: anagolay_support::types::AnagolayArtifactStructure<workflows::types::WorkflowArtifactType>
   **/
  AnagolaySupportAnagolayArtifactStructureWorkflowArtifactType: {
    artifactType: 'WorkflowsWorkflowArtifactType',
    fileExtension: 'Bytes',
    ipfsCid: 'Bytes'
  },
  /**
   * Lookup219: workflows::types::WorkflowArtifactType
   **/
  WorkflowsWorkflowArtifactType: {
    _enum: {
      Docs: 'Null',
      Git: 'Null',
      Wasm: 'AnagolaySupportWasmArtifactSubType'
    }
  },
  /**
   * Lookup221: verification::pallet::Call<T>
   **/
  VerificationCall: {
    _enum: {
      request_verification: {
        context: 'VerificationVerificationContext',
        action: 'VerificationVerificationAction'
      },
      perform_verification: {
        request: 'VerificationVerificationRequest'
      },
      submit_verification_status: {
        verificationData: 'VerificationOffchainVerificationIndexingData'
      }
    }
  },
  /**
   * Lookup222: verification::types::offchain::VerificationIndexingData<T>
   **/
  VerificationOffchainVerificationIndexingData: {
    verifier: 'AccountId32',
    request: 'VerificationVerificationRequest'
  },
  /**
   * Lookup223: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup224: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup228: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup229: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: [
      'InsufficientProposersBalance',
      'InvalidIndex',
      'TooManyApprovals',
      'InsufficientPermission',
      'ProposalNotApproved'
    ]
  },
  /**
   * Lookup230: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup233: pallet_vesting::Releases
   **/
  PalletVestingReleases: {
    _enum: ['V0', 'V1']
  },
  /**
   * Lookup234: pallet_vesting::pallet::Error<T>
   **/
  PalletVestingError: {
    _enum: [
      'NotVesting',
      'AtMaxVestingSchedules',
      'AmountLow',
      'ScheduleIndexOutOfBounds',
      'InvalidScheduleParams'
    ]
  },
  /**
   * Lookup237: pallet_scheduler::ScheduledV3<frame_support::traits::schedule::MaybeHashed<anagolay_runtime::Call, primitive_types::H256>, BlockNumber, anagolay_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV3: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'FrameSupportScheduleMaybeHashed',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'AnagolayRuntimeOriginCaller'
  },
  /**
   * Lookup238: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup239: pallet_uniques::types::CollectionDetails<sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletUniquesCollectionDetails: {
    owner: 'AccountId32',
    issuer: 'AccountId32',
    admin: 'AccountId32',
    freezer: 'AccountId32',
    totalDeposit: 'u128',
    freeHolding: 'bool',
    items: 'u32',
    itemMetadatas: 'u32',
    attributes: 'u32',
    isFrozen: 'bool'
  },
  /**
   * Lookup242: pallet_uniques::types::ItemDetails<sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletUniquesItemDetails: {
    owner: 'AccountId32',
    approved: 'Option<AccountId32>',
    isFrozen: 'bool',
    deposit: 'u128'
  },
  /**
   * Lookup243: pallet_uniques::types::CollectionMetadata<DepositBalance, StringLimit>
   **/
  PalletUniquesCollectionMetadata: {
    deposit: 'u128',
    data: 'Bytes',
    isFrozen: 'bool'
  },
  /**
   * Lookup244: pallet_uniques::types::ItemMetadata<DepositBalance, StringLimit>
   **/
  PalletUniquesItemMetadata: {
    deposit: 'u128',
    data: 'Bytes',
    isFrozen: 'bool'
  },
  /**
   * Lookup247: pallet_uniques::pallet::Error<T, I>
   **/
  PalletUniquesError: {
    _enum: [
      'NoPermission',
      'UnknownCollection',
      'AlreadyExists',
      'WrongOwner',
      'BadWitness',
      'InUse',
      'Frozen',
      'WrongDelegate',
      'NoDelegate',
      'Unapproved',
      'Unaccepted',
      'Locked',
      'MaxSupplyReached',
      'MaxSupplyAlreadySet',
      'MaxSupplyTooSmall'
    ]
  },
  /**
   * Lookup248: anagolay_support::pallet::Error<T>
   **/
  AnagolaySupportError: {
    _enum: ['MaxArtifactsLimitReached']
  },
  /**
   * Lookup250: operations::types::OperationRecord<T>
   **/
  OperationsOperationRecord: {
    record: 'OperationsOperation',
    accountId: 'AccountId32',
    blockNumber: 'u32'
  },
  /**
   * Lookup251: operations::types::Operation
   **/
  OperationsOperation: {
    id: 'Bytes',
    data: 'OperationsOperationData',
    extra: 'Option<OperationsOperationExtra>'
  },
  /**
   * Lookup253: operations::types::OperationExtra
   **/
  OperationsOperationExtra: 'Null',
  /**
   * Lookup256: operations::types::OperationVersionRecord<T>
   **/
  OperationsOperationVersionRecord: {
    record: 'OperationsOperationVersion',
    accountId: 'AccountId32',
    blockNumber: 'u32'
  },
  /**
   * Lookup257: operations::types::OperationVersion
   **/
  OperationsOperationVersion: {
    id: 'Bytes',
    data: 'OperationsOperationVersionData',
    extra: 'Option<OperationsOperationVersionExtra>'
  },
  /**
   * Lookup259: operations::types::OperationVersionExtra
   **/
  OperationsOperationVersionExtra: {
    createdAt: 'u64'
  },
  /**
   * Lookup260: operations::pallet::Error<T>
   **/
  OperationsError: {
    _enum: [
      'OperationAlreadyExists',
      'OperationVersionPackageAlreadyExists',
      'OperationAlreadyInitialized',
      'BadRequest',
      'MaxArtifactsLimitReached',
      'MaxVersionsPerOperationLimitReached'
    ]
  },
  /**
   * Lookup262: poe::types::ProofRecord<T>
   **/
  PoeProofRecord: {
    record: 'PoeProof',
    accountId: 'AccountId32',
    blockNumber: 'u32'
  },
  /**
   * Lookup263: poe::types::Proof
   **/
  PoeProof: {
    id: 'Bytes',
    data: 'PoeProofData',
    extra: 'Option<PoeProofExtra>'
  },
  /**
   * Lookup265: poe::types::ProofExtra
   **/
  PoeProofExtra: 'Null',
  /**
   * Lookup269: poe::pallet::Error<T>
   **/
  PoeError: {
    _enum: [
      'ProofAlreadyClaimed',
      'NoSuchProof',
      'NoSuchWorkflow',
      'ProofWorkflowTypeMismatch',
      'PHashAndProofIdComboAlreadyExist',
      'BadRequest'
    ]
  },
  /**
   * Lookup271: statements::types::StatementRecord<T>
   **/
  StatementsStatementRecord: {
    record: 'StatementsStatement',
    accountId: 'AccountId32',
    blockNumber: 'u32'
  },
  /**
   * Lookup272: statements::types::Statement
   **/
  StatementsStatement: {
    id: 'Bytes',
    data: 'StatementsStatementData',
    extra: 'Option<StatementsStatementExtra>'
  },
  /**
   * Lookup274: statements::types::StatementExtra
   **/
  StatementsStatementExtra: 'Null',
  /**
   * Lookup277: statements::pallet::Error<T>
   **/
  StatementsError: {
    _enum: [
      'WrongClaimType',
      'StatementAlreadyExists',
      'ProofHasStatements',
      'NoSuchStatement',
      'StatementHasChildStatement',
      'CreatingChildStatementNotSupported',
      'BadRequest',
      'MaxStatementsPerProofLimitReached',
      'InvalidSignature',
      'UnrecognizedSignature'
    ]
  },
  /**
   * Lookup279: workflows::types::WorkflowRecord<T>
   **/
  WorkflowsWorkflowRecord: {
    record: 'WorkflowsWorkflow',
    accountId: 'AccountId32',
    blockNumber: 'u32'
  },
  /**
   * Lookup280: workflows::types::Workflow
   **/
  WorkflowsWorkflow: {
    id: 'Bytes',
    data: 'WorkflowsWorkflowData',
    extra: 'Option<WorkflowsWorkflowExtra>'
  },
  /**
   * Lookup282: workflows::types::WorkflowExtra
   **/
  WorkflowsWorkflowExtra: 'Null',
  /**
   * Lookup285: workflows::types::WorkflowVersionRecord<T>
   **/
  WorkflowsWorkflowVersionRecord: {
    record: 'WorkflowsWorkflowVersion',
    accountId: 'AccountId32',
    blockNumber: 'u32'
  },
  /**
   * Lookup286: workflows::types::WorkflowVersion
   **/
  WorkflowsWorkflowVersion: {
    id: 'Bytes',
    data: 'WorkflowsWorkflowVersionData',
    extra: 'Option<WorkflowsWorkflowVersionExtra>'
  },
  /**
   * Lookup288: workflows::types::WorkflowVersionExtra
   **/
  WorkflowsWorkflowVersionExtra: {
    createdAt: 'u64'
  },
  /**
   * Lookup289: workflows::pallet::Error<T>
   **/
  WorkflowsError: {
    _enum: [
      'WorkflowAlreadyExists',
      'WorkflowVersionPackageAlreadyExists',
      'WorkflowAlreadyInitialized',
      'BadRequest',
      'MaxArtifactsLimitReached',
      'MaxVersionsPerWorkflowLimitReached'
    ]
  },
  /**
   * Lookup291: verification::pallet::Error<T>
   **/
  VerificationError: {
    _enum: [
      'VerificationAlreadyIssued',
      'CannotReserveRegistrationFee',
      'VerificationKeyGenerationError',
      'NoMatchingVerificationStrategy',
      'NoSuchVerificationRequest',
      'OffChainVerificationError',
      'InvalidVerificationStatus'
    ]
  },
  /**
   * Lookup293: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup294: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup295: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup298: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup299: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup300: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup301: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup304: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup305: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup306: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup307: anagolay_runtime::Runtime
   **/
  AnagolayRuntimeRuntime: 'Null'
};

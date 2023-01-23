// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/errors';

import type { ApiTypes, AugmentedError } from '@polkadot/api-base/types';

export type __AugmentedError<ApiType extends ApiTypes> = AugmentedError<ApiType>;

declare module '@polkadot/api-base/types/errors' {
  interface AugmentedErrors<ApiType extends ApiTypes> {
    anagolay: {
      /**
       * Insertion of Artifact failed since MaxArtifacts limit is reached
       **/
      MaxArtifactsLimitReached: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    balances: {
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed MaxReserves
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    operations: {
      /**
       * A parameter of the request is invalid or does not respect a given constraint
       **/
      BadRequest: AugmentedError<ApiType>;
      /**
       * Insertion of Artifact failed since MaxArtifacts limit is reached
       **/
      MaxArtifactsLimitReached: AugmentedError<ApiType>;
      /**
       * Insertion of Version failed since MaxVersionsPerOperation limit is reached
       **/
      MaxVersionsPerOperationLimitReached: AugmentedError<ApiType>;
      /**
       * Operation Manifest already exists.
       **/
      OperationAlreadyExists: AugmentedError<ApiType>;
      /**
       * The Operation already has an initial Version and cannot be published again.
       **/
      OperationAlreadyInitialized: AugmentedError<ApiType>;
      /**
       * Version package already exists. If you think this is a bug in our system let us know [here](https://matrix.to/#/!FJvAuDoWRoMVuOFYwL:matrix.org?via=matrix.org).
       **/
      OperationVersionPackageAlreadyExists: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    poe: {
      /**
       * A parameter of the request is invalid or does not respect a given constraint
       **/
      BadRequest: AugmentedError<ApiType>;
      /**
       * The Proof does not exist, so it cannot be revoked
       **/
      NoSuchProof: AugmentedError<ApiType>;
      /**
       * The Workflow associated to the proof does not exist
       **/
      NoSuchWorkflow: AugmentedError<ApiType>;
      /**
       * PHash and ProofId combination already exist
       **/
      PHashAndProofIdComboAlreadyExist: AugmentedError<ApiType>;
      /**
       * This Proof has already been claimed
       **/
      ProofAlreadyClaimed: AugmentedError<ApiType>;
      /**
       * The Workflow groups don't match the Proof groups
       **/
      ProofWorkflowTypeMismatch: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    scheduler: {
      /**
       * Failed to schedule a call
       **/
      FailedToSchedule: AugmentedError<ApiType>;
      /**
       * Cannot find the scheduled call.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Reschedule failed because it does not change scheduled time.
       **/
      RescheduleNoChange: AugmentedError<ApiType>;
      /**
       * Given target block number is in the past.
       **/
      TargetBlockNumberInPast: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    statements: {
      /**
       * A parameter of the request is invalid or does not respect a given constraint
       **/
      BadRequest: AugmentedError<ApiType>;
      /**
       * Create child statement is not yet supported
       **/
      CreatingChildStatementNotSupported: AugmentedError<ApiType>;
      /**
       * Statement signature did not validate
       **/
      InvalidSignature: AugmentedError<ApiType>;
      /**
       * Verification context is not valid
       **/
      InvalidVerificationContext: AugmentedError<ApiType>;
      /**
       * Insertion of Statement failed since MaxStatementsPerProof limit is reached
       **/
      MaxStatementsPerProofLimitReached: AugmentedError<ApiType>;
      /**
       * Statement doesn't exist.
       **/
      NoSuchStatement: AugmentedError<ApiType>;
      /**
       * Proof already has associated statements
       **/
      ProofHasStatements: AugmentedError<ApiType>;
      /**
       * Statement already exists
       **/
      StatementAlreadyExists: AugmentedError<ApiType>;
      /**
       * Statement has child statement and it cannot be revoked
       **/
      StatementHasChildStatement: AugmentedError<ApiType>;
      /**
       * Statement signature could not be parsed correctly
       **/
      UnrecognizedSignature: AugmentedError<ApiType>;
      /**
       * Wrong claim type
       **/
      WrongClaimType: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       *
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    tipping: {
      /**
       * The verification context is not set-up to enable tipping
       **/
      InvalidConfiguration: AugmentedError<ApiType>;
      /**
       * The verification context is not associated to a successful verification request and cannot
       * be tipped
       **/
      InvalidVerificationContext: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    treasury: {
      /**
       * The spend origin is valid but the amount it is allowed to spend is lower than the
       * amount to be spent.
       **/
      InsufficientPermission: AugmentedError<ApiType>;
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * No proposal or bounty at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * Proposal has not been approved.
       **/
      ProposalNotApproved: AugmentedError<ApiType>;
      /**
       * Too many approvals in the queue.
       **/
      TooManyApprovals: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    uniques: {
      /**
       * The item ID has already been used for an item.
       **/
      AlreadyExists: AugmentedError<ApiType>;
      /**
       * Invalid witness data given.
       **/
      BadWitness: AugmentedError<ApiType>;
      /**
       * The item or collection is frozen.
       **/
      Frozen: AugmentedError<ApiType>;
      /**
       * The item ID is already taken.
       **/
      InUse: AugmentedError<ApiType>;
      /**
       * The item is locked.
       **/
      Locked: AugmentedError<ApiType>;
      /**
       * The max supply has already been set.
       **/
      MaxSupplyAlreadySet: AugmentedError<ApiType>;
      /**
       * All items have been minted.
       **/
      MaxSupplyReached: AugmentedError<ApiType>;
      /**
       * The provided max supply is less to the amount of items a collection already has.
       **/
      MaxSupplyTooSmall: AugmentedError<ApiType>;
      /**
       * There is no delegate approved.
       **/
      NoDelegate: AugmentedError<ApiType>;
      /**
       * The signing account has no permission to do the operation.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * The named owner has not signed ownership of the collection is acceptable.
       **/
      Unaccepted: AugmentedError<ApiType>;
      /**
       * No approval exists that would allow the transfer.
       **/
      Unapproved: AugmentedError<ApiType>;
      /**
       * The given item ID is unknown.
       **/
      UnknownCollection: AugmentedError<ApiType>;
      /**
       * The delegate turned out to be different to what was expected.
       **/
      WrongDelegate: AugmentedError<ApiType>;
      /**
       * The owner turned out to be different to what was expected.
       **/
      WrongOwner: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    utility: {
      /**
       * Too many calls batched.
       **/
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    verification: {
      /**
       * The holder can't afford to reserve the amount requested for the verification registration
       * fee
       **/
      CannotReserveRegistrationFee: AugmentedError<ApiType>;
      /**
       * Some processing was attempted on a ['VerificationRequest`] which has an inappropriate status
       **/
      InvalidVerificationStatus: AugmentedError<ApiType>;
      /**
       * There are already a number of accounts attempting to verify the same context and no more
       * will be accepted
       **/
      MaxVerificationRequestsPerContextLimitReached: AugmentedError<ApiType>;
      /**
       * No registered [`VerificationStrategy'] could match the request
       **/
      NoMatchingVerificationStrategy: AugmentedError<ApiType>;
      /**
       * The [`VerificationRequest'] is expected to be stored for the given [`VerificationContext`]
       * but none could be found
       **/
      NoSuchVerificationRequest: AugmentedError<ApiType>;
      /**
       * The off-chain worker encountered an error while attempting verification
       **/
      OffChainVerificationError: AugmentedError<ApiType>;
      /**
       * The VerificationContext is submitted twice, no matter the VerificationStatus
       **/
      VerificationAlreadyIssued: AugmentedError<ApiType>;
      /**
       * The verification invalidation callback failed
       **/
      VerificationInvalidationError: AugmentedError<ApiType>;
      /**
       * The verification key generation failed
       **/
      VerificationKeyGenerationError: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    vesting: {
      /**
       * Amount being transferred is too low to create a vesting schedule.
       **/
      AmountLow: AugmentedError<ApiType>;
      /**
       * The account already has `MaxVestingSchedules` count of schedules and thus
       * cannot add another one. Consider merging existing schedules in order to add another.
       **/
      AtMaxVestingSchedules: AugmentedError<ApiType>;
      /**
       * Failed to create a new schedule because some parameter was invalid.
       **/
      InvalidScheduleParams: AugmentedError<ApiType>;
      /**
       * The account given is not vesting.
       **/
      NotVesting: AugmentedError<ApiType>;
      /**
       * An index was out of bounds of the vesting schedules.
       **/
      ScheduleIndexOutOfBounds: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    workflows: {
      /**
       * A parameter of the request is invalid or does not respect a given constraint
       **/
      BadRequest: AugmentedError<ApiType>;
      /**
       * Insertion of Artifact failed since MaxArtifacts limit is reached
       **/
      MaxArtifactsLimitReached: AugmentedError<ApiType>;
      /**
       * Insertion of Version failed since MaxVersionsPerWorkflow limit is reached
       **/
      MaxVersionsPerWorkflowLimitReached: AugmentedError<ApiType>;
      /**
       * Workflow Manifest already exists.
       **/
      WorkflowAlreadyExists: AugmentedError<ApiType>;
      /**
       * The Workflow already has an initial Version and cannot be published again.
       **/
      WorkflowAlreadyInitialized: AugmentedError<ApiType>;
      /**
       * Version package already exists. If you think this is a bug in our system let us know [here](https://matrix.to/#/!FJvAuDoWRoMVuOFYwL:matrix.org?via=matrix.org).
       **/
      WorkflowVersionPackageAlreadyExists: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module

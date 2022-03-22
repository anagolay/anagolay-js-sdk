// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { OperationId, WorkflowId } from '@anagolay/types/interfaces/anagolay';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { u32 } from '@polkadot/types-codec';
import type { BalanceStatus } from '@polkadot/types/interfaces/balances';
import type { AuthorityList } from '@polkadot/types/interfaces/grandpa';
import type { AccountId, Balance } from '@polkadot/types/interfaces/runtime';
import type { DispatchError, DispatchInfo, DispatchResult } from '@polkadot/types/interfaces/system';

declare module '@polkadot/api-base/types/events' {
  export interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root. \[who, free, reserved\]
       **/
      BalanceSet: AugmentedEvent<ApiType, [AccountId, Balance, Balance]>;
      /**
       * Some amount was deposited (e.g. for transaction fees). \[who, deposit\]
       **/
      Deposit: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss. \[account, balance\]
       **/
      DustLost: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * An account was created with some free balance. \[account, free_balance\]
       **/
      Endowed: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * Some balance was reserved (moved from free to reserved). \[who, value\]
       **/
      Reserved: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       * \[from, to, balance, destination_status\]
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [AccountId, AccountId, Balance, BalanceStatus]>;
      /**
       * Transfer succeeded. \[from, to, value\]
       **/
      Transfer: AugmentedEvent<ApiType, [AccountId, AccountId, Balance]>;
      /**
       * Some balance was unreserved (moved from reserved to free). \[who, value\]
       **/
      Unreserved: AugmentedEvent<ApiType, [AccountId, Balance]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied. \[authority_set\]
       **/
      NewAuthorities: AugmentedEvent<ApiType, [AuthorityList]>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    operations: {
      /**
       * Operation Manifest created together with Version and Packages.
       **/
      OperationCreated: AugmentedEvent<ApiType, [AccountId, OperationId]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied.
       **/
      KeyChanged: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [DispatchResult]>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [DispatchResult]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed. \[error, info\]
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [DispatchError, DispatchInfo]>;
      /**
       * An extrinsic completed successfully. \[info\]
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [DispatchInfo]>;
      /**
       * An \[account\] was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * A new \[account\] was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [AccountId]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error. \[index, error\]
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [u32, DispatchError]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    workflows: {
      /**
       * Workflow Manifest created together with Version and Packages.
       **/
      WorkflowCreated: AugmentedEvent<ApiType, [AccountId, WorkflowId]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module

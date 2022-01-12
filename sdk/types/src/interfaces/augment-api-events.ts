// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { u32 } from '@polkadot/types';
import type { GenericId } from '@anagolay/types/interfaces/anagolay';
import type { BalanceStatus } from '@polkadot/types/interfaces/balances';
import type { AuthorityList } from '@polkadot/types/interfaces/grandpa';
import type { AccountId, Balance, Hash } from '@polkadot/types/interfaces/runtime';
import type { DispatchError, DispatchInfo, DispatchResult } from '@polkadot/types/interfaces/system';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/events' {
  export interface AugmentedEvents<ApiType> {
    anagolay: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Just a dummy event.
       * Event `Something` is declared with a parameter of the type `u32` and `AccountId`
       * To emit this event, we call the deposit function, from our runtime functions
       **/
      SomethingStored: AugmentedEvent<ApiType, [u32, AccountId]>;
    };
    balances: {
      [key: string]: AugmentedEvent<ApiType>;
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
    };
    grandpa: {
      [key: string]: AugmentedEvent<ApiType>;
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
    };
    operations: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Operation Created. \[ who, OperationId \]
       **/
      OperationCreated: AugmentedEvent<ApiType, [AccountId, GenericId]>;
    };
    poe: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Phash is created. \{owner, pHash}\
       **/
      PhashCreated: AugmentedEvent<ApiType, [AccountId, Hash]>;
      /**
       * Proof is created and claimed . \{owner, cid}\
       **/
      ProofCreated: AugmentedEvent<ApiType, [AccountId, GenericId]>;
    };
    rules: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Rule is created
       **/
      RuleCreated: AugmentedEvent<ApiType, [AccountId, GenericId]>;
    };
    statements: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Copyright is created. [who, CID]
       **/
      CopyrightCreated: AugmentedEvent<ApiType, [AccountId, GenericId]>;
      /**
       * Ownership is created. [who, CID]
       **/
      OwnershipCreated: AugmentedEvent<ApiType, [AccountId, GenericId]>;
      /**
       * Statement revoked. [who, CID]
       **/
      StatementRevoked: AugmentedEvent<ApiType, [AccountId, GenericId]>;
    };
    sudo: {
      [key: string]: AugmentedEvent<ApiType>;
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
    };
    system: {
      [key: string]: AugmentedEvent<ApiType>;
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
    };
    utility: {
      [key: string]: AugmentedEvent<ApiType>;
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error. \[index, error\]
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [u32, DispatchError]>;
    };
  }

  export interface DecoratedEvents<ApiType extends ApiTypes> extends AugmentedEvents<ApiType> {
    [key: string]: ModuleEvents<ApiType>;
  }
}

// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { VerificationContext } from '@anagolay/types/interfaces/verification';
import type { Enum, Option, Struct, bool, u64 } from '@polkadot/types-codec';
import type { AccountId, Balance, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name SortTips */
export interface SortTips extends Enum {
  readonly isAsc: boolean;
  readonly isDesc: boolean;
  readonly type: 'Asc' | 'Desc';
}

/** @name Tip */
export interface Tip extends Struct {
  readonly amount: Balance;
  readonly sender: AccountId;
  readonly receiver: AccountId;
  readonly createdAt: u64;
  readonly blockNumber: BlockNumber;
}

/** @name TippingSettings */
export interface TippingSettings extends Struct {
  readonly context: VerificationContext;
  readonly enabled: bool;
  readonly account: Option<AccountId>;
}

export type PHANTOM_TIPPING = 'tipping';

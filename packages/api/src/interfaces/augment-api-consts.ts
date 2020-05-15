// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { Codec } from '@polkadot/types/types';
import { DefaultValues } from './poe';
import { Balance, BalanceOf, Moment } from '@polkadot/types/interfaces/runtime';

declare module '@polkadot/metadata/Decorated/consts/types' {
  export interface Constants {
    [index: string]: ModuleConstants;
    balances: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The minimum amount required to keep an account open.
       **/
      existentialDeposit: AugmentedConst<Balance>;
    };
    poe: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * Default values for the poe, like encoding scheme and hashing functions
       **/
      defaults: AugmentedConst<DefaultValues>;
    };
    timestamp: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The minimum period between blocks. Beware that this is different to the *expected* period
       * that the block production apparatus provides. Your chosen consensus system will generally
       * work with this to determine a sensible block time. e.g. For Aura, it will be double this
       * period on default settings.
       **/
      minimumPeriod: AugmentedConst<Moment>;
    };
    transactionPayment: {
      [index: string]: AugmentedConst<object & Codec>;
      /**
       * The fee to be paid for making a transaction; the base.
       **/
      transactionBaseFee: AugmentedConst<BalanceOf>;
      /**
       * The fee to be paid for making a transaction; the per-byte portion.
       **/
      transactionByteFee: AugmentedConst<BalanceOf>;
    };
  }
}

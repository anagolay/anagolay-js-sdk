// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Vec, u32 } from '@polkadot/types'
import type { Codec } from '@polkadot/types/types'
import type {
  Balance,
  BalanceOf,
  BlockNumber,
  Moment,
  RuntimeDbWeight,
  Weight,
} from '@polkadot/types/interfaces/runtime'
import type { WeightToFeeCoefficient } from '@polkadot/types/interfaces/support'
import type { DefaultValues } from '@sensio/types/interfaces/sensio'
import type { ApiTypes } from '@polkadot/api/types'

declare module '@polkadot/api/types/consts' {
  export interface AugmentedConsts<ApiType> {
    balances: {
      [key: string]: Codec
      /**
       * The minimum amount required to keep an account open.
       **/
      existentialDeposit: Balance & AugmentedConst<ApiType>
    }
    sensio: {
      [key: string]: Codec
      /**
       * Default values for the poe, like encoding scheme and hashing functions
       **/
      defaults: DefaultValues & AugmentedConst<ApiType>
    }
    system: {
      [key: string]: Codec
      /**
       * The base weight of executing a block, independent of the transactions in the block.
       **/
      blockExecutionWeight: Weight & AugmentedConst<ApiType>
      /**
       * The maximum number of blocks to allow in mortal eras.
       **/
      blockHashCount: BlockNumber & AugmentedConst<ApiType>
      /**
       * The weight of runtime database operations the runtime can invoke.
       **/
      dbWeight: RuntimeDbWeight & AugmentedConst<ApiType>
      /**
       * The base weight of an Extrinsic in the block, independent of the of extrinsic being executed.
       **/
      extrinsicBaseWeight: Weight & AugmentedConst<ApiType>
      /**
       * The maximum length of a block (in bytes).
       **/
      maximumBlockLength: u32 & AugmentedConst<ApiType>
      /**
       * The maximum weight of a block.
       **/
      maximumBlockWeight: Weight & AugmentedConst<ApiType>
    }
    timestamp: {
      [key: string]: Codec
      /**
       * The minimum period between blocks. Beware that this is different to the *expected* period
       * that the block production apparatus provides. Your chosen consensus system will generally
       * work with this to determine a sensible block time. e.g. For Aura, it will be double this
       * period on default settings.
       **/
      minimumPeriod: Moment & AugmentedConst<ApiType>
    }
    transactionPayment: {
      [key: string]: Codec
      /**
       * The fee to be paid for making a transaction; the per-byte portion.
       **/
      transactionByteFee: BalanceOf & AugmentedConst<ApiType>
      /**
       * The polynomial that is applied in order to derive fee from weight.
       **/
      weightToFee: Vec<WeightToFeeCoefficient> & AugmentedConst<ApiType>
    }
  }

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts
  }
}

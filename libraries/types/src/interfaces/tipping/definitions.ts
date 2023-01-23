import {
  DefinitionRpc,
  DefinitionRpcSub,
  Definitions,
  DefinitionsCall,
  DefinitionsTypes
} from '@polkadot/types/types';

export const TippingCustomTypes: DefinitionsTypes = {
  TippingSettings: {
    context: 'VerificationContext',
    enabled: 'bool',
    account: 'Option<AccountId>'
  },
  Tip: {
    // Quantity of tokens tipped
    amount: 'Balance',
    // The user that is tipping
    sender: 'AccountId',
    // The account that is receiving the tip
    receiver: 'AccountId',
    // Timestamp of the tip
    createdAt: 'u64',
    // On which block it is stored
    blockNumber: 'BlockNumber'
  },
  // NOT USED ATM
  SortTips: {
    _enum: ['asc', 'desc']
  }
};

const rpc: Record<string, DefinitionRpc | DefinitionRpcSub> = {
  total: {
    description: 'Get the count of tips for a [`VerificationContext`]',
    params: [
      {
        name: 'account_id',
        type: 'AccountId'
      },
      {
        name: 'verification_context',
        type: 'VerificationContext'
      },
      {
        name: 'at',
        type: 'BlockHash',
        isOptional: true
      }
    ],
    type: 'u64'
  },
  totalReceived: {
    description: 'Get the total balance of tips received for a [`VerificationContext`]',
    params: [
      {
        name: 'account_id',
        type: 'AccountId'
      },
      {
        name: 'verification_context',
        type: 'VerificationContext'
      },
      {
        name: 'at',
        type: 'BlockHash',
        isOptional: true
      }
    ],
    type: 'Balance'
  },
  getTips: {
    description:
      'Retrieve tips for specific account and verification context. It is sorted by createdAt DESC. New tips come first.',
    params: [
      {
        name: 'account_id',
        type: 'AccountId'
      },
      {
        name: 'verification_context',
        type: 'VerificationContext'
      },
      {
        name: 'offset',
        type: 'u64'
      },
      {
        name: 'limit',
        type: 'u16'
      },
      {
        name: 'at',
        type: 'BlockHash',
        isOptional: true
      }
    ],
    type: 'Vec<Tip<Balance, AccountId, BlockNumber>>'
  }
};

const runtime: DefinitionsCall = {
  TippingApi: [
    {
      methods: rpc,
      version: 1
    }
  ]
};

export default {
  types: TippingCustomTypes,
  runtime,
  rpc
} as Definitions;

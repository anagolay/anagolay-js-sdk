import {
  DefinitionRpc,
  DefinitionRpcSub,
  Definitions,
  DefinitionsCall,
  DefinitionsTypes
} from '@polkadot/types/types';

export const VerificationCustomTypes: DefinitionsTypes = {
  VerificationStatus: {
    _enum: {
      Waiting: null,
      Pending: null,
      Failure: 'Bytes',
      Success: null
    }
  },
  VerificationContext: {
    _enum: {
      Unbounded: null,
      UrlForDomain: '(Bytes, Bytes)',
      UrlForDomainWithUsername: '(Bytes, Bytes, Bytes)',
      UrlForDomainWithSubdomain: '(Bytes, Bytes, Bytes)',
      UrlForDomainWithUsernameAndRepository: '(Bytes, Bytes, Bytes, Bytes)'
    }
  },
  VerificationAction: {
    _enum: ['DnsTxtRecord']
  },
  VerificationRequest: {
    context: 'VerificationContext',
    action: 'VerificationAction',
    status: 'VerificationStatus',
    holder: 'AccountId',
    key: 'Bytes',
    id: 'Option<Bytes>'
  }
};

const rpc: Record<string, DefinitionRpc | DefinitionRpcSub> = {
  getRequests: {
    description: 'Retrieve verification context data',
    params: [
      {
        name: 'contexts',
        type: 'Vec<VerificationContext>'
      },
      {
        name: 'status',
        type: 'Option<VerificationStatus>'
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
    type: 'Vec<VerificationRequest<AccountId>>'
  },
  getRequestsForAccount: {
    description: 'Retrieve verification contexts for a specific account',
    params: [
      {
        name: 'account',
        type: 'AccountId'
      },
      {
        name: 'status',
        type: 'Option<VerificationStatus>'
      },
      {
        name: 'offset',
        type: 'u64'
      },
      {
        name: 'limit',
        type: 'u16'
      }
    ],
    type: 'Vec<VerificationRequest<AccountId>>'
  }
};

const runtime: DefinitionsCall = {
  VerificationApi: [
    {
      methods: rpc,
      version: 1
    }
  ]
};

export default {
  types: VerificationCustomTypes,
  runtime,
  rpc
} as Definitions;

import { Definitions, DefinitionsTypes } from '@polkadot/types/types';

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

export default {
  types: VerificationCustomTypes
} as Definitions;

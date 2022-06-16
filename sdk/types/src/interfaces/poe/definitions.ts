import { RegistryTypes } from '@polkadot/types/types';
export const PoECustomTypes: RegistryTypes = {
  ProofParams: {
    k: 'Characters',
    v: 'Vec<u8>',
  },
  PhashInfo: {
    pHash: 'Vec<u8>',
    proofId: 'ProofId',
  },
  ProofData: {
    workflowId: 'WorkflowId',
    prevId: 'WorkflowId',
    creator: 'CreatorId',
    groups: 'Vec<ForWhat>',
    params: 'Vec<ProofParams>',
  },
  ProofExtra: {},
  Proof: {
    id: 'GenericId',
    data: 'ProofData',
    extra: 'Option<ProofExtra>',
  },
  ProofRecord: {
    record: 'Proof',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
};

export default {
  types: {
    ...PoECustomTypes,
  },
};

import { Definitions, DefinitionsTypes } from '@polkadot/types/types';
export const PoECustomTypes: DefinitionsTypes = {
  PhashInfo: {
    pHash: 'BoundedVec<u8, Get<u32>>',
    proofId: 'ProofId'
  },
  ProofId: {},
  ProofData: {
    workflowId: 'WorkflowId',
    prevId: 'WorkflowId',
    creator: 'CreatorId',
    groups: 'BoundedVec<ForWhat, Get<u32>>',
    params: 'BoundedVec<Characters, Get<u32>>'
  },
  ProofExtra: {},
  Proof: {
    id: 'ProofId',
    data: 'ProofData',
    extra: 'Option<ProofExtra>'
  },
  ProofRecord: {
    record: 'Proof',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  }
};

export default {
  types: PoECustomTypes
} as Definitions;

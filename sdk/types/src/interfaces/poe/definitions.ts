export const PoECustomTypes = {
  ProofParams: {
    k: 'Vec<u8>',
    v: 'Vec<u8>'
  },
  ProofInfo: {
    proof: 'Proof',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  },
  Proof: {
    id: 'GenericId',
    data: 'ProofData'
  },
  ProofData: {
    ruleId: 'GenericId',
    prevId: 'GenericId',
    creator: 'CreatorId',
    groups: 'Vec<ForWhat>',
    params: 'Vec<ProofParams>'
  },
  RuleInfo: {
    rule: 'Rule',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  },
  PhashInfo: {
    pHash: 'Vec<u8>',
    proofId: 'GenericId'
  }
}

export default {
  types: {
    ...PoECustomTypes
  }
}

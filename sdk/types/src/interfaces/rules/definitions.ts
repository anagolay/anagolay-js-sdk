export const RulesCustomTypes = {
  Rule: {
    id: 'GenericId',
    data: 'RuleData',
    extra: 'Option<RuleExtra>',
  },
  RuleRecord: {
    rule: 'Rule',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
  OperationReference: {
    id: 'GenericId',
    children: 'Vec<OperationReference>',
  },
  RuleData: {
    version: 'u32',
    name: 'Vec<u8>',
    desc: 'Vec<u8>',
    creator: 'CreatorId',
    groups: 'Vec<ForWhat>',
    parentId: 'GenericId',
    ops: 'Vec<OperationReference>',
  },
  RuleExtra: {},
}

export default {
  types: {
    ...RulesCustomTypes,
  },
}

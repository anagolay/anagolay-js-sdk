export const RulesCustomTypes = {
  Rule: {
    id: 'GenericId',
    data: 'RuleData',
  },
  RuleData: {
    version: 'u32',
    name: 'Vec<u8>',
    desc: 'Vec<u8>',
    creator: 'CreatorId',
    groups: 'Vec<ForWhat>',
    parentId: 'GenericId',
    ops: 'Vec<Operation>',
  },
}

export default {
  types: {
    ...RulesCustomTypes,
  },
}

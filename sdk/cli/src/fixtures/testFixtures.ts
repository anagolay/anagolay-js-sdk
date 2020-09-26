import { SnForWhat, SnOperationData, SnProofData, SnRuleData, SnStatementData } from '@sensio/types'

export const defaultCreator =
  'did:substrate:EkVFCcdkkZjBXqfajizFEnSsgxPZVWyZ3yafUF1kusWJ2av/sensio-network'

export const defaultIssuer =
  'did:substrate:Eomg7nj6K8tJ116dZHLEL7tJdfMxD6Ue2Jc3b5qwCo5qZ4b/sensio-network'

export const testOperations: SnOperationData[] = []

export const testRules: SnRuleData[] = [
  {
    version: 1,
    name: 'Test rule',
    desc: 'test rule description',
    creator: defaultCreator,

    groups: [SnForWhat.CAMERA],
    parentId: '',
    ops: [],
  },
]

export const testPoe: SnProofData[] = [
  {
    ruleId: 'rule:0',
    prevId: '',
    creator: defaultCreator,
    groups: [SnForWhat.CAMERA],
    params: [
      {
        k: 'bafy132131231',
        v: 'bafy31231231',
      },
      {
        k: 'bafy132131231',
        v: 'bafy31231231',
      },
    ],
  },
]

export const testStatements: SnStatementData[] = []

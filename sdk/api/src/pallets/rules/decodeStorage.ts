import { StorageKey } from '@polkadot/types'
import { RuleInfo, SnRuleWithStorage } from '@sensio/types'
import decodeFromChain from './decodeFromChain'

export type IncomingParam = [StorageKey, RuleInfo]

/**
 * Decode Rule Query result from the chain
 * @param d Map of StorageKey and ProofInfo, `[StorageKey, ProofInfo]`
 * @returns Decoded PoE with typescript native types and values
 */
export function decodeFromStatementStorage(d: IncomingParam): SnRuleWithStorage {
  const [storageKey, ruleInfo] = d
  return {
    storageKey: storageKey.toString(),
    ruleInfo: {
      rule: decodeFromChain(ruleInfo.rule),
      accountId: ruleInfo.accountId.toString(),
      blockNumber: ruleInfo.blockNumber.toNumber(),
    },
  }
}

export default decodeFromStatementStorage

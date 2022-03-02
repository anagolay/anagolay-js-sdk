import { StorageKey } from '@polkadot/types';

import { AnRuleWithStorage, RuleInfo } from '@anagolay/types';

import decodeFromChain from './decodeFromChain';

export type IncomingParam = [StorageKey, RuleInfo];

/**
 * Decode Rule Query result from the chain
 * @param d Map of StorageKey and ProofInfo, `[StorageKey, ProofInfo]`
 * @returns Decoded PoE with typescript native types and values
 */
export function decodeFromStatementStorage(d: IncomingParam): AnRuleWithStorage {
  const [storageKey, ruleInfo] = d;

  return {
    ruleInfo: {
      accountId: ruleInfo.accountId.toString(),
      blockNumber: ruleInfo.blockNumber.toNumber(),
      rule: decodeFromChain(ruleInfo.rule),
    },
    storageKey: storageKey.toString(),
  };
}

export default decodeFromStatementStorage;

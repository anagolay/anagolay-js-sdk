/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import { AnAccountId, AnBlockNumber, AnCreatorId, AnForWhat, AnGenericId } from '../anagolay/interfaces';

export interface AnRule {
  id: AnGenericId;
  data: AnRuleData;
}

export interface AnOperationReference {
  id: AnGenericId;
  children: AnOperationReference[];
}

export interface AnRuleData {
  version: number;
  name: string;
  desc: string;
  creator: AnCreatorId;
  groups: AnForWhat[];
  parentId: AnGenericId;
  ops: AnOperationReference[];
}

export interface AnRuleWithStorage {
  storageKey: string;
  ruleInfo: AnRuleInfo;
}

export interface AnRuleInfo {
  rule: AnRule;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

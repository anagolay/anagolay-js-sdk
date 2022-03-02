/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import { AnAccountId, AnBlockNumber, AnCreatorId, AnForWhat, AnGenericId } from '../anagolay/interfaces';

export interface AnProofParams {
  k: string;
  v: string;
}

export interface AnProofInfo {
  proof: AnProof;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

export interface AnProof {
  id: AnGenericId;
  data: AnProofData;
}

export interface AnProofData {
  ruleId: AnGenericId;
  prevId: AnGenericId;
  creator: AnCreatorId;
  groups: AnForWhat[];
  params: AnProofParams[];
}

export interface AnPhashInfo {
  pHash: string;
  proofId: AnGenericId;
}

export interface AnProofWithStorage {
  storageKey: string;
  proofInfo: AnProofInfo;
}

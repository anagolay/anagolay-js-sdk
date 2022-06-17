/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import {
  AnAccountId,
  AnBlockNumber,
  AnCharacters,
  AnCreatorId,
  AnForWhat,
  AnGenericId,
  AnProofId,
  AnWorkflowId,
} from '../anagolaySupport/interfaces';

export interface AnProofParams {
  k: AnCharacters;
  v: string;
}

export interface AnPhashInfo {
  pHash: string;
  proofId: AnProofId;
}

export interface AnProofData {
  workflowId: AnWorkflowId;
  prevId: AnWorkflowId;
  creator: AnCreatorId;
  groups: AnForWhat[];
  params: AnProofParams[];
}

export interface AnProofExtra {}

export interface AnProof {
  id: AnGenericId;
  data: AnProofData;
  extra?: AnProofExtra;
}

export interface AnProofRecord {
  proof: AnProof;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

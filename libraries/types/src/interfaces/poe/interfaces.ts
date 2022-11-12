/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import { AnAccountId, AnBlockNumber, AnCreatorId, AnForWhat } from '../anagolaySupport/interfaces';
import { AnWorkflowId } from '../workflows/interfaces';

export type AnProofId = string;

export interface AnPhashInfo {
  pHash: string;
  proofId: AnProofId;
}

export interface AnProofData {
  workflowId: AnWorkflowId;
  prevId: AnWorkflowId;
  creator: AnCreatorId;
  groups: AnForWhat[];
  params: string[];
}

export interface AnProofExtra {}

export interface AnProof {
  id: AnProofId;
  data: AnProofData;
  extra?: AnProofExtra;
}

export interface AnProofRecord {
  proof: AnProof;
  accountId: AnAccountId;
  blockNumber: AnBlockNumber;
}

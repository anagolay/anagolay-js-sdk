/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import {
  SnAccountId,
  SnBlockNumber,
  SnCreatorId,
  SnForWhat,
  SnGenericId,
} from '../sensio/interfaces'

export interface SnProofParams {
  k: string
  v: string
}

export interface SnProofInfo {
  proof: SnProof
  accountId: SnAccountId
  blockNumber: SnBlockNumber
}

export interface SnProof {
  id: SnGenericId
  data: SnProofData
}

export interface SnProofData {
  ruleId: SnGenericId
  prevId: SnGenericId
  creator: SnCreatorId
  groups: SnForWhat[]
  params: SnProofParams[]
}

export interface SnPhashInfo {
  pHash: string
  proofId: SnGenericId
}

export interface SnProofWithStorage {
  storageKey: string
  proofInfo: SnProofInfo
}

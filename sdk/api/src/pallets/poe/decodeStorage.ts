import { StorageKey } from '@polkadot/types'
import { ProofInfo } from '@sensio/types'
import { SnProofWithStorage } from '../../../../types/src/interfaces/poe/interfaces'
import decodeFromChain from './decodeFromChain'

export type IncomingParam = [StorageKey, ProofInfo]
/**
 * Decode PoE Query result from the chain
 * @param d Map of StorageKey and ProofInfo, `[StorageKey, ProofInfo]`
 * @returns Decoded PoE with typescript native types and values
 */

export function decodeFromStatementStorage(d: IncomingParam): SnProofWithStorage {
  const [storageKey, proofInfo] = d
  return {
    storageKey: storageKey.toString(),
    proofInfo: {
      proof: decodeFromChain(proofInfo.proof),
      accountId: proofInfo.accountId.toString(),
      blockNumber: proofInfo.blockNumber.toNumber(),
    },
  }
}

export default decodeFromStatementStorage

import { StorageKey } from '@polkadot/types'
import { OperationInfo, SnOperationWithStorage } from '@sensio/types'
import { decodeOperationFromChain } from './decodeOperationFromChain'
/**
 * Decode Operation Query result from the chain
 * @param op
 */
export function decodeOperationStorage (
  op: [StorageKey, OperationInfo]
): SnOperationWithStorage {
  const [storageKey, operationInfo] = op

  return {
    storageKey: storageKey.toString(),
    operationInfo: {
      operation: decodeOperationFromChain(operationInfo.operation),
      accountId: operationInfo.accountId.toString(),
      blockNumber: operationInfo.blockNumber.toNumber()
    }
  }
}

export default decodeOperationStorage

import { StorageKey } from '@polkadot/types'
import { OperationInfo, SnOperationWithStorage } from '@sensio/types'
import decodeFromChain from './decodeFromChain'
/**
 * Decode Operation Query result from the chain
 * @param op
 */
export function decodeStorage(op: [StorageKey, OperationInfo]): SnOperationWithStorage {
  const [storageKey, operationInfo] = op

  return {
    storageKey: storageKey.toString(),
    operationInfo: {
      operation: decodeFromChain(operationInfo.operation),
      accountId: operationInfo.accountId.toString(),
      blockNumber: operationInfo.blockNumber.toNumber(),
    },
  }
}

export default decodeStorage

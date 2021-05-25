import { StorageKey } from '@polkadot/types'

import { AnOperationWithStorage, OperationInfo } from '@anagolay/types'

import decodeFromChain from './decodeFromChain'

export type IncomingParam = [StorageKey, OperationInfo]

/**
 * Decode Operation Query result from the chain
 * @param op
 */
export function decodeStorage(op: IncomingParam): AnOperationWithStorage {
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

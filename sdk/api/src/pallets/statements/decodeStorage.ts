import { StorageKey } from '@polkadot/types'
import { SnStatementWithStorage, StatementInfo } from '@sensio/types'
import decodeFromChain from './decodeFromChain'

/**
 * Decode Statement Query result from the chain
 * @param d
 */

export function decodeFromStatementStorage(d: [StorageKey, StatementInfo]): SnStatementWithStorage {
  const [storageKey, statementInfo] = d

  return {
    storageKey: storageKey.toString(),
    statementInfo: {
      statement: decodeFromChain(statementInfo.statement),
      accountId: statementInfo.accountId.toString(),
      blockNumber: statementInfo.blockNumber.toNumber(),
    },
  }
}

export default decodeFromStatementStorage

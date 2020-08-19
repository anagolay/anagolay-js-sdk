import api from '@sensio/api'
import { EVENT_NAME_BATCH } from '@sensio/api/pallets/operations/config'
import { getAlice } from '@sensio/api/utils/accounts'
import { SnOperation, SnOperationWithStorage } from '@sensio/types'
import { compose, descend, map, prop, sort } from 'ramda'
import ops from './generators/fixtures/ops'
/**
 * Save the ops TS file to network
 */
export async function saveOpsToChain (): Promise<void> {
  // init the api
  await api.api()

  const operations: SnOperation[] = ops
  const signer = getAlice()
  const o = await api.pallets.operations.saveOperationsBulk(operations, signer)

  o.on(EVENT_NAME_BATCH, p => console.log(p.message))
}

/**
 * Get All Operations from the chain
 */
export async function operationsFromChain (): Promise<void> {
  // init the api
  await api.api()

  const opsFromChain = await api.pallets.operations.getAllDecoded()

  interface TableRowItem {
    id: string
    name: string
    accountId: string
    childrenOps: number
    priority: number
  }

  function makeTableRow (o: SnOperationWithStorage): TableRowItem {
    return {
      id: o.operationInfo.operation.id,
      name: o.operationInfo.operation.data.name,
      accountId: o.operationInfo.accountId,
      childrenOps: o.operationInfo.operation.data.ops.length,
      priority: o.operationInfo.operation.data.priority
    }
  }

  const sortByPriority = sort(descend(prop('priority')))

  console.table(compose(sortByPriority, map(makeTableRow))(opsFromChain))
}

import api from '@sensio/api'
import { EVENT_NAME_BATCH as operatonEventName } from '@sensio/api/pallets/operations/config'
import { getAlice } from '@sensio/api/utils/accounts'
import calculateRecordCid from '@sensio/api/utils/calculateRecordCid'
import saveBatch from '@sensio/api/utils/saveBatch'
import { getLogger } from '@sensio/core/logger'
import {
  SnOperation,
  SnOperationWithStorage,
  SnProof,
  SnProofData,
  SnRule,
  SnSensioClaim,
  SnStatement,
  SnStatementData,
} from '@sensio/types'
import { compose, descend, map, prop, sort } from 'ramda'
import ops from './fixtures/ops'
import * as testData from './fixtures/testFixtures'

const logger = getLogger('sensio:core:execution')

/**
 * Save the ops TS file to network
 */
export async function saveOpsToChain(): Promise<void> {
  // init the api
  await api.api.setupConnection()

  const operations: SnOperation[] = ops
  const signer = getAlice()
  const o = await api.pallets.operations.saveOperationsBulk(operations, signer)

  o.on(operatonEventName, (p) => console.log(p.message))
}

/**
 * Get All Operations from the chain
 */
export async function operationsFromChain(): Promise<void> {
  // init the api
  await api.api.setupConnection()

  const opsFromChain = await api.pallets.operations.getAllDecoded()
  logger.info('getting stuff from chain')
  interface TableRowItem {
    id: string
    name: string
    accountId: string
    childrenOps: number
    priority: number
  }

  function makeTableRow(o: SnOperationWithStorage): TableRowItem {
    return {
      id: o.operationInfo.operation.id,
      name: o.operationInfo.operation.data.name,
      accountId: o.operationInfo.accountId,
      childrenOps: o.operationInfo.operation.data.ops.length,
      priority: o.operationInfo.operation.data.priority,
    }
  }

  const sortByPriority = sort(descend(prop('priority')))

  console.table(compose(sortByPriority, map(makeTableRow))(opsFromChain))
}

export async function installFixtures(): Promise<void> {
  try {
    await api.api.setupConnection()

    const signer = getAlice()

    // 1. create ops

    // 2. create rules
    const rules: SnRule[] = await Promise.all(
      testData.testRules.map(async (r) => {
        return {
          id: await calculateRecordCid(r),
          data: r,
        }
      }),
    )
    const r = await api.pallets.rules.createSubmittableExtrinsics(rules)

    // 3. create poe
    const proofs: SnProof[] = await Promise.all(
      testData.testPoe.map(async (r) => {
        const data: SnProofData = {
          ...r,
          ruleId: rules[r.ruleId.split(':')[1]].id,
        }
        return {
          id: await calculateRecordCid(data),
          data,
        }
      }),
    )
    const p = await api.pallets.poe.createSubmittableExtrinsics(proofs)

    // 4. add ownership statements
    const statements: SnStatement[] = await Promise.all(
      testData.testStatements.map(async (r) => {
        const claim: SnSensioClaim = {
          ...r.claim,
          poeId: proofs[r.claim.poeId.split(':')[1]].id,
          ruleId: rules[r.claim.ruleId.split(':')[1]].id,
        }

        const data: SnStatementData = {
          claim,
          signatures: r.signatures,
        }
        return {
          id: await calculateRecordCid(data),
          data,
        }
      }),
    )
    const s = await api.pallets.statements.createSubmittableExtrinsicsForOwnership(statements)

    const txs = [...r, ...p, ...s]
    const o = await saveBatch(txs, signer)
    o.on('utils::txs::batch', (p) => console.log('batch', p.message))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

/* eslint-disable no-case-declarations */
/**
 * Pallet's api and rpc methods
 * @packageDocumentation
 *
 */
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { StorageKey } from '@polkadot/types'
import { getApi } from '@sensio/api/connection'
import createEventEmitter from '@sensio/api/events'
import { networkCallback } from '@sensio/api/utils'
import {
  OperationInfo,
  SnOperation,
  SnOperationWithStorage
} from '@sensio/types'
import { EventEmitter } from 'events'
import { map } from 'ramda'
import { EVENT_NAME_BATCH, EVENT_NAME_ERROR, EVENT_NAME_SINGLE } from './config'
import decodeOperationStorage from './decodeOperationStorage'
/**
 * Save a single operation to the chain
 * {@link SnOperation}
 * @param op Operation data that we want to save to the chain.
 * @param signer Account that will be owner of the transaction and ones who pays the fees
 */
export async function save (
  op: SnOperation,
  signer: KeyringPair
): Promise<EventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.operations.create(op).signAndSend(signer, {}, params =>
    networkCallback(params, broadcast, {
      success: EVENT_NAME_SINGLE,
      error: EVENT_NAME_ERROR
    })
  )

  // return the event emitter
  return broadcast
}

/**
 * Save many operations in single transaction. It uses the `batch` capability of the chain
 * @param ops
 * @param signer
 *
 * ```ts
  await api.api()

  const operations: SnOperation[] = ops
  const signer = getAlice()
  const o = await api.pallets.operations.saveOperationsBulk(operations, signer)

  o.on(EVENT_NAME_BATCH, p => console.log(p.message))
  ```
 */
export async function saveOperationsBulk (
  ops: SnOperation[],
  signer: KeyringPair
): Promise<EventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()
  const txs = map(createNetworkTx, ops)
  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.utility.batch(txs).signAndSend(signer, {}, params =>
    networkCallback(params, broadcast, {
      success: EVENT_NAME_BATCH,
      error: EVENT_NAME_ERROR
    })
  )

  // return the event emitter
  return broadcast
}

/**
 * Get All operations from the chain, encoded using SCALE codec
 * @returns [Promise<[StorageKey, OperationInfo][]] encoded Storage
 */
export async function getAll (): Promise<[StorageKey, OperationInfo][]> {
  const api = getApi()

  // get them from the network
  return await api.query.operations.operations.entries()
}

/**
 * Get all Operations from the network then decode them
 *
 * @returns the list of the Decoded operations as they are stored.
 */
export async function getAllDecoded (): Promise<SnOperationWithStorage[]> {
  // get them from the network
  const ops = await getAll()

  const decodedOps = map(decodeOperationStorage, ops)

  return decodedOps
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of SnOperations.
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createNetworkTx, ops)
 *  ```
 *
 * @param op
 * @returns the Submittable operation
 *
 */
export function createNetworkTx (
  op: SnOperation
): SubmittableExtrinsic<'promise'> {
  const api = getApi()
  return api.tx.operations.create(op)
}

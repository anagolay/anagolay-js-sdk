/* eslint-disable no-case-declarations */
/**
 * Pallet's api and rpc methods
 * @packageDocumentation
 *
 */
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { map } from 'ramda'

import { getApi } from '@anagolay/api/connection'
import createEventEmitter from '@anagolay/api/events'
import { networkCallback } from '@anagolay/api/utils'
import { AnGenericId, AnOperation, AnOperationWithStorage } from '@anagolay/types'

import { CustomEventEmitter } from '../../events'
import { EVENT_NAME_BATCH, EVENT_NAME_SINGLE } from './config'
import decodeOperationStorage, { IncomingParam } from './decodeStorage'

/**
 * Save a single operation to the chain
 * {@link AnOperation}
 * @param op Operation data that we want to save to the chain.
 * @param signer Account that will be owner of the transaction and ones who pays the fees
 */
export async function save(op: AnOperation, signer: KeyringPair): Promise<CustomEventEmitter> {
  const broadcast = createEventEmitter()

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await createNetworkTx(op).signAndSend(signer, {}, (params) =>
    networkCallback(params, broadcast, EVENT_NAME_SINGLE),
  )

  // return the event emitter
  return broadcast
}

/**
 * Create Submittable transactions
 * @param d
 */
export async function createSubmittableExtrinsics(
  d: AnOperation[],
): Promise<Array<SubmittableExtrinsic<'promise'>>> {
  const txs = map(createNetworkTx, d)

  return txs
}

/**
 * Save many operations in single transaction. It uses the `batch` capability of the chain
 * @param ops
 * @param signer
 *
 * ```ts
  await api.api()

  const operations: AnOperation[] = ops
  const signer = getAlice()
  const o = await api.pallets.operations.saveOperationsBulk(operations, signer)

  o.on(EVENT_NAME_BATCH, p => console.log(p.message))
  ```
 */
export async function saveOperationsBulk(
  ops: AnOperation[],
  signer: KeyringPair,
): Promise<CustomEventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()
  const txs = map(createNetworkTx, ops)
  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  // console.log('nonce', nonce)

  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, (params) => networkCallback(params, broadcast, EVENT_NAME_BATCH))

  // return the event emitter
  return broadcast
}

/**
 * Get All operations from the chain
 * @returns Promise list of a map SCALE encoded Storage
 */
export async function getAll(): Promise<Array<IncomingParam>> {
  const api = getApi()

  // get them from the network
  return api.query.operations.operations.entries()
}

/**
 * Get all Operations from the network then decode them
 *
 * @returns the list of the Decoded operations as they are stored.
 */
export async function getAllDecoded(): Promise<AnOperationWithStorage[]> {
  // get them from the network
  const ops = await getAll()

  const decodedOps = map(decodeOperationStorage, ops)

  return decodedOps
}

/**
 * Get All operations from the chain
 * @returns Promise list of a map SCALE encoded Storage
 */
export async function getOperation(item: AnGenericId): Promise<IncomingParam> {
  const api = getApi()

  // get them from the network
  return (await api.query.operations.operations.entries(item))[0]
}

/**
 * Get some Operations from the network
 *
 * @params items List of Operation IDs
 * @returns the list of the Decoded operations as they are stored.
 */
export async function getSome(items: AnGenericId[]): Promise<IncomingParam[]> {
  return Promise.all(items.map(async (i) => await getOperation(i)))
}

/**
 * Get some Operations from the network then decode them
 *
 * @params items List of Operation IDs
 * @returns the list of the Decoded operations decoded
 */
export async function getSomeDecoded(items: AnGenericId[]): Promise<AnOperationWithStorage[]> {
  // get them from the network
  const ops = await getSome(items)

  return map(decodeOperationStorage, ops)
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of AnOperations.
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
export function createNetworkTx(op: AnOperation): SubmittableExtrinsic<'promise'> {
  const api = getApi()

  return api.tx.operations.create(op)
}

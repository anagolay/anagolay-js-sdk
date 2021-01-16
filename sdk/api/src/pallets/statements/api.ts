/* eslint-disable no-case-declarations */
/**
 * Pallet's api and rpc methods
 * @packageDocumentation
 *
 */
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { getApi } from '@sensio/api/connection'
import createEventEmitter from '@sensio/api/events'
import { networkCallback } from '@sensio/api/utils'
import { encodeTheGenericId } from '@sensio/api/utils/transformations'
import cleanArray from '@sensio/core/util/cleanArray'
import {
  SnGenericId,
  SnSensioClaimType,
  SnSensioStatement,
  SnStatementWithStorage,
} from '@sensio/types'
import { EventEmitter } from 'events'
import { isEmpty, map } from 'ramda'
import { CustomEventEmitter } from '../../events'
import { EVENT_NAME_BATCH, EVENT_NAME_SINGLE } from './config'
import decodeFromStorage, { IncomingParam } from './decodeStorage'

/**
 * Save the statement, a wrapper around the current saving methods
 * @param d Statement that will be saved
 * @param signer Who will be signing the transaction and paying fees?
 */
export async function save(d: SnSensioStatement, signer: KeyringPair): Promise<EventEmitter> {
  switch (d.data.claim.claimType) {
    case SnSensioClaimType.COPYRIGHT:
      return await saveCopyright(d, signer)

    case SnSensioClaimType.OWNERSHIP:
      return await saveOwnership(d, signer)

    default:
      throw new Error('Default case for the claim type is not defined')
  }
}
/**
 * Save the statements, a wrapper around the current bulk saving methods
 * @param d Statements that will be saved
 * @param signer Who will be signing the transaction and paying fees?
 */
export async function saveBulk(
  d: SnSensioStatement[],
  signer: KeyringPair,
): Promise<CustomEventEmitter> {
  // need to group the statements by type then save them in bulk

  const api = getApi()
  const broadcast = createEventEmitter()
  const txs = map(createCorrectSubmittableExtrinsic, d)
  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, (params) => networkCallback(params, broadcast, EVENT_NAME_BATCH))

  // return the event emitter
  return broadcast
}

/**
 * Create correct extrinsic submittable result
 *```ts
 * import { map } from 'ramda'
 * const txs = map(createCorrectSubmittableExtrinsic, d)
 *  ```
 * @param d list of any Statement object
 */
export function createCorrectSubmittableExtrinsic(
  d: SnSensioStatement,
): SubmittableExtrinsic<'promise'> {
  switch (d.data.claim.claimType) {
    case SnSensioClaimType.COPYRIGHT:
      return createSubmittableExtrinsicOfCopyright(d)
    case SnSensioClaimType.OWNERSHIP:
      return createSubmittableExtrinsicOfOwnership(d)
    default:
      throw new Error('Default case for the claim type is not defined')
  }
}

/**
 * Save a single statement to the chain
 * {@link SnStatement}
 * @param d Statement d that we want to save to the chain.
 * @param signer Account that will be owner of the transaction and ones who pays the fees
 */
export async function saveCopyright(
  d: SnSensioStatement,
  signer: KeyringPair,
): Promise<EventEmitter> {
  const broadcast = createEventEmitter()

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await createSubmittableExtrinsicOfCopyright(d).signAndSend(signer, {}, (params) =>
    networkCallback(params, broadcast, EVENT_NAME_SINGLE),
  )

  // return the event emitter
  return broadcast
}
/**
 * Save a single operation to the chain
 * {@link SnStatement}
 * @param d Statement d that we want to save to the chain.
 * @param signer Account that will be owner of the transaction and ones who pays the fees
 */
export async function saveOwnership(
  d: SnSensioStatement,
  signer: KeyringPair,
): Promise<EventEmitter> {
  const broadcast = createEventEmitter()

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await createSubmittableExtrinsicOfOwnership(d).signAndSend(signer, {}, (params) =>
    networkCallback(params, broadcast, EVENT_NAME_SINGLE),
  )

  // return the event emitter
  return broadcast
}

/**
 * Create Submittable Copyright transactions
 *```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsicsForCopyright, d)
 *  ```
 * @param d list of the typescript native Copyright Statement objects
 */
export async function createSubmittableExtrinsicsForCopyright(
  d: SnSensioStatement[],
): Promise<Array<SubmittableExtrinsic<'promise'>>> {
  return map(createSubmittableExtrinsicOfCopyright, d)
}
/**
 * Create Submittable transactions
 * @param d
 */
export async function createSubmittableExtrinsicsForOwnership(
  d: SnSensioStatement[],
): Promise<Array<SubmittableExtrinsic<'promise'>>> {
  const txs = map(createSubmittableExtrinsicOfOwnership, d)

  return txs
}

/**
 * Save many statements in single transaction. It uses the `batch` capability of the chain
 * @param d
 * @param signer
 *
 * ```ts
  await api.api()

  const statements: SnStatement[] = statements
  const signer = getAlice()
  const o = await api.pallets.statements.saveCopyrightsBulk(statements, signer)

  o.on(EVENT_NAME_BATCH, p => console.log(p.message))
  ```
 */
export async function saveCopyrightsBulk(
  d: SnSensioStatement[],
  signer: KeyringPair,
): Promise<EventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()
  const txs = map(createSubmittableExtrinsicOfCopyright, d)
  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, (params) => networkCallback(params, broadcast, EVENT_NAME_BATCH))

  // return the event emitter
  return broadcast
}
/**
 * Save many statements in single transaction. It uses the `batch` capability of the chain
 * @param ops
 * @param signer
 *
 * ```ts
  await api.api()

  const statements: SnStatement[] = statements
  const signer = getAlice()
  const o = await api.pallets.statements.saveOwnershipsBulk(statements, signer)

  o.on(EVENT_NAME_BATCH, p => console.log(p.message))
  ```
 */
export async function saveOwnershipsBulk(
  d: SnSensioStatement[],
  signer: KeyringPair,
): Promise<EventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()
  const txs = map(createSubmittableExtrinsicOfOwnership, d)
  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, (params) => networkCallback(params, broadcast, EVENT_NAME_BATCH))

  // return the event emitter
  return broadcast
}

/**
 * Get one Statement from the chain, encoded using SCALE codec.
 * @param items
 * @returns Return item maps SCALE codec encoded
 */
export async function getOne(item: SnGenericId): Promise<IncomingParam | undefined> {
  const api = getApi()
  const networkItem = await api.query.statements.statements.entries(encodeTheGenericId(item))
  if (isEmpty(networkItem)) {
    return
  } else {
    return networkItem[0]
  }
}

/**
 * Get All statements from the chain, encoded using SCALE codec. Return polkadot encoded Storage
 */
export async function getAll(): Promise<IncomingParam[]> {
  const api = getApi()
  // get them from the network
  return api.query.statements.statements.entries()
}

/**
 * Get all Statements from the network then return the list of the Decoded statements as they are stored.
 */
export async function getAllDecoded(): Promise<SnStatementWithStorage[]> {
  // get them from the network
  const d = await getAll()
  return map(decodeFromStorage, d)
}

/**
 * Get some PoE proofs from the network then return the list of the Decoded proofs
 * @param items
 * @returns Return item maps SCALE codec decoded
 */
export async function getSomeDecoded(items: SnGenericId[] = []): Promise<SnStatementWithStorage[]> {
  const d = await Promise.all(items.map(async (i) => await getOne(i))) // this will return [[record]]
  const cleanedArray = cleanArray<IncomingParam>(d)
  return map(decodeFromStorage, cleanedArray)
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of SnSensioStatement[]. Returns the Submittable statement object
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsicOfCopyright, d)
 *  ```
 * @param d
 *
 */
export function createSubmittableExtrinsicOfCopyright(
  d: SnSensioStatement,
): SubmittableExtrinsic<'promise'> {
  const api = getApi()
  return api.tx.statements.createCopyright(d)
}
/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of SnSensioStatement. Returns the Submittable statement object
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsicOfOwnership, d)
 *  ```
 *
 * @param op
 */
export function createSubmittableExtrinsicOfOwnership(
  d: SnSensioStatement,
): SubmittableExtrinsic<'promise'> {
  const api = getApi()
  return api.tx.statements.createOwnership(d)
}

/**
 * Revoke the statement
 * @param statementId
 */
export function createSubmittableExtrinsicRevoke(
  statementId: SnGenericId,
): SubmittableExtrinsic<'promise'> {
  const api = getApi()
  return api.tx.statements.revoke(encodeTheGenericId(statementId))
}

/**
 * Revoke All statements @FUCK remove this at some point
 */
export async function revokeStatementsBulk(
  d: SnGenericId[],
  signer: KeyringPair,
): Promise<EventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()
  const txs = map(createSubmittableExtrinsicRevoke, d)
  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, (params) => networkCallback(params, broadcast, EVENT_NAME_BATCH))

  // return the event emitter
  return broadcast
}

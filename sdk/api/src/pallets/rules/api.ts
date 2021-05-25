/* eslint-disable no-case-declarations */

import { SubmittableExtrinsic } from '@polkadot/api/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { EventEmitter } from 'events'
import { map } from 'ramda'

import { getApi } from '@anagolay/api/connection'
import createEventEmitter from '@anagolay/api/events'
import { networkCallback } from '@anagolay/api/utils'
import { AnGenericId, AnRule, AnRuleWithStorage } from '@anagolay/types'

import { EVENT_NAME_BATCH, EVENT_NAME_SINGLE } from './config'
import decodeFromStorage, { IncomingParam } from './decodeStorage'

/**
 * Save a single rule to the chain
 * {@link SnRule}
 * @param d Rule that we want to save to the chain.
 * @param signer Account that will be owner of the transaction and ones who pays the fees
 */
export async function save(d: AnRule, signer: KeyringPair): Promise<EventEmitter> {
  const broadcast = createEventEmitter()

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await createSubmittableExtrinsic(d).signAndSend(signer, {}, (params) =>
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
  d: AnRule[],
): Promise<Array<SubmittableExtrinsic<'promise'>>> {
  const txs = map(createSubmittableExtrinsic, d)

  return txs
}

/**
 * Save many rules in single transaction. It uses the `batch` capability of the chain
 * @param d List of Rule objects
 * @param signer Account that will be owner of the transaction and ones who pays the fees
 *
 * ```ts
  await api.api()

  const r: SnRule[] = rules
  const signer = getAlice()
  const o = await api.pallets.rules.saveBulk(r, signer)

  o.on(EVENT_NAME_BATCH, p => console.log(p.message))
  ```
 */
export async function saveBulk(d: AnRule[], signer: KeyringPair): Promise<EventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()
  const txs = map(createSubmittableExtrinsic, d)

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, (params) => networkCallback(params, broadcast, EVENT_NAME_BATCH))

  // return the event emitter
  return broadcast
}

/**
 * Get all Rules from the chain, encoded using SCALE codec. For the large sets, this might be slow and resource intensive
 * {@link StorageKey}
 * {@link RuleInfo}
 * @returns List of `[StorageKey, RuleInfo]` SCALE codec encoded
 */
export async function getAll(): Promise<IncomingParam[]> {
  const api = getApi()

  return await api.query.rules.rules.entries()
}

/**
 * Get a Rule from the chain, encoded using SCALE codec.
 * {@link StorageKey}
 * {@link RuleInfo}
 * @param items
 * @returns Item `[StorageKey, RuleInfo]` SCALE codec decoded
 */
export async function getRule(item: AnGenericId): Promise<IncomingParam> {
  const api = getApi()

  return (await api.query.rules.rules.entries(item))[0]
}

/**
 * Get a Rule from the chain, decoded
 * {@link StorageKey}
 * {@link RuleInfo}
 * @param item
 * @returns Item `[StorageKey, RuleInfo]` SCALE codec encoded
 */
export async function getRuleDecoded(item: AnGenericId): Promise<AnRuleWithStorage> {
  const rule = await getRule(item)

  return decodeFromStorage(rule)
}

/**
 * Get all Rules from the network then return the list of the Decoded rules
 * @param items list of Rule IDs
 * @returns List of `[StorageKey, RuleInfo]` SCALE codec decoded
 */
export async function getAllDecoded(): Promise<AnRuleWithStorage[]> {
  const rules = await getAll()
  const decoded = map(decodeFromStorage, rules)

  return decoded
}

/**
 * Helper function for creating the Submittable result. This can be easily used in the `ramda.map` function with the list of SnRule. Returns the Submittable rules object
 *
 * ```ts
 * import { map } from 'ramda'
 * const txs = map(createSubmittableExtrinsic, d)
 *  ```
 *
 * @param d Typescript native SnRule
 * @returns Substrate SubmittableExtrinsic promise unresolved
 */
export function createSubmittableExtrinsic(d: AnRule): SubmittableExtrinsic<'promise'> {
  const api = getApi()

  return api.tx.rules.createRule(d)
}

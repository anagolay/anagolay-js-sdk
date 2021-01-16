import { SubmittableExtrinsic } from '@polkadot/api/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { getApi } from '@sensio/api/connection'
import createEventEmitter from '@sensio/api/events'
import { networkCallback } from '@sensio/api/utils'
import { EventEmitter } from 'events'

/**
 * Save many submittable tx in single transaction. It uses the `batch` capability of the chain
 * @param txs
 * @param signer
 *
 * ```ts
  await api.api()

  const statements: SubmittableExtrinsic<'promise'>[] = any submitable tx
  const signer = getAlice()
  const o = await api.utils.saveBatch(txs, signer)

  o.on(EVENT_NAME_BATCH, p => console.log(p.message))
  ```
 */
export default async function saveBatch(
  txs: Array<SubmittableExtrinsic<'promise'>>,
  signer: KeyringPair,
): Promise<EventEmitter> {
  const api = getApi()
  const broadcast = createEventEmitter()

  // @TODO if we need nonce in the future, this doesn't work
  // const nonce = await api.rpc.system.accountNextIndex(signer.address)
  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, (params) => networkCallback(params, broadcast, 'utils::txs::batch'))

  // return the event emitter
  return broadcast
}

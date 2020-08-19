/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { EventEmitter } from 'events'
import { isNil, prop } from 'ramda'
import { getApi } from '../connection'

interface EventNameTypes {
  success: string
  error: string
}

/**
 * Generic callback for all `tx.signAndSend` methods
 * Usage:
 * ```ts
  import createEventEmitter from '@sensio/api/events'
  const broadcast = createEventEmitter()
  await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, params =>
      networkCallback(params, broadcast, EVENT_NAME_BATCH)
    )

    // usage
     receivedInstance.on(EVENT_NAME_BATCH, p => console.log(p))
 * ```
 * @param params [ISubmittableResult] callback params from the call
 * @param broadcast EventEmitter instance
 * @param eventName the event name for each pallet. available in `./config.ts`
 */
export function networkCallback (
  params: any,
  broadcast: EventEmitter,
  eventNames: EventNameTypes
): void {
  const api = getApi()

  const { error: errorEventName, success: successEventName } = eventNames

  const { events = [], status, isError } = params

  broadcast.emit(successEventName, {
    message: `Transaction status:${status.type}`
  })

  if (status.isInBlock) {
    broadcast.emit(successEventName, {
      message: `Included at block hash ${status.asInBlock.toHex()}`
    })

    events.forEach(({ event }) => {
      const { data, method, section } = event
      const [error] = data

      broadcast.emit(successEventName, {
        message: `${section}.${method}::${data.toString() as string}`
      })
      if (error && !isNil(prop('isModule', error))) {
        const { documentation, name, section } = api.registry.findMetaError(
          error.asModule
        )
        broadcast.emit(successEventName, {
          error: { doc: documentation.toString(), name, section }
        })
      } else {
        broadcast.emit(successEventName, {
          message: `${section}.${method}::${data.toString() as string}`
        })
      }
    })
  } else if (status.isFinalized) {
    broadcast.emit(successEventName, {
      message: `Finalized block hash ${status.asFinalized.toHex()}`,
      finalized: true
    })
    broadcast.removeListener(successEventName, () =>
      console.log('listener removed')
    )
  } else if (isError) {
    broadcast.emit(errorEventName, { error: status })
    broadcast.removeListener(errorEventName, () =>
      console.log('listener removed')
    )
  }
}

export default networkCallback

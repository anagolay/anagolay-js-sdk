/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { DispatchError } from '@polkadot/types/interfaces'
import type { ISubmittableResult, ITuple } from '@polkadot/types/types'
import { isNil } from 'ramda'
import { getApi } from '../connection'
import { CustomEventEmitter } from '../events'
export interface EventMessage<T> {
  error?: {
    message: string
    extra?: any
  }
  response: T
  message?: string
  finalized?: boolean
}

/**
 * Generic callback for all `tx.signAndSend` methods
 * Usage:
 * ```ts
  import createEventEmitter from '@sensio/api/events'
  const broadcast = createEventEmitter()
  const receivedInstance = await api.tx.utility
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
export async function networkCallback(
  params: ISubmittableResult,
  broadcast: CustomEventEmitter,
  eventName: string,
): Promise<void> {
  const api = getApi()

  // if (process.env.NODE_ENV !== 'test') {
  //   console.log('networkCallback params', params)
  // }

  const { events, status, isError, dispatchError } = params

  let eventMessage: EventMessage<any> = {
    message: '',
    finalized: false,
    response: {},
  }

  // these are for errors that are thrown via the txpool, the tx didn't make it into a block
  if (isError) {
    broadcast.emit(eventName, {
      ...eventMessage,
      error: { message: 'Error occurred, TX never made it into the block', extra: status },
    })
    broadcast.removeListener(eventName, () => console.log('listener removed'))
  } else if (status.isReady) {
    broadcast.emit(eventName, {
      ...eventMessage,
      message: `Transaction status:${status.type}`,
    })
  } else if (status.isInBlock) {
    eventMessage = {
      ...eventMessage,
      message: `Included at block hash ${status.asInBlock.toHex()}`,
    }

    if (events) {
      console.log(
        `networkCallback (events/system)`,
        events.map(
          ({ event: { data, method, section } }) =>
            `${section}.${method}${data ? `(${JSON.stringify(data.toHuman())})` : ''}`,
        ),
      )
    }

    events.forEach((e) => {
      delete eventMessage.error
      const { event } = e
      const { data, method, section } = event

      // const [index, error] = (data as unknown) as ITuple<[DispatchError]>
      /**
       * data value comes like this when there is an error and without the error the Type is on the first place. For that reason we take the 2nd index from the data and check if exists it's an error if not well, then nothing.
       * 
       * Taking the second index (data as unknown) as ITuple<[DispatchError]>[1]
        ```
         GenericEventData(2) [
          u32 {
            negative: 0,
            words: [ 0 ],
            length: 1,
            red: null,
            registry: TypeRegistry {}
          },
          Type {
            registry: TypeRegistry {},
            isOther: [Getter],
            asOther: [Getter],
            isCannotLookup: [Getter],
            asCannotLookup: [Getter],
            isBadOrigin: [Getter],
            asBadOrigin: [Getter],
            isModule: [Getter],
            asModule: [Getter]
          },
          registry: TypeRegistry {},
          _Types: [ [Function: u32], [class Type extends Enum] ]
        ]
        ```
       */
      const error = (data as unknown) as ITuple<[DispatchError]>[1]
      console.log('method', method, data)

      if (!isNil(error) && !isNil(error.isModule)) {
        const decoded = error.registry.findMetaError(error.asModule)
        const { documentation, section, name } = decoded

        // console.log(`${section}.${method}: ${documentation.join(' ')}`, decoded)

        eventMessage = {
          ...eventMessage,
          error: { message: documentation.join(' '), extra: { name, section } },
        }
      } else if (method === 'ExtrinsicSuccess') {
        eventMessage = {
          ...eventMessage,
          message: `${section}.${method}::${data.toString() as string}`,
        }
        // } else if (method === 'BatchInterrupted' || method === 'ExtrinsicFailed') {
      } else if (method === 'BatchInterrupted') {
        eventMessage = {
          ...eventMessage,
          error: {
            message: `${section}.${method}::${data.toString() as string}`,
            extra: { section, method },
          },
        }
      } else {
        eventMessage = {
          ...eventMessage,
          message: `${section}.${method}::${data.toString() as string}`,
        }
      }

      broadcast.emit(eventName, eventMessage)
    })

    // broadcast.emit(eventName, eventMessage)
  } else if (status.isFinalized) {
    broadcast.emit(eventName, {
      ...eventMessage,
      message: `Finalized block hash ${status.asFinalized.toHex()}`,
      finalized: true,
    })
    broadcast.removeListener(eventName, () => console.log('listener removed'))
  }
  // The dispatchError is extracted from the system ExtrinsicFailed event above
  // (so will match the details there, the API convenience helper extracts it to ease-of-use)
  if (dispatchError) {
    // show the actual errors as received here by looking up the indexes against the registry
    // https://polkadot.js.org/docs/api/cookbook/tx#how-do-i-get-the-decoded-enum-for-an-extrinsicfailed-event
    if (dispatchError.isModule) {
      // for module errors, we have the section indexed, lookup
      const decoded = api.registry.findMetaError(dispatchError.asModule)
      const { documentation, name, section } = decoded

      console.log(`(error) ${section}.${name}: ${documentation.join(' ')}`)
      eventMessage = {
        ...eventMessage,
        error: { message: documentation.join(' '), extra: { name, section } },
      }
    } else {
      // Other, CannotLookup, BadOrigin, no extra info
      console.log(`(error) ${JSON.stringify(dispatchError.toHuman())}`)
      eventMessage = {
        ...eventMessage,
        error: {
          message: 'Other, CannotLookup, BadOrigin, no extra info',
          extra: dispatchError.toHuman(),
        },
      }
    }
  }
}

export default networkCallback

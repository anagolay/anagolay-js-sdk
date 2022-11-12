/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { DispatchError } from '@polkadot/types/interfaces';
import type { ISubmittableResult, ITuple } from '@polkadot/types/types';
import debugOriginal, { Debugger } from 'debug';
import { isNil } from 'ramda';

import { getCachedApi } from '../connection';
import { ICustomEventEmitter, IEventMessage } from './customEvents';

const logger: Debugger = debugOriginal('anagolayjs:networkCallback');

/**
 * Generic callback for all `tx.signAndSend` methods
 * Usage:
 * ```ts
  import createEventEmitter from '@anagolay/api/events'
  const broadcast = createEventEmitter()
  const receivedInstance = await api.tx.utility
    .batch(txs)
    .signAndSend(signer, {}, params =>
      networkCallback(params, broadcast, EVENT_NAME_BATCH)
    )

    // usage
     receivedInstance.on(EVENT_NAME_BATCH, p => logger(p))
 * ```
 * @param params [ISubmittableResult] callback params from the call
 * @param broadcast EventEmitter instance
 */
export async function networkCallback<T>(
  params: ISubmittableResult,
  broadcast: ICustomEventEmitter<T>
): Promise<void> {
  const api = getCachedApi();

  const { dispatchError, events, isError, status } = params;

  let eventMessage: IEventMessage<T> = {
    message: undefined
  };

  logger('ALL CB PARAMS', params);

  // The dispatchError is extracted from the system ExtrinsicFailed event above
  // (so will match the details there, the API convenience helper extracts it to ease-of-use)
  if (dispatchError) {
    // show the actual errors as received here by looking up the indexes against the registry
    // https://polkadot.js.org/docs/api/cookbook/tx#how-do-i-get-the-decoded-enum-for-an-extrinsicfailed-event
    if (dispatchError.isModule) {
      // for module errors, we have the section indexed, lookup
      const decoded = api.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = decoded;

      logger(`(error) from module ${section}.${name}: ${docs.join(' ')}`);

      eventMessage = {
        ...eventMessage,
        error: { message: docs.join(' '), extra: { name, section } }
      };
    } else {
      // Other, CannotLookup, BadOrigin, no extra info
      logger(`(error) other lookups ${JSON.stringify(dispatchError.toHuman())}`);
      eventMessage = {
        ...eventMessage,
        error: {
          message: 'Other, CannotLookup, BadOrigin, no extra info',
          extra: dispatchError.toHuman()
        }
      };
    }
    broadcast.emit('error', eventMessage);
  } else {
    // these are for errors that are thrown via the txpool, the tx didn't make it into a block
    if (isError) {
      broadcast.emit('error', {
        ...eventMessage,
        error: { message: 'Error occurred, TX never made it into the block', extra: status }
      });
    } else if (status.isReady) {
      broadcast.emit('isReady', {
        ...eventMessage,
        message: `Transaction status:${status.type}`
      });
    } else if (status.isInBlock) {
      eventMessage = {
        ...eventMessage,
        message: `Included at block hash ${status.asInBlock.toHex()}`
      };

      if (events) {
        logger(
          `(events/system)`,
          events.map(
            ({ event: { data, method, section } }) =>
              `${section}.${method}${data ? `(${JSON.stringify(data.toHuman() as unknown as T)})` : ''}`
          )
        );
      }

      events.forEach((e) => {
        delete eventMessage.error;
        const { event } = e;
        const { data, method, section } = event;

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
        const error = data as unknown as ITuple<[DispatchError]>[1];

        logger('method', method, data.toHuman() as unknown as T);

        if (!isNil(error) && !isNil(error.isModule)) {
          const decoded = error.registry.findMetaError(error.asModule);
          const { docs, name, section } = decoded;

          broadcast.emit('error', {
            ...eventMessage,
            error: { message: docs.join(' '), extra: { name, section, method } },
            data: data.toHuman() as unknown as T
          });
        } else if (method === 'ExtrinsicSuccess') {
          broadcast.emit(method, {
            ...eventMessage,
            message: `${section}.${method}::${data.toString()}`,
            data: data.toHuman() as unknown as T
          });
        } else if (method === 'BatchInterrupted') {
          broadcast.emit(method, {
            ...eventMessage,
            error: {
              message: `${section}.${method}::${data.toString()}`,
              extra: { section, method }
            },
            data: data.toHuman() as unknown as T
          });
        } else if (method === 'ExtrinsicFailed') {
          broadcast.emit('error', {
            ...eventMessage,
            error: {
              message: `${section}.${method}::${data.toString()}`,
              extra: { section, method }
            },
            data: data.toHuman() as unknown as T
          });
        } else {
          broadcast.emit(method, {
            ...eventMessage,
            message: `${section}.${method}::${data.toString()}`,
            data: data.toHuman() as unknown as T
          });
        }
      });
    } else if (status.isFinalized) {
      logger('finalized', `Finalized block hash ${status.asFinalized.toHex()}`);
      broadcast.emit('finalized', {
        ...eventMessage,
        message: `Finalized block hash ${status.asFinalized.toHex()}`
      });
    }
  }
}

export default networkCallback;

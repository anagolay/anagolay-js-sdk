import { EventEmitter } from 'events';

import { IEventMessage } from './networkCallback';

export declare interface ICustomEventEmitter extends EventEmitter {
  on(event: string, listener: (data: IEventMessage) => void): this;
  emit(event: string | symbol, payload: IEventMessage): boolean;
}

export class CustomEventEmitter extends EventEmitter {}

/**
 * Create Nodejs Event Emitter, with customizations
 *  * Usage:
 * ```ts
  import createEventEmitter from '@anagolay/api/events'
  const broadcast = createEventEmitter()
  ```
 * @returns EventEmitter
 */
export default function createEventEmitter(): ICustomEventEmitter {
  const e = new CustomEventEmitter({
    captureRejections: true,
  });
  return e;
}

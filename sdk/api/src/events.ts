import { EventEmitter } from 'events'
import { EventMessage } from './utils/networkCallback'
export declare interface CustomEventEmitter {
  on<T>(event: string, listener: (data: EventMessage<T>) => void): this
  emit<T>(event: string | symbol, payload: EventMessage<T>): boolean
}

export class CustomEventEmitter extends EventEmitter {}

/**
 * Create Nodejs Event Emitter, with customizations
 *  * Usage:
 * ```ts
  import createEventEmitter from '@sensio/api/events'
  const broadcast = createEventEmitter()
  ```
 * @returns EventEmitter
 */
export default function createEventEmitter(): CustomEventEmitter {
  return new CustomEventEmitter({
    captureRejections: true,
  })
}

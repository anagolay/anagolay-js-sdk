import { EventEmitter } from 'events'

class CustomEventEmitter extends EventEmitter {}

/**
 * Create Nodejs Event Emitter, with customizations
 *  * Usage:
 * ```ts
  import createEventEmitter from '@sensio/api/events'
  const broadcast = createEventEmitter()
  ```
 * @returns EventEmitter
 */
export default function createEventEmitter(): EventEmitter {
  return new CustomEventEmitter({
    captureRejections: true,
  })
}

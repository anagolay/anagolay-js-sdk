import { EventEmitter } from 'events';

/**
 * Generic event message
 * @typeParam T is the type of the DATA field
 */
export interface IEventMessage<T> {
  error?: {
    message: string;
    extra?: unknown;
  };
  message?: string;
  data?: T;
}
/**
 * Custom event emitter which is used in the api callback
 */
export declare interface ICustomEventEmitter<T> extends EventEmitter {
  on(event: string, listener: (data: IEventMessage<T>) => void): this;
  once(event: string, listener: (data: IEventMessage<T>) => void): this;
  emit(event: string | symbol, payload: IEventMessage<T>): boolean;
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
export default function createEventEmitter<T>(): ICustomEventEmitter<T> {
  const e = new CustomEventEmitter({
    captureRejections: true
  });
  return e;
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @rushstack/typedef-var */
import { nanoid } from 'nanoid';
import { isNil, remove } from 'ramda';
import { writable } from 'svelte/store';

export type InfoLevel = 'info' | 'success' | 'warning' | 'error' | '';

export interface IAutoClose {
  close: boolean;
  time?: number;
}

export type IFunctionVoid = () => void;
export interface INotification {
  id: string;
  text: string;
  autoclose: IAutoClose;
  infoLevel: InfoLevel;
  closeFn: () => void;
  cssClass: string;
  showSpinner: boolean;
}

function notificationsFn() {
  const { update, subscribe, set } = writable<INotification[]>([]);
  set([]);
  return {
    subscribe,
    set,
    update,
    /**
     * Add the notification.
     * @param options -
     * @returns the closeCallback that can be called when you want to manually close it
     */
    addNew: (options: {
      text: string;
      infoLevel?: InfoLevel;
      autoclose?: IAutoClose;
      showSpinner?: boolean;
      closeCb?: () => void;
      cssClass?: string;
    }): IFunctionVoid => {
      const { text, autoclose, infoLevel, cssClass, closeCb, showSpinner } = options;

      const id = nanoid();

      let closeFn = () => {
        update((cs) => {
          const idx = cs.findIndex((f) => f.id === id);
          return remove(idx, 1, cs);
        });
      };

      if (!isNil(closeCb)) {
        closeFn = closeCb;
      }

      let autoClose: IAutoClose = autoclose;
      if (isNil(autoClose)) {
        // when we have the spinner generally we want to manually close the notification
        autoClose = { close: !showSpinner, time: 3000 };
      }

      const a: INotification = {
        id,
        text,
        autoclose,
        infoLevel,
        closeFn,
        cssClass,
        showSpinner
      };

      if (autoClose.close) {
        setTimeout(() => {
          update((cs) => {
            const idx = cs.findIndex((f) => f.id === id);
            return remove(idx, 1, cs);
          });
        }, autoClose.time);
      }

      update((cS) => [...cS, a]);
      return closeFn;
    },
    /**
     * Add the alert
     * @param text - message
     * @param infoLevel - success, warn, or error
     * @param autoclose - default true after 2000 ms will close the alert
     */
    add: (text: string, infoLevel: InfoLevel = '', autoclose: IAutoClose = { close: true, time: 3000 }) => {
      const id = nanoid();
      const a: INotification = {
        id,
        text,
        autoclose,
        infoLevel,
        closeFn: () => {
          update((cs) => {
            const idx = cs.findIndex((f) => f.id === id);
            return remove(idx, 1, cs);
          });
        }
      };

      if (autoclose.close) {
        setTimeout(() => {
          update((cs) => {
            const idx = cs.findIndex((f) => f.id === id);
            return remove(idx, 1, cs);
          });
        }, autoclose.time);
      }

      update((cS) => [...cS, a]);
      return id;
    }
  };
}

export const notifications = notificationsFn();

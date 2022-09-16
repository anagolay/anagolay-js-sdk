import { nanoid } from 'nanoid';
import { remove } from 'ramda';
import { writable } from 'svelte/store';

export type InfoLevel = 'info' | 'success' | 'warning' | 'error' | '';

export interface AutoClose {
  close: boolean;
  time?: number;
}
export interface Alert {
  id: string;
  text: string;
  autoclose: AutoClose;
  infoLevel: InfoLevel;
  closeFn: () => void;
}

function alertsFn() {
  const { update, subscribe, set } = writable<Alert[]>([]);
  set([]);
  return {
    subscribe,
    set,
    update,
    /**
     * Add the alert
     * @param text - message
     * @param infoLevel - success, warn, or error
     * @param autoclose - default true after 2000 ms will close the alert
     */
    add: (text: string, infoLevel: InfoLevel = '', autoclose?: AutoClose = { close: true, time: 3000 }) => {
      const id = nanoid();
      const a: Alert = {
        id,
        text,
        autoclose,
        infoLevel,
        closeFn: () => {
          update((cs) => {
            const idx = cs.findIndex((f) => f.id === id);
            return remove(idx, 1, cs);
          });
        },
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
    },
  };
}

export const alerts = alertsFn();

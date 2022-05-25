import { nanoid } from 'nanoid';
import { remove } from 'ramda';
import { writable } from 'svelte/store';

export type InfoLevel = 'info' | 'success' | 'warning' | 'error' | '';

export interface Alert {
  id: string;
  text: string;
  autoclose: boolean;
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
    add: (text: string, infoLevel: InfoLevel = '', autoclose = true) => {
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
      if (autoclose) {
        setTimeout(() => {
          update((cs) => {
            const idx = cs.findIndex((f) => f.id === id);
            return remove(idx, 1, cs);
          });
        }, 2000);
      }

      update((cS) => [...cS, a]);
    },
  };
}

export const alerts = alertsFn();

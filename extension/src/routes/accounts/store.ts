/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { KeypairType } from '@polkadot/util-crypto/types';
import { mergeDeepRight } from 'ramda';
import { writable } from 'svelte/store';

import { sendMessage } from '$src/messaging/messaging';
import type { RequestAccountCreateSuri } from '$src/types';

export const SEED_DEFAULT_LENGTH = 12;
// const SEED_LENGTHS = [12, 15, 18, 21, 24];

export const savedSeedAcknowledgement = writable(false);
export const passwordsMatch = writable(false);
export const accountsStore = writable<RequestAccountCreateSuri[]>([]);
export const selectedAccount = writable<RequestAccountCreateSuri | undefined>();

export const accountStep = writable(0);

function createAccountStoreFn() {
  const defaultState: RequestAccountCreateSuri = {
    address: '',
    seed: '',
    name: undefined,
    password: undefined,
    keyType: 'sr25519'
  };
  const { set, subscribe, update } = writable<RequestAccountCreateSuri>(defaultState);
  return {
    set,
    subscribe,
    refreshAccounts: async () => {
      const accounts = await sendMessage('pri(accounts.get)', []);
      accountsStore.set(accounts as RequestAccountCreateSuri[]);
    },
    reset: () => {
      savedSeedAcknowledgement.set(false);
      passwordsMatch.set(false);
      update(() => defaultState);
    },
    new: async (_seed?: string, keyPairType: KeypairType = 'sr25519'): Promise<void> => {
      try {
        const { address, seed } = await sendMessage('pri(seed.create)', {
          length: SEED_DEFAULT_LENGTH,
          type: keyPairType,
          seed: _seed
        });
        const newState = {
          address,
          seed
        };
        update((oldState) => mergeDeepRight(oldState, newState));
      } catch (error) {
        console.log('err', error);
      }
    }
  };
}

export const createAccountStore = createAccountStoreFn();

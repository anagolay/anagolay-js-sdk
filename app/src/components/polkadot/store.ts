/* eslint-disable @typescript-eslint/no-use-before-define */
import type { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';
import Keyring from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import type { HexString } from '@polkadot/util/types';
import debugPkg, { type Debugger } from 'debug';
import { type Writable, get, writable } from 'svelte/store';

import { browser } from '$app/environment';

export const debugName: string = 'stores:polkadotAccounts';
const debug: Debugger = debugPkg(debugName);

const localStorageKey: string = 'anagolayJs:selectedAccount';

export interface ISubstrateAccountsStorage {
  selectedAccount: InjectedAccountWithMeta | undefined;
  injectedAccounts: InjectedAccountWithMeta[];
  tokenGenerationFunction?: (address: string) => Promise<void> | undefined;
}

export interface IStoreReturn extends Writable<ISubstrateAccountsStorage> {
  selectedAccountAsKeyring: () => KeyringPair;
  getInjectorForSelectedAccount: () => Promise<InjectedExtension>;
  setSelectedAccount: (account: InjectedAccountWithMeta) => void;
  resetSelectedAccount: () => void;
}

/**
 *
 * @returns
 */
async function polkadotAccountsStoreFn(): Promise<IStoreReturn> {
  let selectedAccountFromLocalStorage: InjectedAccountWithMeta | undefined;

  if (browser) {
    const storageItem = window.localStorage.getItem(localStorageKey);
    selectedAccountFromLocalStorage = storageItem ? JSON.parse(storageItem) : undefined;
  }

  const { update, subscribe, set } = writable<ISubstrateAccountsStorage>({
    selectedAccount: selectedAccountFromLocalStorage,
    injectedAccounts: []
  });

  return {
    subscribe,
    set,
    update,
    selectedAccountAsKeyring: (): KeyringPair => {
      const state = get(polkadotAccountsStore);
      const keyring: Keyring = new Keyring({ ss58Format: 42, type: state.selectedAccount.type });
      const addr = keyring.addFromAddress(state.selectedAccount.address);
      return addr;
    },
    getInjectorForSelectedAccount: async (): Promise<InjectedExtension> => {
      const { web3FromAddress } = await import('@polkadot/extension-dapp');
      const state = get(polkadotAccountsStore);
      const injector = await web3FromAddress(state.selectedAccount.address);
      return injector;
    },
    resetSelectedAccount: () => {
      window.localStorage.removeItem(localStorageKey);
      update((currentState) => {
        currentState.selectedAccount = undefined;
        return currentState;
      });
    },
    setSelectedAccount: async (account: InjectedAccountWithMeta) => {
      debug('selecting account', account);

      update((currentState) => {
        if (browser) {
          window.localStorage.setItem(localStorageKey, JSON.stringify(account));
        }
        return { ...currentState, selectedAccount: account };
      });
    }
  };
}

/**
 * Substrate Accounts storage
 */
export const polkadotAccountsStore: IStoreReturn = await polkadotAccountsStoreFn();

/**
 * Sign the payload using the PolkadotJS extension
 * @param account -
 * @param payload -
 * @returns `0x` hex encoded string
 */
export async function signViaExtension(account: string, payload: string): Promise<HexString> {
  const { web3FromAddress } = await import('@polkadot/extension-dapp');

  const injector = await web3FromAddress(account);
  // this injector object has a signer and a signRaw method
  // to be able to sign raw bytes
  const signRaw = injector?.signer?.signRaw;
  if (signRaw) {
    debug(`Signing the payload`);
    // after making sure that signRaw is defined
    // we can use it to sign our message
    const { signature } = await signRaw({
      address: account,
      data: payload,
      type: 'bytes'
    });
    return signature;
  } else {
    throw new Error('cannot sign, signRaw does not exist');
  }
}

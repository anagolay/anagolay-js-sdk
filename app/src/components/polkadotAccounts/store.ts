import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import debug, { Debugger } from 'debug';
import { type Writable, writable } from 'svelte/store';

import { browser } from '$app/environment';

export const debugName: string = 'stores:polkadotAccounts';
const log: Debugger = debug(debugName);

const localStorageKey: string = 'anagolayJs:selectedAccount';

export interface ISubstrateAccountsStorage {
	selectedAccount: InjectedAccountWithMeta;
	injectedAccounts: InjectedAccountWithMeta[];
}

interface IStoreReturn extends Writable<ISubstrateAccountsStorage> {
	setSelectedAccount: (account: InjectedAccountWithMeta) => void;
	resetSelectedAccount: () => void;
}

/**
 * actual store
 */
function polkadotAccountsStoreFn(): IStoreReturn {
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
		resetSelectedAccount: () => {
			window.localStorage.removeItem(localStorageKey);
			update((currentState) => {
				currentState.selectedAccount = undefined;
				return currentState;
			});
		},
		setSelectedAccount: (account: InjectedAccountWithMeta) => {
			log('selecting account', account);

			update((currentState) => {
				if (browser) {
					window.localStorage.setItem(localStorageKey, JSON.stringify(account));
				}
				currentState.selectedAccount = account;
				return currentState;
			});
		}
	};
}

/**
 * Substrate Accounts storage
 */
export const polkadotAccountsStore: IStoreReturn = polkadotAccountsStoreFn();

/**
 * Sign the payload using the PolkadotJS extension
 * @param account -
 * @param payload -
 * @returns `0x` hex encoded string
 */
export async function signViaExtension(account: string, payload: string): Promise<string> {
	const { web3FromAddress } = await import('@polkadot/extension-dapp');

	const injector = await web3FromAddress(account);
	// this injector object has a signer and a signRaw method
	// to be able to sign raw bytes
	const signRaw = injector?.signer?.signRaw;
	if (signRaw) {
		console.log(`Signing the payload`);
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

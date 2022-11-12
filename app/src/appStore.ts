import '@anagolay/types/augment-api';

import { connectToWs } from '@anagolay/api';
import { ApiPromise } from '@polkadot/api';
import debugLib, { Debugger } from 'debug';
import { append, equals, find, isEmpty, isNil, uniq } from 'ramda';
import { type Writable, get, writable } from 'svelte/store';

import { browser } from '$app/environment';

import { notificationsStore } from './components/notifications/store';
import { chainList } from './config';

export const debugName: string = 'stores:app';

const debug: Debugger = debugLib(debugName);

const localStorageCustomChainsKey: string = 'anagolayJs:customChains';
export const localStorageConnectToKey: string = 'anagolayJs:connectTo';

/**
 * Cross application state for the info is the WS connected or not
 */
export const connectingToChain: Writable<boolean> = writable(false);

/**
 * Our websocket relay
 */
export const websocketRelayConnected: Writable<boolean> = writable(false);

/**
 * Cross application state for the info is the WS connected or not to the blockchain
 */
export const chainConnected: Writable<boolean> = writable(false);

/**
 * Cross application state for the the page title in the Navbar
 */
export const pageTitle: Writable<string> = writable();

/**
 * @TODO remove and refactor the occurrences
 */
export const anagolayChainWSS: Writable<string> = writable('wss://idiyanale-testnet.anagolay.io');

/**
 * The Websocket service.
 */
export const relayServiceWSS: Writable<string> = writable('wss://ws.anagolay.io');

/**
 * Show hide sidebar manually
 */
export const showSidebar: Writable<boolean> = writable(true);

/**
 * Helper for the best block state
 */
export const bestBlock: Writable<number> = writable(0);

/**
 * Helper for the finalized block state
 */
export const finalizedBlock: Writable<number> = writable(0);

/**
 * Total issuance in unprocessed format (`999999999036643113645`)
 */
export const totalIssuance: Writable<number> = writable(0);

/**
 * Total issuance + the Token Name
 */
export const totalIssuanceWithName: Writable<string> = writable('');

/**
 * Quick lookup for the selected token name
 */
export const connectedTokenShortName: Writable<string> = writable('');

export const connectedChainName: Writable<string | undefined> = writable(undefined);

/**
 * Return type for the store
 */
interface IChainStoreReturn extends Writable<IChainStore> {
  /**
   * When adding custom Anagolay chain to connect. Very useful in dev
   */
  addCustomChain: (chainWs: string) => void;
  /**
   * Call this to connect to provided chain or to default. This doesn't return anything, it updates the `api` store object. Once connected use it like any other Substrate based api. Real example is in [`BlocStats.svelte`](./components/base/BlockStats.svelte) file.
   *
   * ```ts
   * import { chainStore } from '$src/appStore';
   * const lastHeader = await $chainStore.api.rpc.chain.getHeader();
   * console.log(lastHeader)
   * ```
   *
   * When the chain is connected this method will set the `chainConnected = true` so you can react when that store variable is changed in your reactive section:
   *
   * ```ts
   * $: chainConnected ? console.log('yeah, use api from the store') : ''
   * ```
   */
  connect: (chainWs?: string, connectionType?: 'ws' | 'rx') => Promise<void>;
  reconnect: (chainWs: string, connectionType?: 'ws' | 'rx') => Promise<void>;
  makePolkadotJsAppUrl: () => URL;
}

interface IChainStore {
  /**
   * Helper to get the connected chain name
   */
  connectedChainName: string;
  /**
   * Connectable chains
   */
  chainList: string[];
  /**
   * index of the chain we wish to connect to. From the `chainList`
   */
  connectedTo: string;
  /**
   * The connected API. Use this to query the chain
   */
  api: ApiPromise | undefined;
}

function chainConnectionStore(): IChainStoreReturn {
  let customChains: string[] = [];
  let connectedTo: string = chainList[0];
  if (browser) {
    const cc = window.localStorage.getItem(localStorageCustomChainsKey);
    customChains = !isNil(cc) && !isEmpty(cc) ? JSON.parse(cc) : [];

    const ccTo = window.localStorage.getItem(localStorageConnectToKey);
    connectedTo = !isNil(ccTo) && !isEmpty(ccTo) ? ccTo : chainList[0];
  }

  const defaultState: IChainStore = {
    chainList: uniq([...chainList, ...customChains]),
    connectedTo,
    api: undefined,
    connectedChainName: undefined
  };

  debug('defaultState', defaultState);

  const { subscribe, update, set } = writable<IChainStore>(defaultState);

  /**
   * Connect to Anagolay Chains. If no chain is provided the first item (index 0) in the `chainList` is used
   * @param chainWs - chain WS
   */
  async function connect(chainWs: string = defaultState.connectedTo): Promise<void> {
    connectingToChain.set(true);

    const { connectedTo } = defaultState;
    debug('Connecting to', chainWs);
    const closeNotification = notificationsStore.addNew({
      text: `Connecting to ${connectedTo}`,
      infoLevel: 'info',
      showSpinner: true
    });

    const api: ApiPromise = await connectToWs(connectedTo);

    // wait then update
    await api.isReady;

    // set the connected Token Short name
    connectedTokenShortName.set(api.registry.chainTokens[0].toString());
    // console.log((await api.rpc.system.chain()).toString());

    connectedChainName.set((await api.rpc.system.chain()).toString());

    update((curState) => {
      chainConnected.set(api.isConnected);
      connectingToChain.set(false);

      return { ...curState, api, connectedTo: chainWs };
    });
    closeNotification();
    notificationsStore.addNew({ text: 'Connected', infoLevel: 'success' });
  }

  async function reconnect(chainWs: string): Promise<void> {
    debug('Reconnecting to %s', chainWs);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const state = get(chainStore);
    const chainConnectedState = get(chainConnected);
    if (chainConnectedState) {
      debug('Disconnecting from previous api instance.');
      await state.api.disconnect();
    }
    chainConnected.set(false);
    await connect(chainWs);
  }

  return {
    subscribe,
    set,
    update,
    makePolkadotJsAppUrl: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const curState = get(chainStore);
      const url = new URL('https://polkadot.js.org/apps/');
      const connectedChainUrl = curState.chainList.find((e) => e === curState.connectedTo);
      url.searchParams.set('rpc', connectedChainUrl);

      return url;
    },
    addCustomChain: (chainWs: string) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      update((state) => {
        const { chainList } = state;
        const alreadyExists = find((c) => equals(c, chainWs), chainList);
        if (!isNil(alreadyExists)) {
          debug('not adding, chain on list ', chainWs);
          return state;
        }
        const newChainList = append(chainWs, chainList);
        if (browser) {
          window.localStorage.setItem(localStorageCustomChainsKey, JSON.stringify(newChainList));
          window.localStorage.setItem(localStorageConnectToKey, chainWs);
        }
        return { ...state, chainList: newChainList };
      });
    },
    reconnect,
    connect
  };
}

/**
 * Connectable Chain store. Use this to connect to the chain, set custom one and listen the connected or disconnected state
 */
export const chainStore: IChainStoreReturn = chainConnectionStore();

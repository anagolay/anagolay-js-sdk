import { type Writable, writable } from 'svelte/store';

/**
 * Cross application state for the info is the WS connected or not
 */
export const wsConnected: Writable<boolean> = writable(false);

/**
 * Cross application state for the the page title in the Navbar
 */
export const pageTitle: Writable<string> = writable();

export const anagolayChainWSS: Writable<string> = writable('wss://idiyanale-1.bootnode.dev.anagolay.io');
export const relayServiceWSS: Writable<string> = writable('wss://ws.anagolay.io');

import { writable, type Writable } from 'svelte/store';

/**
 * Cross application state for the info is the WS connected or not
 */
export const wsConnected: Writable<boolean> = writable(false);

import { BN, formatBalance as polkadotFormatBalance } from '@polkadot/util';
import { extractGlobal, xglobal } from '@polkadot/x-global';
import copy from 'copy-to-clipboard';

import { notificationsStore } from '$src/components/notifications/store';
import { tokenName } from '$src/config';

/**
 * use chrome tabs to get the current tab where the extension is open
 * @returns active chrome tab
 */
export async function getActiveTab(): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) => [
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    })
  ]);
}

/**
 * Single truth on how to format the logging namespace
 * @param ns -
 * @returns
 */
export function makeLogNamespace(ns: string) {
  return `[anagolay_js::${ns.replace(' ', '::')}]`;
}

/**
 * Handy way to know when dom is ready
 * @param creator
 * @returns
 */
export function documentReadyPromise<T>(creator: () => Promise<T>): Promise<T> {
  return new Promise((resolve): void => {
    // if (document.readyState === 'complete') {
    //   resolve(creator());
    // } else {
    //   console.log('resolving via load');
    //   window.addEventListener('load', () => resolve(creator()));
    // }
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        resolve(creator());
      }
    };
  });
}
/**
 * Some JG magic to get the chrome to global namespace.
 */
export const chrome = extractGlobal('chrome', xglobal.browser);

/**
 * re-exported from the copy package
 * @public
 */
export interface ICopyOptions {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
  onCopy?: (clipboardData: object) => void;
}

/**
 * Copy the string to the clipboard
 * @param value - What are we copying
 * @param notificationsText - Custom notification message
 */
export function copyToClipboard(value: string, notificationsText = 'Copied to clipboard'): void {
  try {
    copy(value);
    notificationsStore.add(notificationsText, 'info');
  } catch (error) {
    notificationsStore.add(`Failed to copy to clipboard. error=${error}`, 'error');
  }
}

const defaultFormatOptions = {
  decimals: 12,
  withUnit: tokenName,
  withSiFull: false
};

export function formatBalance(
  value: string | BN,
  options?: { decimals?: number; withUnit?: string; withSiFull?: boolean }
): string {
  return polkadotFormatBalance(value, { ...defaultFormatOptions, ...options });
}

/**
 * Convert a real world unit into same but as smallest possible unit, `1 => 100000000`
 * @param unit -
 * @param decimal -
 * @returns
 */
export function unitToSmallestUnits(unit: number | string, decimal = 12): BN {
  const baseDecimal = new BN(Math.pow(10, decimal));
  const unitAsBn = new BN(unit);
  return baseDecimal.mul(unitAsBn);
}

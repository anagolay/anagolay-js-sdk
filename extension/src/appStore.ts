import type { AnVerificationRequest } from '@anagolay/types';
import type { BN } from '@polkadot/util';
import { equals, includes, isEmpty, isNil, prepend, propEq, reject, startsWith } from 'ramda';
import { derived, writable } from 'svelte/store';

import { notificationsStore } from './components/notifications/store';
import { type Message, makeRuntimePort, sendMessage } from './messaging/messaging';
import { accountsStore } from './routes/accounts/store';
import type { RequestAccountCreateSuri } from './types';
import { calculateCid } from './utils/calculateCid';
import { getTopLevelHostname, makeVerificationContexts } from './utils/chainApi';
import { getActiveTab } from './utils/utils';

export interface DomainVerifStoreItem {
  verified: boolean;
  domain: string[];
  badgeCss: string;
  tooltipForStatus: string;
  activeTab?: chrome.tabs.Tab;
}

export const verificationContextStore = writable<AnVerificationRequest>();

/**
 * just a string zero so we can use for equality check
 */
export const noFunds = `0`;

/**
 * When we send the tip, is it finalized or not
 */
export const tippingTransactionFinalized = writable(false);
/**
 * Connected to which chain.
 */
export const connectedChainStore = writable<string>();

/**
 * Finalized hash
 */
export const tippingHash = writable<string>();

/**
 * is tipping enabled for the creator
 */
export const tippingEnabled = writable(true);

/**
 * domain verified?
 */
export const domainVerificationStore = writable<DomainVerifStoreItem>({
  verified: true,
  domain: [],
  badgeCss: undefined,
  tooltipForStatus: undefined
});

export const fundsAvailable = writable<{
  /**
   * Formatted with IDI and kilo, millis, ...
   */
  free: string;
  /**
   * BN instance, useful for manipulating
   */
  freeBn?: BN;
}>({
  free: noFunds
});

/**
 * checking the verification
 */
export const checkingVerification = writable(true);

/**
 * The point behind this is that if we cannot talk to our Content Script,
 * it probably means it is not injected and that the website has DNS issues like `DNS_PROBE_POSSIBLE`. In this case we will lock the app and show the ERROR page
 */
export const canWeTalkToContentScript = writable(true);
/**
 * check status for checking the content script
 */
export const csLoader = writable(true);

export interface InitError {
  message: string;
  invalidUrl: true;
}

function appStoreFn() {
  const { set, subscribe } = writable();
  return {
    set,
    subscribe,
    /**
     * not in use ATM but very useful to know can we access the page or not
     */
    checkContentScript: async () => {
      const tab = await getActiveTab();
      try {
        const csInjected = await chrome.tabs.sendMessage(tab.id, 'injected(canWeTalkToContentScript)');

        // console.log('injected(canWeTalkToContentScript)', csInjected);
        if (isNil(csInjected) || equals(csInjected, false)) {
          canWeTalkToContentScript.set(false);
        }
        csLoader.set(false);
      } catch (error) {
        // don't make it an error
        console.error(error);
        canWeTalkToContentScript.set(false);
        csLoader.set(false);
      }
    },
    /**
     * An `init` for the app and the application storage.
     *
     * This methods does following:
     * - get accounts from the `chrome.storage.local`
     * -
     */
    init: async () => {
      const tab = await getActiveTab();
      if (!startsWith('http', tab.url)) {
        const err = {
          message: 'Anagolay wallet cannot work on this tab!',
          invalidUrl: true
        };
        throw new Error(JSON.stringify(err));
      }

      const tabUrl = new URL(tab.url);

      if (!includes(tabUrl.protocol, ['http:', 'https:'])) {
        return;
      }
      const topLevelDomain = getTopLevelHostname(tabUrl);

      const ctx = makeVerificationContexts(tabUrl);

      const verifReq = await sendMessage('pri(chain.verification.getRequest)', ctx);
      // console.log('verifReq', verifReq);
      // if this is empty it means that we don't know about this domain status
      if (isEmpty(verifReq)) {
        // we will keep this warning when they are not signup
        domainVerificationStore.set({
          domain: [topLevelDomain],
          badgeCss: 'badge-warning',
          tooltipForStatus: `This creator hasn't sign up just yet.`,
          verified: false
        });

        checkingVerification.set(false);
      } else {
        // we know we are dealing with only ONE entry
        const [domainVerification] = verifReq;
        verificationContextStore.set(domainVerification);

        // destruct what we need
        const { status, holder, context } = domainVerification;

        if (equals(status, 'Failure')) {
          domainVerificationStore.set({
            domain: [topLevelDomain],
            badgeCss: 'badge-error',
            tooltipForStatus: `There are errors for this domain, tipping will be disabled!`,
            verified: false
          });
        } else if (equals(status, 'Success')) {
          domainVerificationStore.set({
            domain: [topLevelDomain],
            badgeCss: 'badge-success',
            tooltipForStatus: `Creator is verified, click here for more info!`,
            verified: true,
            activeTab: tab
          });
        }
        checkingVerification.set(false);

        const isTippingEnabled = await sendMessage('pri(chain.tipping.enabledForContext)', {
          address: holder,
          context
        });

        tippingEnabled.set(isTippingEnabled);
      }

      // get all the accounts from the storage
      const accounts = await sendMessage('pri(accounts.get)', []);
      accountsStore.set(accounts as RequestAccountCreateSuri[]);

      // get all the accounts from the storage
      const connectedChain = await sendMessage('pri(config.getConnectedChain)');

      connectedChainStore.set(connectedChain);

      /**
       * chrome communication port
       */
      const port = makeRuntimePort();

      /**
       * This is super useful place to listen the events
       * Here usually catch the error and show it.
       *
       * Although it can be used to intercept all messages ( `else block` )
       */
      port.onMessage.addListener((msg: Message['data']) => {
        const { error } = msg;
        if (!isNil(error) && !isNil(error)) {
          notificationsStore.add(error, 'error', {
            time: 4000,
            close: true
          });
        } else {
          if (!isNil(msg.subscription)) {
            if (!isNil(msg.subscription['finalized'])) {
              // this can be improved, at the moment we only have one extrinsic, this will not work on multiple.
              tippingTransactionFinalized.set(true);
              tippingHash.set(msg.subscription['data'].hash);
            }
          } else {
            // console.debug('in init', msg);
          }
        }
      });
    }
  };
}

export const appStore = appStoreFn();

export interface ErrorStoreItem {
  id: string;
  message: string;
}

/**
 * Errors store function
 * @returns
 */
function errorsFn() {
  const { set, subscribe, update } = writable<ErrorStoreItem[]>([]);

  return {
    set,
    subscribe,
    add: async (text: string) => {
      const cid = await calculateCid(text);
      const item: ErrorStoreItem = {
        id: cid,
        message: text
      };
      update((oldState) => {
        return prepend(item, oldState);
      });
    },
    remove: (id: string) => {
      update((oldState) => {
        const filtered = reject(propEq('id', id), oldState);
        return filtered;
      });
    },
    reset: () => {
      set([]);
    }
  };
}

/**
 * Errors store
 */
export const errorsStore = errorsFn();

/**
 * derived store, useful for quick boolean choices like in the html
 */
export const showErrorsView = derived(errorsStore, ($errorsStore) => {
  if (!isEmpty($errorsStore)) {
    return true;
  } else {
    return false;
  }
});

// this file has no access to DOM

import { assert } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import { handler } from '$src/messaging/messaging';
import { getActiveTab, makeLogNamespace } from '$src/utils/utils';

import { PORT_CONTENT, PORT_EXTENSION } from '../config';

const loggerNS = makeLogNamespace('serviceWorker');

chrome.runtime.onInstalled.addListener(async () => {
  /**
   * here be a good place to setup storage
   * in this way we don't have to use it in the app and potentially will increase the security
   * for now just log that we have successfully launched the app
   * this is planned for 0.2.x version
   */

  console.debug(`${PORT_EXTENSION} Extension successfully installed!`);
});

// // Log storage changes, might be safely removed
// chrome.storage.onChanged.addListener((changes) => {
//   console.log(changes);

//   for (const [key, value] of Object.entries(changes)) {
//     debug(`"${key}" changed `, { from: value.oldValue, to: value.newValue });
//   }
// });

// this gets fired when the connection is instantiated in the Extension app
chrome.runtime.onConnect.addListener((port) => {
  assert([PORT_CONTENT, PORT_EXTENSION].includes(port.name), `Unknown connection from ${port.name}`);

  console.debug(`Connected to ${port.name}`);

  port.onMessage.addListener((data) => handler(data, port));

  port.onDisconnect.addListener(() => console.debug(`Disconnected from ${port.name}`));
});

// listen to tab updates this is fired on url change
chrome.tabs.onUpdated.addListener((_, changeInfo) => {
  // we are only interested in url change
  if (!changeInfo.url) {
    return;
  }

  getActiveTab();
});

// onetime connections, we don't use this, but keeping it as a reminder
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   debug('SW: runtime onetime message:', { request, sender });
//   sendResponse({ status: 'done' });
// });

// initial setup
cryptoWaitReady()
  .then((): void => {
    console.debug(`${loggerNS}`, 'crypto initialized');

    // load all the keyring data
    // keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });

    // debug('initialization completed');
  })
  .catch((error): void => {
    console.error('initialization failed', error);
  });

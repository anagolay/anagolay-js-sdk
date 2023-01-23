/// NOT USED ATM

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * THIS file will get injected to the url in the tab, it has all the access to the website dom
 */

import { makeLogNamespace } from '$src/utils/utils';

const logNs = makeLogNamespace('injectedPage');

// send message to content script which will then pass it to the service
// window.postMessage({
//   messageType: 'injection works',
//   data: {}
// });

// listen to the events from the other sources
window.addEventListener('message', ({ data, source }: any): void => {
  console.debug(logNs, data, source);
});

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * THE CONTENT JS FILE, THIS GETS INCLUDED STRAIGHT ON THE APP START, OUR WAY OF COMMUNICATION WITH THE INJECTED APP
 */

import { equals } from 'ramda';

import { MESSAGE_ORIGIN_CONTENT, MESSAGE_ORIGIN_PAGE, PORT_CONTENT } from '$src/config';
import type { Message } from '$src/types';
import { makeLogNamespace } from '$src/utils/utils';

const loggerNS = makeLogNamespace('contentScript');

// connect to the extension
const port = chrome.runtime.connect({ name: PORT_CONTENT });

// send any messages from the extension back to the page
port.onMessage.addListener((message: any): void => {
  console.debug(loggerNS, 'IN_ContentScript port:', message.data);

  window.postMessage({ ...message, origin: MESSAGE_ORIGIN_CONTENT }, '*');
});

// all messages from the page, pass them to the extension
window.addEventListener('message', ({ data, source }: Message): void => {
  // only allow messages from our window, by the inject
  console.debug(loggerNS, 'Payload is', data, source);

  // console.log('source !== window', source !== window);
  // console.log('data.origin', data.origin, MESSAGE_ORIGIN_PAGE);

  if (source !== window || data.origin !== MESSAGE_ORIGIN_PAGE) {
    return;
  }

  port.postMessage(data);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (equals('injected(canWeTalkToContentScript)', message)) {
    sendResponse(true);
  } else {
    console.warn(loggerNS, `got the message I cannot understand`, message);
  }
});

// chrome.runtime.onConnect.addListener((port) => {
//   // const portName = makePortName(PORT_CONTENT);
//   // assert([portName].includes(port.name), `Unknown connection from ${port.name} should be ${portName}`);

//   // message and disconnect handlers
//   port.onMessage.addListener((data: Record<string, unknown>) => {
//     console.debug('----an:IN::cs-----', data);
//     port.postMessage({
//       acknowledged: true
//     });
//   });
//   port.onDisconnect.addListener(() => console.debug(`an:IN::cs Disconnected from ${port.name}`));
// });

// inject our page that will have access to the Website DOM and send messages to our Extension

// const script = document.createElement('script');
// const injectedScriptPath = 'anagolayInjectedPage.js';
// script.src = chrome.runtime.getURL(injectedScriptPath);
// script.type = 'module';
// script.crossOrigin = '';

// script.onload = (): void => {
//   // remove the injecting tag when loaded
//   if (script.parentNode) {
//     script.parentNode.removeChild(script);
//   }
// };

// (document.head || document.documentElement).appendChild(script);

import { assert } from '@polkadot/util';
import { startsWith } from 'ramda';

import { EXTENSION_PREFIX, MESSAGE_ORIGIN_PAGE, PORT_EXTENSION } from '$src/config';
import type {
  MessageTypes,
  RequestSignatures,
  RequestTypes,
  ResponseTypes,
  TransportRequestMessage
} from '$src/types';

import { chrome, makeLogNamespace } from '../utils/utils';
import MessageHandler from './MessageHandler';

const logNs = makeLogNamespace('messaging');

interface Handler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (data: any) => void;
  reject: (error: Error) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriber?: (data: any) => void;
}

type Handlers = Record<string, Handler>;

const extension = new MessageHandler();

const handlers: Handlers = {};

// connect to the same port as extension
const ports: Record<string, chrome.runtime.Port> = {};

// counter for the next message IDs
let counter = 0;

export interface Message extends MessageEvent {
  data: {
    error?: string;
    id: string;
    origin: string;
    response?: string;
    subscription?: string;
  };
}

/**
 * Create chrome.runtime.port. This function will create a listener after port creation.
 *
 * Request resolving is done here
 * @param name -
 * @returns Initialized port
 */
export function makeRuntimePort(name: string = PORT_EXTENSION, addListener = true) {
  if (ports[name]) {
    return ports[name];
  }

  ports[name] = chrome.runtime.connect({ name });

  if (addListener) {
    // console.log('adding the listener, it is requested for', ports[name].name);
    // setup a listener for messages, any incoming resolves the promise
    ports[name].onMessage.addListener((data: Message['data']): void => {
      const handler = handlers[data.id];

      if (!handler) {
        console.error(`Unknown response: ${JSON.stringify(data)}`);

        return;
      }

      if (!handler.subscriber) {
        delete handlers[data.id];
      }

      if (data.subscription) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        (handler.subscriber as Function)(data.subscription);
      } else if (data.error) {
        handler.reject(new Error(data.error));
      } else {
        handler.resolve(data.response);
      }
    });
  }

  return ports[name];
}

/**
 *
 * @param message
 * @param request
 * @param subscriber
 * @returns
 */
export async function sendMessage<TMessageType extends MessageTypes>(
  message: TMessageType,
  request?: RequestTypes[TMessageType],
  subscriber?: (data: RequestSignatures[MessageTypes][2]) => void
): Promise<ResponseTypes[TMessageType]> {
  return new Promise((resolve, reject) => {
    const id = makeMessageId();
    handlers[id] = { reject, resolve, subscriber };

    makeRuntimePort().postMessage({ id, message, request: request || {} });

    const transportRequestMessage: TransportRequestMessage<TMessageType> = {
      id,
      message,
      origin: MESSAGE_ORIGIN_PAGE,
      request: request || (null as RequestTypes[TMessageType])
    };

    window.postMessage(transportRequestMessage, '*');
  });
}
/**
 * Handle the message for the SW and Content
 * @param messageData -
 * @param port -
 * @param extensionPortName -
 */
export async function handler<TMessageType extends MessageTypes>(
  messageData: TransportRequestMessage<TMessageType>,
  port?: chrome.runtime.Port,
  extensionPortName = PORT_EXTENSION
) {
  const realPort = port;

  const { id, message, request } = messageData;

  // this is a special case where we need to proxy to the content script
  // the case when the domain is verified but not reachable
  if (startsWith('injected(', message)) {
    // make the content chrome port
    // realPort = makeRuntimePort(PORT_CONTENT, false);
    return;
  }

  const isExtension = !port || port?.name === extensionPortName;

  const sender = port?.sender as chrome.runtime.MessageSender;
  // console.log('sender', sender);

  const from = isExtension ? 'extension' : (sender.tab && sender.tab.url) || sender.url || '<unknown>';

  const source = `${from}: ${id}: ${message}`;

  const promise = extension.handle(id, message, request, realPort);

  promise
    .then((response): void => {
      console.debug(logNs, `[out] ${source}`); // :: ${JSON.stringify(response)}`);

      // between the start and the end of the promise, the user may have closed
      // the tab, in which case port will be undefined
      assert(port, 'Port has been disconnected');
      port.postMessage({ id, response });
    })
    .catch((error: Error): void => {
      console.debug(logNs, `[err] ${source}:: ${error.message}`);

      // only send message back to port if it's still connected
      if (port) {
        port.postMessage({ error: error.message, id });
      }
    });
}

/**
 * Make the message id. Has side-effects
 * @returns
 */
export function makeMessageId(): string {
  return `${EXTENSION_PREFIX}.${Date.now()}.${++counter}`;
}

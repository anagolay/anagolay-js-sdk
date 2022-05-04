import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import { isNil } from 'remeda';

export const get: RequestHandler = async (event): Promise<RequestHandlerOutput> => {
  /**
   * Websocket server address without the client path.
   */
  const ws = event.url.searchParams.get('ws');

  /**
   * What is the Anagolay Chain ws url. Used for getting the operations
   */
  const anagolay_chain_ws: string = event.url.searchParams.get('anagolay_chain_ws');

  /**
   * Namespace to connect to. This is the shared namespace between this app and CLI
   */
  const namespace: string = event.url.searchParams.get('ns');

  /**
   * This is the path where to get the socket.io client library
   * https://socket.io/docs/v4/client-options/#path
   */
  const path: string = '/' + (event.url.searchParams.get('path') || 'ws');

  if (isNil(ws) || isNil(namespace)) {
    throw new Error('You have to set the ws and namespace');
  } else {
    return {
      status: 200,
      body: { ws, anagolay_chain_ws, namespace, path },
    };
  }
};

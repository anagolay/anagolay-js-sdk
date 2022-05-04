import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import { isNil } from 'remeda';

export const get: RequestHandler = async (event): Promise<RequestHandlerOutput> => {
  const ws: string = event.url.searchParams.get('ws');
  const anagolay_chain_ws: string = event.url.searchParams.get('anagolay_chain_ws');
  const namespace: string = event.url.searchParams.get('ns');
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

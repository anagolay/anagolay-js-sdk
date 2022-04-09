import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import { isNil } from 'remeda';

export const get: RequestHandler = async (event): Promise<RequestHandlerOutput> => {
  const ws = event.url.searchParams.get('ws');
  const namespace = event.url.searchParams.get('ns');
  const path = '/' + (event.url.searchParams.get('path') || 'ws');

  if (isNil(ws) || isNil(namespace)) {
    throw new Error('You have to set the ws and namespace');
  } else {
    return {
      status: 200,
      body: { ws, namespace, path },
    };
  }
};

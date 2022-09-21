import '@anagolay/types/augment-api';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { isNil } from 'ramda';

import rpcs from './temp_rpc';
export const defaultChainToConnect: string = 'wss://idiyanale-testnet.anagolay.io';

// Cached API connection
let cachedApiInstance: ApiPromise | undefined;

/**
 * Create a Websocket connection
 * @param connectTo - A host to connect to, default is `wss://idiyanale.rpc.anagolay.io`
 *
 * Example:
 ```ts
 import {connectToWs} from '@anagolay/api'
 const api = await connectToWs()
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
 * ```
 */
export async function connectToWs(connectTo: string = defaultChainToConnect): Promise<ApiPromise> {
  try {
    const provider = new WsProvider(connectTo);
    const api = await ApiPromise.create({
      provider,
      rpc: rpcs,
    });

    cachedApiInstance = api;
    return api;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

/**
 * If there is a cached instance it will be returned otherwise error is thrown
 */
export function getCachedApi(): ApiPromise {
  if (isNil(cachedApiInstance)) {
    throw new Error(`Connection doesn't exist`);
  }

  return cachedApiInstance;
}

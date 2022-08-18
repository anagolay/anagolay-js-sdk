// import '@anagolay/types/lib/augment-api.js';

import { ApiPromise, WsProvider } from '@polkadot/api';

export const defaultChainToConnect: string = 'wss://idiyanale-1.bootnode.dev.anagolay.io';

const { NODE_ENV } = process.env;

// Cached API connection
// let cachedApiInstance: ApiPromise;

/**
 * Create a Websocket connection
 * @param connectTo - A host to connect to, default is `wss://rpc.idiyanale.anagolay.io`
 *
 * Example:
 * ```ts
 * import {connectToWs} from '@anagolay/api'
 * const connection = await connectToWs()
 * ```
 */
export async function connectToWs(connectTo: string = defaultChainToConnect): Promise<ApiPromise> {
  try {
    if (NODE_ENV !== 'test') {
      console.log('API::connection to %s', connectTo);
    }

    const provider = new WsProvider(connectTo);
    const api = await ApiPromise.create({
      provider,
    });

    // if (NODE_ENV !== 'test') {
    //   api.on('disconnected', () => console.log('api', 'disconnected'));
    //   api.on('connected', () => console.log('api', 'connected'));
    //   api.on('error', (error: any) => console.log('api', 'error', error));

    //   // Retrieve the chain & node information information via rpc calls
    //   const [chain, nodeName, nodeVersion] = await Promise.all([
    //     api.rpc.system.chain(),
    //     api.rpc.system.name(),
    //     api.rpc.system.version(),
    //   ]);

    //   console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    // }

    return api;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

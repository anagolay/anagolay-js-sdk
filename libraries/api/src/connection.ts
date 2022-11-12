import { anagolaySchema, rpcDefinitions, rpcDefinitionsTemp, runtimeDefinitions } from '@anagolay/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ApiOptions } from '@polkadot/api/types';
import { isNil } from 'ramda';

export const defaultChainToConnect: string = 'wss://idiyanale-testnet.anagolay.io';

// Cached API connection
let cachedApiInstance: ApiPromise | undefined;

/**
 * Create a Websocket connection
 * @param connectTo - A host to connect to, default is `wss://idiyanale-testnet.anagolay.io`
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
  // try {
  const provider = new WsProvider(connectTo);
  const opts: ApiOptions = {
    provider,
    rpc: rpcDefinitionsTemp,
    runtime: runtimeDefinitions
  };

  const api = await ApiPromise.create(opts);
  await api.isReady;
  cachedApiInstance = api;
  return api;
  // } catch (error) {
  //   console.error('Error in connection.ts', error);
  //   throw new Error(error.message);
  // }
}

/**
 * THIS IS THE CONNECTION WITH REAL RPCS FROM THE DEFINITIONS. IT IS FAILING NOW, SO I MADE IT FOR TESTING
 * This includes the types as well
 * @param connectTo -
 * @returns
 */
export async function connectToWsWithCorrectRpc(
  connectTo: string = defaultChainToConnect
): Promise<ApiPromise> {
  // try {
  const provider = new WsProvider(connectTo);
  const opts: ApiOptions = {
    provider,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    types: anagolaySchema.types,
    rpc: rpcDefinitions,
    runtime: runtimeDefinitions
  };

  const api = await ApiPromise.create(opts);
  await api.isReady;
  cachedApiInstance = api;
  return api;
  // } catch (error) {
  //   console.error(error);
  //   throw new Error(error.message);
  // }
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

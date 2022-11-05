import { chainStore } from '$src/appStore';

/**
 * This creates the url for a block hash and connected chain. This method depends on the `chainStore`.
 * @param hash - block hash
 * @returns The url like  `https://polkadot.js.org/apps/?rpc=wss://${connectedChain}#/explorer/query/0xBlockHash`
 */
export function makeBlockUrl(hash: string): string {
  const url = chainStore.makePolkadotJsAppUrl();
  url.hash = `#/explorer/query/${hash}`;
  return url.toString();
}

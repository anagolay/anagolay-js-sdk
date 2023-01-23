/**
 * Generate the url for polkadotjs app by adding the your WS link to the RPC param
 * @param chainWs - in the form of `ws://localhost:9944`
 * @returns
 * @public
 */
export function makeRpcUrl(chainWs: string): URL {
  const url = new URL('https://polkadot.js.org/apps/');
  url.searchParams.set('rpc', chainWs);

  return url;
}

/**
 * This creates the url for a block hash and connected chain. This method depends on the `chainStore`.
 * @param chainWs - in the form of `ws://localhost:9944`
 * @param hash - block hash
 * @returns The url like  `https://polkadot.js.org/apps/?rpc=wss://${connectedChain}#/explorer/query/0xBlockHash`
 * @public
 */
export function makeBlockUrl(chainWs: string, hash: string): URL {
  const url = makeRpcUrl(chainWs);
  url.hash = `#/explorer/query/${hash}`;
  return url;
}

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { hexToString } from '@polkadot/util';
import { customTypesToJSON } from './helpers';
import { DefaultValues } from './interfaces';
import './interfaces/augment-api';
import './interfaces/augment-types';
// our local stuff
import * as definitions from './interfaces/definitions';

export let api: ApiPromise;

function showBlockInfo(api: ApiPromise): void {
  // make a call to retrieve the current network head
  api.rpc.chain.subscribeNewHeads(async (header) => {
    await api.rpc.chain.getBlock(header.hash, async (block) => {
      // don't crash
      try {
        const blockNumber = block.block.header.number.toNumber();
        console.log('Block is:', blockNumber);
        // Extrinsics in the block
        // const extrinsics = await block.block.extrinsics;
        // Check each extrinsic in the block
        // for (const extrinsic of extrinsics) {
        // This specific call index [0,1] represents `system.remark`
        //   console.log(extrinsic.callIndex);
        // if (extrinsic.callIndex[0] == 0 && extrinsic.callIndex[1] == 1) {
        //   console.log(extrinsic);
        // Get the byte data from a remark
        //   const [prefix, buffer] = parsePrefix(extrinsic.args[0]);
        // Get sender address
        //   const sender = extrinsic.signer.toString();
        // Route the rest of the buffer to the correct remarkable logic
        // }
        // }
      } catch (error) {
        console.error(error);
      }
    });
  });
}
/**
 * Constants from PoE Runtime
 * @param api
 */
export function constantsForPoe(api: ApiPromise): Promise<any> {
  const { hashAlgo, hashBits, encodingAlgo, encodingPrefix }: DefaultValues = api.consts.poe.defaults;
  const decoded = {
    hashAlgo: hexToString(hashAlgo.toHex()),
    hashBits: hashBits.toNumber(),
    encodingAlgo: hexToString(encodingAlgo.toHex()),
    encodingPrefix: hexToString(encodingPrefix.toHex()),
  };
  console.log('Constants for poe: ', decoded);
  return decoded;
}

export function getAlice(): KeyringPair {
  // Construct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  // Add Alice to our keyring with a hard-derived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice');
  return alice;
}

export async function setupConnection(): Promise<ApiPromise> {
  // this account ID comes from the customization of substrate-node-template
  // https://github.com/polkadot-js/api/blob/master/docs/start/types.extend.md
  // const allKnownCustomTypes = Object.assign({}, { Address: 'AccountId', LookupSource: 'AccountId' }, PoECustomTypes);

  // extract all types from definitions - fast and dirty approach, flatted on 'types'
  const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});

  // console.log('---- CUSTOM TYPES JSON ----\n');
  customTypesToJSON(types);
  // console.log('\n---- CUSTOM TYPES JSON ----\n');

  // Init the provider to connect to the local node
  // TODO put this in env or a constant
  const provider = new WsProvider('ws://127.0.0.1:9944');

  // Init the server
  api = await ApiPromise.create({
    types: {
      ...types,
      // chain-specific overrides
      Address: 'AccountId',
      LookupSource: 'AccountId',
    },
    provider,
  });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  console.log(`Connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

  //
  // API specific info
  //

  // showBlockInfo(api);
  constantsForPoe(api);

  return api;
}

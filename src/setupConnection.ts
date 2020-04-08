import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { PoECustomTypes } from './interfaces/poe/definitions';

// function toHexString(byteArray) {
//   return Array.from(byteArray, function (byte) {
//     return ('0' + (byte & 0xff).toString(16)).slice(-2);
//   }).join('');
// }

// function parsePrefix(buffer) {
//   if (!buffer) {
//     console.log('No Buffer');
//     return [null, null];
//   }

//   const string = toHexString(buffer);

//   if (string.length < 4) {
//     console.log('No remarkable prefix');
//     return [null, null];
//   }

//   // Return [prefix, restOfBuffer]
//   return [string.slice(0, 4), string.slice(4)];
// }

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
        //   // This specific call index [0,1] represents `system.remark`
        //   console.log(extrinsic.callIndex);
        //   // if (extrinsic.callIndex[0] == 0 && extrinsic.callIndex[1] == 1) {
        //   console.log(extrinsic);
        //   // Get the byte data from a remark
        //   const [prefix, buffer] = parsePrefix(extrinsic.args[0]);
        //   // Get sender address
        //   const sender = extrinsic.signer.toString();
        //   // Route the rest of the buffer to the correct remarkable logic
        //   // }
        // }
      } catch (error) {
        console.error(error);
      }
    });
  });
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
  const allKnownCustomTypes = Object.assign({}, { Address: 'AccountId', LookupSource: 'AccountId' }, PoECustomTypes);

  console.log('---- CUSTOM TYPES JSON ----\n');
  console.log(JSON.stringify(allKnownCustomTypes));
  console.log('\n---- CUSTOM TYPES JSON ----\n');
  // console.info('CREATING THE RULE PAYLOAD');
  // console.log(await createRulePayload(rule));

  // Initialise the provider to connect to the local node
  const provider = new WsProvider('ws://127.0.0.1:9944');

  // initialise via static create
  const api = await ApiPromise.create({ types: allKnownCustomTypes, provider });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);
  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  //
  // API specific info
  //

  // showBlockInfo(api);

  return api;
}

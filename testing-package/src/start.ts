/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import '@polkadot/api-augment';

import '@anagolay/types/augment-api';

import { type ApiPromise, connectToWs, connectToWsWithCorrectRpc, pallets } from '@anagolay/api';

/**
 *
 */
async function main(): Promise<void> {
  try {
    // this will pass
    const api: ApiPromise = await connectToWs();
    await pallets.operations.retrieveOperationsPaged(0, 10);

    // this will fail. the
    // pallets expect the cached api version
    const apiCorrectRpc: ApiPromise = await connectToWsWithCorrectRpc();
    await pallets.operations.retrieveOperationsPaged(0, 10);

    // console.log('anagolaySchema', JSON.stringify(anagolaySchema));

    // const rpcMethods = await api.rpc.rpc.methods();
    // for (const [version, methods] of rpcMethods) {
    //   console.log(version, methods);
    //   const m = methods.toJSON();
    //   console.log('m', m);
    // }

    // const ops = map(convertModel)(operationsRaw);
    // console.log('operations', ops);

    // const ops = await api.rpc.operations.getOperationsByIds([], 0, 4);
    // console.log('ops', ops, ops.toHuman());

    // const opsWithVersions = await api.rpc.operations.getOperationVersionsByIds([], 0, 2);
    // console.log('opsWithVersions', opsWithVersions.toHuman());

    // const totalOps = await api.query.operations.total();
    // console.log('totalOps', totalOps.toString());
    // console.log('genesis', api.genesisHash.toHex());
    // console.log('slotDuration %s ms', (await api.call.auraApi.slotDuration()).toString());

    // // The length of an epoch (session) in Babe
    // console.log(api.consts.babe.epochDuration.toNumber());

    // The amount required to create a new account
    // console.log('Existential Deposit %sIDI', api.consts.balances.existentialDeposit.toNumber());

    console.log('DONE');
  } catch (error) {
    console.log('error on connecting', error);
    process.exit(0);
  }
}
main().catch(console.error);

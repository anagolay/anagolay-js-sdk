/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import '@polkadot/api-augment';

import '@anagolay/types/augment-api';

/**
 *
 */
async function main(): Promise<void> {
  try {
    // this will pass
    // const api = await connectToWsWithCorrectRpc();
    // // await pallets.operations.retrieveOperationsPaged(0, 10);
    // const t: any = await api.rpc.tipping.getTips(
    //   '5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY',
    //   {
    //     UrlForDomain: ['https://woss.io', 'woss.io']
    //   },
    //   0,
    //   100,
    //   AnSortTips.desc
    // );

    // console.log('tips', t.toHuman());
    // console.log('anagolaySchema', JSON.stringify(anagolaySchema));

    // const rpcMethods = await api.rpc.rpc.methods();
    // for (const [version, methods] of rpcMethods) {
    //   console.log(version, methods);
    //   const m = methods.toJSON();
    //   console.log('m', m?.toString());
    // }

    // const allCtxs = await api.rpc.verification.getRequests([], null, 0, 100);
    // console.log('available contexts', JSON.stringify(allCtxs.toHuman(), null, 2));

    // const ctxs: AnVerificationContext[] = [
    //   {
    //     UrlForDomain: ['https://macula.link', 'macula.link']
    //   }
    // ];
    // const status: AnVerificationStatus = {
    //   Success: undefined
    // };
    // const verifCtx = await api.rpc.verification.getRequests(ctxs, status, 0, 10);
    // console.log('verifCtx', verifCtx.toHuman());

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

    // this will fail. the
    // pallets expect the cached api version
    // await connectToWsWithCorrectRpc();
    // await pallets.operations.retrieveOperationsPaged(0, 10);

    console.log('DONE');
    process.exit(0);
  } catch (error) {
    // console.log('error on connecting', error);
    process.exit(0);
  }
}
main().catch();

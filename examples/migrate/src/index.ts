// import { connectToApi, retrieveOperations } from './api';

import { connectToWs } from '@anagolay/api';
import { Keyring } from '@polkadot/api';
import { OperationWithVersions, retrieveOperations, retrieveWorkflows, WorkflowWithVersions } from './api.js';

function forEachPromise<T>(items: T[], fn: any) {
  return items.reduce(function (promise: any, item: T) {
    return promise.then(function () {
      return fn(item);
    });
  }, Promise.resolve());
}

async function main() {
  let apiSource = await connectToWs('wss://9944-anagolay-poavalidatorte-7r6uzm14n48.ws-eu62.gitpod.io');
  let apiDest = await connectToWs('wss://idiyanale-1.bootnode.dev.anagolay.io');

  const keyring = new Keyring({ type: 'sr25519' });
  const sudoPair = keyring.createFromUri(
    // Super secret sudo account seed
    '0x27dd0ad3f8b0e69171d1b269a937b186d7f33452cf60ec6da25b88702eff105e'
  );

  let ops = await retrieveOperations(apiSource);
  console.log('Operations from the source', JSON.stringify(ops, null, 2));

  await forEachPromise(
    ops,
    (op: OperationWithVersions) =>
      new Promise<void>((resolve) => {
        const submittable = apiDest.tx.operations.create(op.op.data, op.versions[0].data);
        const asSubmittable = apiDest.tx.sudo.sudoAs(op.accountId, submittable);
        asSubmittable.signAndSend(sudoPair, (result) => {
          const { dispatchError, isError, status, isFinalized } = result;
          console.log(
            `Operation ${op.op.data.name} transaction status: (status=${status},isError=${isError},dispatchError=${dispatchError})`
          );
          if (isFinalized) {
            resolve();
          }
        });
      })
  );

  let wfs = await retrieveWorkflows(apiSource);
  console.log('Workflows from the source', JSON.stringify(wfs, null, 2));

  await forEachPromise(
    wfs,
    (wf: WorkflowWithVersions) =>
      new Promise<void>((resolve) => {
        const submittable = apiDest.tx.workflows.create(wf.wf.data, wf.versions[0].data);
        const asSubmittable = apiDest.tx.sudo.sudoAs(wf.accountId, submittable);
        asSubmittable.signAndSend(sudoPair, (result) => {
          const { dispatchError, isError, status, isFinalized } = result;
          console.log(
            `Workflow ${wf.wf.data.name} transaction status: (status=${status},isError=${isError},dispatchError=${dispatchError})`
          );
          if (isFinalized) {
            resolve();
          }
        });
      })
  );

  ops = await retrieveOperations(apiDest);
  console.log(`Operations in the destination: ${ops.length}`);
  wfs = await retrieveWorkflows(apiDest);
  console.log(`Workflows in the destination: ${wfs.length}`);
}
main();

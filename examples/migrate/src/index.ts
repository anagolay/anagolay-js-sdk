import '@anagolay/types/augment-api';

import {
  Operation,
  OperationRecord,
  OperationVersion,
  OperationVersionRecord,
  ProofRecord,
  VersionId,
  Workflow,
  WorkflowRecord,
  WorkflowVersion,
} from '@anagolay/types';
import { ApiPromise } from '@anagolay/api';
import { Option } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';

import { connectToWs } from '@anagolay/api';
import { Keyring } from '@polkadot/api';
import { AccountInfo } from '@polkadot/types/interfaces/types.js';
import { hexToString } from '@anagolay/utils';

const fromApi: string = 'wss://9944-anagolay-poavalidatorte-7r6uzm14n48.ws-eu62.gitpod.io';
const toApi: string = 'wss://idiyanale-1.bootnode.dev.anagolay.io';

function forEachPromise<T>(items: T[], fn: any) {
  return items.reduce(function (promise: any, item: T) {
    return promise.then(function () {
      return fn(item);
    });
  }, Promise.resolve());
}

async function main() {
  let apiSource = await connectToWs(fromApi);
  let apiDest = await connectToWs(toApi);

  const keyring = new Keyring({ type: 'sr25519' });
  const sudoPair = keyring.createFromUri(
    // Super secret sudo account seed
    'private sheriff twelve time machine novel network drill knee horn club feature'
  );
  const {
    data: { free },
  } = await apiSource.query.system.account<AccountInfo>(sudoPair.address.toString());
  console.log('Free balance', free.toString());

  let ops = await retrieveOperations(apiSource);
  // console.log('Operations from the source', JSON.stringify(ops, null, 2));

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
  // console.log('Workflows from the source', JSON.stringify(wfs, null, 2));

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

export interface OperationWithVersions {
  op: Operation;
  versions: OperationVersion[];
  accountId: AccountId;
}

export interface WorkflowWithVersions {
  wf: Workflow;
  versions: WorkflowVersion[];
  accountId: AccountId;
}

/**
 * Fetch the operations from the chain then format them.
 * @param chain - Connected chain instance
 * @returns
 */
export async function retrieveOperations(chain: ApiPromise): Promise<OperationWithVersions[]> {
  // retrieve the operations from the chain
  const operations = await chain.query.operations.operationByOperationIdAndAccountId.entries<
    Option<OperationRecord>
  >();

  return await Promise.all(
    operations.map(async ([, opRecord]: [unknown, Option<OperationRecord>]) => {
      const op: Operation = opRecord.unwrap().record;

      const versionIds = await chain.query.operations.versionIdsByOperationId<VersionId[]>(op.id);

      const versions: OperationVersion[] = await Promise.all(
        versionIds.map(async (versionId: VersionId) => {
          const opVerRecord = await chain.query.operations.versionByVersionId<Option<OperationVersionRecord>>(
            versionId
          );
          return opVerRecord.unwrap().record;
        })
      );
      return {
        op,
        versions,
        accountId: opRecord.unwrap().accountId,
      };
    })
  );
}

/**
 * Fetch the workflows from the chain then format them.
 * @param chain - Connected chain instance
 * @returns
 */
export async function retrieveWorkflows(chain: ApiPromise): Promise<WorkflowWithVersions[]> {
  // retrieve the operations from the chain
  const workflows = await chain.query.workflows.workflowByWorkflowIdAndAccountId.entries<
    Option<WorkflowRecord>
  >();

  return await Promise.all(
    workflows.map(async ([, wfRecord]: [unknown, Option<WorkflowRecord>]) => {
      const wf: Workflow = wfRecord.unwrap().record;

      const versionIds = await chain.query.workflows.versionIdsByWorkflowId<VersionId[]>(wf.id);

      const versions: WorkflowVersion[] = await Promise.all(
        versionIds.map(async (versionId: VersionId) => {
          const wfVerRecord = await chain.query.workflows.versionByVersionId<Option<OperationVersionRecord>>(
            versionId
          );
          return wfVerRecord.unwrap().record;
        })
      );
      return {
        wf,
        versions,
        accountId: wfRecord.unwrap().accountId,
      };
    })
  );
}

async function sadas() {
  let api = await connectToWs(toApi);
  const t = await api.query.poe.proofByProofIdAndAccountId.entries<Option<ProofRecord>>();
  t.map(async ([, proof]: [unknown, Option<ProofRecord>]) => {
    const s = proof.unwrap().record;
    console.log('proof ID', hexToString(s.id.toString()));
  });
}
sadas();
// run the script
// main();

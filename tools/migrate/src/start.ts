/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import '@polkadot/api-augment';

import '@anagolay/types/augment-api';

import { connectToWs } from '@anagolay/api';
import {
  Operation,
  OperationRecord,
  OperationVersion,
  OperationVersionId,
  OperationVersionRecord,
  ProofRecord,
  Workflow,
  WorkflowRecord,
  WorkflowVersion,
  WorkflowVersionId,
} from '@anagolay/types';
import { Keyring } from '@polkadot/api/bundle';
import { ApiPromise } from '@polkadot/api/promise/Api';
import { AccountId } from '@polkadot/types/interfaces/runtime/types';
import { AccountInfo } from '@polkadot/types/interfaces/system/types';
import { Option } from '@polkadot/types-codec/base/Option';
import { hexToString } from '@polkadot/util/hex/toString';
import { find, indexOf, isNil, remove } from 'ramda';

const fromApi: string = 'wss://9944-anagolay-poavalidatorte-a1njzzqy8op.ws-eu64.gitpod.io';
const toApi: string = 'wss://idiyanale-testnet.anagolay.io';

function forEachPromise<T>(items: T[], fn: any) {
  return items.reduce(function (promise: any, item: T) {
    return promise.then(function () {
      return fn(item);
    });
  }, Promise.resolve());
}

async function migrate_wfs_and_ops() {
  const apiSource = await connectToWs(fromApi);
  const apiDest = await connectToWs(toApi);

  const keyring = new Keyring({ type: 'sr25519' });
  const sudoPair = keyring.createFromUri(
    // Super secret sudo account seed
    // '//Alice'
    'private sheriff twelve time machine novel network drill knee horn club feature'
  );

  console.log('sudoPair.address.toString()', sudoPair.address.toString());
  const {
    data: { free },
  } = await apiSource.query.system.account<AccountInfo>(sudoPair.address.toString());
  console.log('Free balance', free.toString());

  let ops = await retrieveOperations(apiSource);
  // console.log('Operations from the source', JSON.stringify(ops, null, 2));

  function findLastVersion(
    versions: OperationVersion[] | WorkflowVersion[]
  ): OperationVersion | WorkflowVersion | undefined {
    const root = find((v: OperationVersion | WorkflowVersion) => v.data.parentId.isNone)(versions);
    let current = root;
    const findChild = (parentId: OperationVersionId | WorkflowVersionId | undefined) =>
      find((v: OperationVersion | WorkflowVersion) => parentId === v.data.parentId.unwrapOrDefault());
    let child = findChild(current?.id)(versions);
    while (!isNil(child)) {
      remove(indexOf(child)(versions), 1, versions);
      current = child;
      child = findChild(current?.id)(versions);
    }
    return current;
  }

  await forEachPromise(
    ops,
    (op: OperationWithVersions) =>
      new Promise<void>((resolve) => {
        const submittable = apiDest.tx.operations.create(op.op.data, findLastVersion(op.versions)?.data);
        const asSubmittable = apiDest.tx.sudo.sudoAs(op.accountId, submittable);
        asSubmittable.signAndSend(sudoPair, (result: any) => {
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
        const submittable = apiDest.tx.workflows.create(wf.wf.data, findLastVersion(wf.versions)?.data);
        const asSubmittable = apiDest.tx.sudo.sudoAs(wf.accountId, submittable);
        asSubmittable.signAndSend(sudoPair, (result: any) => {
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

      const versionIds = await chain.query.operations.versionIdsByOperationId<OperationVersionId[]>(op.id);

      const versions: OperationVersion[] = await Promise.all(
        versionIds.map(async (versionId: OperationVersionId) => {
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

      const versionIds = await chain.query.workflows.versionIdsByWorkflowId<WorkflowVersionId[]>(wf.id);

      const versions: WorkflowVersion[] = await Promise.all(
        versionIds.map(async (versionId: WorkflowVersionId) => {
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

async function paginate() {
  const apiSource = await connectToWs(toApi);

  const ops = await (apiSource.rpc as any).operations.getOperationsByIds([], 0, 10);
  console.log(ops.map((op: Operation) => JSON.stringify(op.toHuman()), null, 4));

  const wfs = await (apiSource.rpc as any).workflows.getWorkflowsByIds([], 0, 10);
  console.log(wfs.map((wf: Workflow) => JSON.stringify(wf.toHuman()), null, 4));
}

async function sadas() {
  const api = await connectToWs(toApi);
  const t = await api.query.poe.proofByProofIdAndAccountId.entries<Option<ProofRecord>>();
  t.map(async ([, proof]: [unknown, Option<ProofRecord>]) => {
    const s = proof.unwrap().record;
    console.log('proof ID', hexToString(s.id.toString()));
  });
}

async function main() {
  //migrate_wfs_and_ops();
  //paginate();
}

main();

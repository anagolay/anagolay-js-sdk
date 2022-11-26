/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToWs, IOperationWithVersions } from '@anagolay/api';
import { pallets } from '@anagolay/api';
import { AnOperationVersion, AnOperationVersionId, AnWorkflowArtifactStructure } from '@anagolay/types';
import Keyring from '@polkadot/keyring';
import { AccountId, AccountInfo } from '@polkadot/types/interfaces';
import { ISubmittableResult } from '@polkadot/types/types';
import { Command } from 'commander';
import { find, indexOf, isEmpty, isNil, remove } from 'ramda';

import { createFileLogger, Logger } from '$src/logger';
import { ISuccessfulResponse } from '$src/publish';
import { logsDir } from '$src/utils';

let log: Logger;

function forEachPromise<T>(items: T[], fn: any): any {
  return items.reduce(function (promise: any, item: T) {
    return promise.then(function () {
      return fn(item);
    });
  }, Promise.resolve());
}

export interface ILocalOperationWithVersions extends IOperationWithVersions {
  accountId: AccountId;
}

/**
 * Publish workflow successful response
 */
export type IWorkflowVersionSchema = ISuccessfulResponse<AnWorkflowArtifactStructure>;

export default async function createSubCommand(): Promise<Command> {
  log = createFileLogger(`${logsDir()}/migrations_operations.log`, { name: 'operations' });

  const cmd = new Command('operations');
  cmd
    .description('Migrate operations from one chain to another')
    .option('--from <char>', 'from chain', 'wss://idiyanale-testnet.anagolay.io')
    .option('--to <char>', 'to chain', '')
    .action(operations);

  return cmd;
}

/**
 * Workflow create subcommand.
 *
 * @privateRemarks [Gitlab issue](https://gitlab.com/anagolay/anagolay-js/-/issues/97)
 *
 * @public
 */
async function operations(options: { to: string; from: string }): Promise<void> {
  const { from, to } = options;
  if (isEmpty(to)) {
    throw new Error('to param must be provided');
  }

  const artifactCids: string[] = [];

  const apiSource = await connectToWs(from);

  log.info('FROM chain is connected %s', from);
  console.log('FROM chain is connected %s', from);

  const keyring = new Keyring({ type: 'sr25519' });

  const sudoPair = keyring.createFromUri(
    // Super secret sudo account seed
    '//Alice'
  );

  const {
    data: { free }
  } = await apiSource.query.system.account<AccountInfo>(sudoPair.address.toString());
  console.log('Free balance', free.toString());

  const ops = await pallets.operations.retrieveOperationsPaged();

  function findLastVersion(versions: AnOperationVersion[]): AnOperationVersion | undefined {
    const root = find((v: AnOperationVersion) => isNil(v.data.parentId))(versions);

    let current = root;

    const findChild = (parentId: AnOperationVersionId | undefined): any =>
      find((v: AnOperationVersion) => parentId === v.data.parentId);

    let child = findChild(current?.id)(versions);

    while (!isNil(child)) {
      remove(indexOf(child)(versions), 1, versions);
      current = child;
      child = findChild(current?.id)(versions);
    }
    const a = current?.data.artifacts.map((e) => e.ipfsCid) as string[];
    artifactCids.push(...a);
    return current;
  }

  // we need to have this AFTER so the pallets will not pick it up. it is build like this, do not question it :D
  const apiDest = await connectToWs(to);
  console.log('Destination chain is connected %s', to);

  await forEachPromise(
    ops,
    (op: any) =>
      new Promise<void>((resolve) => {
        const submittable = apiDest.tx.operations.create(
          op.operation.data,
          findLastVersion(op.versions)?.data
        );

        const asSubmittable = apiDest.tx.sudo.sudoAs(op.accountId, submittable);

        asSubmittable.signAndSend(sudoPair, (params: ISubmittableResult) => {
          const { dispatchError, isError, status, isFinalized } = params;

          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = apiDest.registry.findMetaError(dispatchError.asModule);

              const { docs, name, section } = decoded;

              console.log(`(error) from module ${section}.${name}: ${docs.join(' ')}`);
            }
          }

          console.log(
            `Operation ${op.operation.data.name} transaction status: (status=${status},isError=${isError},dispatchError=${dispatchError})`
          );

          if (isFinalized) {
            resolve();
          }
        });
      })
  );

  // console.log(JSON.stringify(artifactCids));
  process.exit(0);
}

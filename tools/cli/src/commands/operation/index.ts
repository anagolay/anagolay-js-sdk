/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

import { connectToWs as connectToChainViaWs } from '@anagolay/api';
import { AnOperationArtifactStructure, AnOperationData, AnOperationVersionData } from '@anagolay/types';
import { allCommitsPushed, lastRevision, urlForRemote } from '@anagolay/util';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { EventRecord } from '@polkadot/types/interfaces';
import { hexToString } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import clui from 'clui';
import { Command } from 'commander';
import { stat } from 'node:fs/promises';
import { equals } from 'ramda';
import signale from 'signale';

import { ISignSubmitErrorReturn, ISignSubmitSuccessReturn, signAndSubmit } from '$src/api';
import { chooseAccount } from '$src/commonQuestions/account';
import { askStarterQuestions } from '$src/commonQuestions/common';
import { createFileLogger, Logger } from '$src/logger';
import { callPublishService, ISuccessfulResponse } from '$src/publish';
import { ensureBalance, logsDir, showArtifactTable } from '$src/utils';

// eslint-disable-next-line @rushstack/typedef-var
const Spinner = clui.Spinner;

let log: Logger;

/**
 * Publish operation successful response
 */
interface IOperationVersionSchema extends ISuccessfulResponse<AnOperationArtifactStructure> {
  manifest: string;
}

/**
 * Operation main Command
 *
 * Usage Example
 * ```bash
 * # run the subcommands
 * anagolay operation sub_command
 *
 * # or get help
 * anagolay help operation
 * ```
 *
 * @public
 */
export default async function makeCommand(): Promise<Command> {
  log = createFileLogger(`${logsDir()}/operation.log`, { name: 'operation' });

  const operationCmd = new Command('operation');
  operationCmd.description('All operation related commands');

  operationCmd
    .command('publish')
    .description('Publish the Operation. You must run this in the Operation repository!')
    .action(publishSubcmd);

  return operationCmd;
}

/**
 *
 * Performs the sanity checks, calls the publish Service and stores teh data on the Anagolay chain.
 *
 * Usage Example
 * ```bash
 * anagolay operation publish
 * ```
 * @public
 */
async function publishSubcmd(): Promise<void> {
  await askStarterQuestions();
  console.time('Total execution elapsed time');
  const spinSanityCheck = new Spinner('Performing sanity checks ...');
  spinSanityCheck.start();

  // check the operation
  await areWeInTheOperationFolder();

  // do we have any commits that are not pushed?
  if (!(await allCommitsPushed(process.cwd()))) {
    signale.error('Please push all your commits before continuing.');
  }
  spinSanityCheck.stop();
  signale.success('Sanity checks, done!');

  let repository: string;
  try {
    repository = await urlForRemote('origin');
  } catch (error) {
    signale.error(error);
    process.exit(1);
  }

  const revision = await lastRevision(process.cwd());

  const payloadData = {
    context: 'operation',
    payload: {
      repository,
      revision
    }
  };

  const publishResponse = await callPublishService<AnOperationArtifactStructure, IOperationVersionSchema>(
    log,
    payloadData
  );

  const operationData: AnOperationData = JSON.parse(hexToString(publishResponse.manifest));
  const versionData: AnOperationVersionData = {
    entityId: undefined,
    parentId: undefined,
    artifacts: publishResponse.artifacts.items
  };

  const chain = await connectToChainViaWs();

  const extrinsics = await submitTheExtrinsicCall(chain, operationData, versionData);

  console.log('> TX is at blockHash', extrinsics.blockHash);
  console.log('> Manifest ID is', extrinsics.entityId);

  showArtifactTable(versionData.artifacts);

  console.timeEnd('Total execution elapsed time');
  signale.success('DONE 🎉🎉!');
  process.exit();
}
/**
 * Prepare and Create extrinsics, call the api and return the data
 * @param chainApi  -
 * @param operationData -
 * @param versionData -
 * @returns
 */
async function submitTheExtrinsicCall(
  chainApi: ApiPromise,
  operationData: AnOperationData,
  versionData: AnOperationVersionData
): Promise<ISignSubmitSuccessReturn> {
  // console.log('%o %o', operationData, versionData);

  // Wait WASM interface initialization
  await cryptoWaitReady();

  // Get holder for the actual account having enough balance
  const { accountToUse } = await chooseAccount();
  const account: KeyringPair = await ensureBalance(chainApi, accountToUse);

  // hold this until the end, clui doesn't like the signale
  let entityId: string = '';

  const spinner = new Spinner('');
  const submittable = chainApi.tx.operations.create(operationData, versionData);
  const eventsHandler = (events: EventRecord[]): void => {
    events.forEach((record) => {
      const { event } = record;
      if (equals(event.method, 'OperationCreated')) {
        entityId = hexToString(event.data[1].toString());
        spinner.message(`Operation created ID: ${entityId}`);
        log.info(`Operation created ID: ${entityId}`);
      }
    });
  };

  try {
    const blockHash = await signAndSubmit(account, submittable, spinner, eventsHandler);
    return { blockHash, entityId };
  } catch (error) {
    const { message, errorType } = error as ISignSubmitErrorReturn;
    signale.error(`${message} :: ${errorType}`);
    process.exit(1);
  }
}

/**
 * Check the existence of the correct files, and if they don't exist, fail, log error and exit with the status `1`.
 */
async function areWeInTheOperationFolder(): Promise<void> {
  try {
    // a list of files we need to have in order to determine that the folder contains the operation
    const mustHaveFiles = ['Cargo.toml', 'Makefile.toml'];

    // do the checks, throw the error if something is not ok
    await Promise.all(mustHaveFiles.map(async (m) => await stat(`${process.cwd()}/${m}`)));
  } catch (error) {
    log.error(error);
    signale.error(
      `You should run this command in the Operation root directory. You are running it in ${process.cwd()}`
    );
    process.exit(1);
  }
}

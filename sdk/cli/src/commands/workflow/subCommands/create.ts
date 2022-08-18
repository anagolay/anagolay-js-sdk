import { connectToWs, defaultChainToConnect } from '@anagolay/api';
import { AnWorkflowArtifactStructure, AnWorkflowData, AnWorkflowVersionData } from '@anagolay/types';
import { createFileLogger, Logger } from '@anagolay/utils';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { EventRecord } from '@polkadot/types/interfaces';
import { hexToString } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import clui from 'clui';
import { Command } from 'commander';
import { randomUUID } from 'crypto';
import { URL } from 'node:url';
import { equals } from 'ramda';
import signale from 'signale';

import { ISignSubmitErrorReturn, ISignSubmitSuccessReturn, signAndSubmit } from '$src/api';
import { chooseAccount } from '$src/commonQuestions/account';
import { askStarterQuestions } from '$src/commonQuestions/common';
import { websocketURL, workflowBuilderURL } from '$src/config';
import { callPublishService, ISuccessfulResponse } from '$src/publish';
import { ensureBalance, logsDir, showArtifactTable } from '$src/utils';
import { connectToWebsocketRelayAndListenFowWorkflow, IWorkflowBuild } from '$src/websocketService';

const log: Logger = createFileLogger(`${logsDir()}/workflow.log`, { name: 'workflow' });

/**
 * Publish workflow successful response
 */
export type IWorkflowVersionSchema = ISuccessfulResponse<AnWorkflowArtifactStructure>;

// eslint-disable-next-line @rushstack/typedef-var
const Spinner = clui.Spinner;

export default async function createSubCommand(): Promise<Command> {
  const cmd = new Command('create');
  cmd
    .description('Create the Workflow in web UI. Logs are available here ~/.logs/anagolay/workflow.log')
    .action(create);
  return cmd;
}

/**
 * Workflow create subcommand.
 *
 * @privateRemarks [Gitlab issue](https://gitlab.com/anagolay/anagolay-js/-/issues/97)
 *
 * @public
 */
async function create(): Promise<void> {
  await askStarterQuestions();
  console.time('Total execution elapsed time');

  // DO NOT CHANGE the structure, this always must be in this format.
  const namespace: string = `workflow_${randomUUID()}`;

  // better link building
  const link = new URL(workflowBuilderURL as string);
  link.searchParams.append('ws', websocketURL);
  link.searchParams.append('anagolay_chain_ws', defaultChainToConnect);
  link.searchParams.append('ns', namespace);
  link.searchParams.append('path', 'ws');

  console.log(
    `Open this link to start building the Workflow (Ctrl+click): \n ${workflowBuilderURL}#${link.searchParams.toString()}`
  );

  const workflowBuild: IWorkflowBuild = await connectToWebsocketRelayAndListenFowWorkflow(namespace);

  const chain: ApiPromise = await connectToWs();

  // Wait WASM interface initialization
  await cryptoWaitReady();

  // Get holder for the actual account having enough balance
  const { accountToUse } = await chooseAccount();
  const account: KeyringPair = await ensureBalance(chain, accountToUse);
  workflowBuild.manifestData.creators.push(account.address);

  // @TODO: the publish service accept a workflow manifest were maps are plain objects (as in JSON),
  // since it insert this JSON in the artifact's manifest.
  // We could use serializeAndParse() here to convert IWorkflowBuild to our transport level
  // representation were maps are objects augmented with metadata to make the call to publisher service,
  // but it would be pointless because on the other side we would still need, after the parse(), to write the
  // code to transform maps to plain object in order to insert the information into the artifact's manifest.
  // So I simply send JSON now.
  const payload = JSON.parse(
    JSON.stringify(workflowBuild, (key, value) => {
      if (value instanceof Map) {
        return Object.fromEntries(value);
      } else {
        return value;
      }
    })
  );

  const payloadData = {
    context: 'workflow',
    payload,
  };

  const publishResponse = await callPublishService<AnWorkflowArtifactStructure, IWorkflowVersionSchema>(
    log,
    payloadData
  );

  const versionData: AnWorkflowVersionData = {
    entityId: undefined,
    parentId: undefined,
    artifacts: publishResponse.artifacts.items,
  };

  const extrinsics = await submitTheExtrinsicCall(chain, account, workflowBuild.manifestData, versionData);

  console.log('> TX is at blockHash', extrinsics.blockHash);
  console.log('> Workflow name:', workflowBuild.manifestData.name);
  console.log('> Manifest ID is', extrinsics.entityId);

  showArtifactTable(versionData.artifacts);

  console.timeEnd('Total execution elapsed time');
  signale.success('DONE 🎉🎉!');
  process.exit();
}

async function submitTheExtrinsicCall(
  chainApi: ApiPromise,
  account: KeyringPair,
  workflowData: AnWorkflowData,
  workflowVersionData: AnWorkflowVersionData
): Promise<ISignSubmitSuccessReturn> {
  log.info('Submitting the extrinsic call');

  // console.log('%o %o', workflowData, workflowVersionData);

  let entityId: string = '';

  const spinner = new Spinner('Creating submittable extrinsic ...');
  spinner.start();

  const submittable = chainApi.tx.workflows.create(workflowData, workflowVersionData);

  const eventsHandler = (events: EventRecord[]): void => {
    events.forEach((record) => {
      const { event } = record;
      if (equals(event.method, 'WorkflowCreated')) {
        entityId = hexToString(event.data[1].toString());
        spinner.stop();
        log.info(`Workflow created with ID: ${entityId}`);
      }
    });
  };

  try {
    const blockHash = await signAndSubmit(account, submittable, spinner, eventsHandler);
    spinner.stop();
    return { blockHash, entityId };
  } catch (error) {
    spinner.stop();
    const { message, errorType } = error as ISignSubmitErrorReturn;
    signale.error(`${message} :: ${errorType}`);
    process.exit(1);
  }
}

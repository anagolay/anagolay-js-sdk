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
import { callPublishService, ISuccessfulResponse } from '$src/publish';
import { connectToAnagolayChain, ensureBalance, logsDir } from '$src/utils';
import { connectToWSAndListenFowWorkflow, IWorkflowBuild } from '$src/websocketService';

const { ANAGOLAY_WORKFLOW_BUILDER_UI, ANAGOLAY_CHAIN_WS_URL, ANAGOLAY_WEBSOCKET_SERVICE_API_URL } =
  process.env;

if (!ANAGOLAY_WORKFLOW_BUILDER_UI) throw new Error('ANAGOLAY_WORKFLOW_BUILDER_UI is not set');
if (!ANAGOLAY_WEBSOCKET_SERVICE_API_URL) throw new Error('ANAGOLAY_WEBSOCKET_SERVICE_API_URL is not set');
if (!ANAGOLAY_CHAIN_WS_URL) throw new Error('ANAGOLAY_CHAIN_WS_URL is not set');

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

  const namespace: string = `workflow_${randomUUID()}`;
  // in vscode container we use host.docker.internal
  const wsURL: string = (ANAGOLAY_WEBSOCKET_SERVICE_API_URL as string)?.includes('host.docker.internal')
    ? (ANAGOLAY_WEBSOCKET_SERVICE_API_URL as string).replace('host.docker.internal', '127.0.0.1')
    : (ANAGOLAY_WEBSOCKET_SERVICE_API_URL as string);

  // in vscode container we use host.docker.internal
  const chainURL: string = (ANAGOLAY_CHAIN_WS_URL as string)?.includes('host.docker.internal')
    ? (ANAGOLAY_CHAIN_WS_URL as string).replace('host.docker.internal', '127.0.0.1')
    : (ANAGOLAY_CHAIN_WS_URL as string);

  // better link building
  const link = new URL(ANAGOLAY_WORKFLOW_BUILDER_UI as string);
  link.searchParams.append('ws', wsURL);
  link.searchParams.append('anagolay_chain_ws', chainURL);
  link.searchParams.append('ns', namespace);
  link.searchParams.append('path', 'ws');

  console.log(`Open this link to start building the Workflow (Ctrl+click): \n${link}`);

  const workflowBuild: IWorkflowBuild = await connectToWSAndListenFowWorkflow(namespace);

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

  const chain: ApiPromise = await connectToAnagolayChain();

  const extrinsics = await submitTheExtrinsicCall(chain, workflowBuild.manifestData, versionData);

  console.log('> Workflow TX is at blockHash', extrinsics.blockHash);
  console.log('> Workflow ID is', extrinsics.entityId);
  signale.success('Publishing is DONE 🎉🎉!');
  process.exit();
}

async function submitTheExtrinsicCall(
  chainApi: ApiPromise,
  workflowData: AnWorkflowData,
  workflowVersionData: AnWorkflowVersionData
): Promise<ISignSubmitSuccessReturn> {
  // Wait WASM interface initialization
  await cryptoWaitReady();

  // Get holder for the actual account having enough balance
  const { accountToUse } = await chooseAccount();
  const account: KeyringPair = await ensureBalance(chainApi, accountToUse);
  workflowData.creators.push(account.address);

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
        spinner.message(`Workflow created ID: ${entityId}`);
        log.info(`Workflow created with ID: ${entityId}`);
        spinner.stop();
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

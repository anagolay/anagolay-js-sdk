import { AnWorkflowData } from '@anagolay/types';
import { Command } from 'commander';

import { askStarterQuestions } from '../../../commonQuestions/common';
import { connectToWSAndListenFowWorkflow } from '../../../websocketService';

const { ANAGOLAY_WORKFLOW_BUILDER_UI, ANAGOLAY_CHAIN_WS_URL } = process.env;

if (!ANAGOLAY_WORKFLOW_BUILDER_UI) throw new Error('ANAGOLAY_WORKFLOW_BUILDER_UI is not set');
if (!ANAGOLAY_CHAIN_WS_URL) throw new Error('ANAGOLAY_CHAIN_WS_URL is not set');

export default async function createSubCommand(): Promise<Command> {
  // eslint-disable-next-line @typescript-eslint/typedef
  const cmd = new Command('create');
  cmd
    .description(
      'Create the Workflow. This command will create a link for you to open where you can create Workflow using web UI.'
    )
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

  // const namespace: string = `workflow-${randomUUID()}`;
  const namespace: string = `workflow-85f2477c-c321-4625-b421-d9ad52d7eac5`;
  const wsURL: string = encodeURIComponent(
    (ANAGOLAY_CHAIN_WS_URL as string)?.includes('docker') // in vscode container we use docker-internal.local
      ? 'http://localhost:2113'
      : (ANAGOLAY_CHAIN_WS_URL as string)
  );

  const link: string = `${ANAGOLAY_WORKFLOW_BUILDER_UI}?ws=${wsURL}&ns=${namespace}&path=ws`;
  console.log(`Follow this link to start building the Workflow: \n${link}`);

  const message: AnWorkflowData = await connectToWSAndListenFowWorkflow(namespace);

  console.log(message);

  // const accountType: IAccountToUse = await chooseAccount();
}

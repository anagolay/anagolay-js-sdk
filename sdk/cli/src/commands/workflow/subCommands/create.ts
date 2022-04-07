import { Command } from 'commander';

import { chooseAccount, IAccountToUse } from '../../../commonQuestions/account';
import { askStarterQuestions } from '../../../commonQuestions/common';
import { connectToWSAndListen } from '../../../websocketService';

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
  const message = await connectToWSAndListen();

  console.log(message);

  const accountType: IAccountToUse = await chooseAccount();
}

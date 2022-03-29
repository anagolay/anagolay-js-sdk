import clui from 'clui';
import { Command } from 'commander';
import inquirer from 'inquirer';

// eslint-disable-next-line @rushstack/typedef-var
const Spinner = clui.Spinner;

import { askStarterQuestions } from '../../../commonQuestions/common';

export default async function createSubCommand(): Promise<Command> {
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

  const spinSanityCheck = new Spinner('Performing sanity checks ...');
  spinSanityCheck.start();

  const answers = await inquirer.prompt([
    {
      name: 'Which chain you want to connect to?',
      type: 'list',
      choices: [
        {
          key: 'anagolay-',
          value: 'alice',
          name: 'With Alice',
        },
        {
          key: 'personal',
          value: 'personal',
          name: 'With my personal account',
        },
      ],
    },
  ]);
  console.log(answers);
}

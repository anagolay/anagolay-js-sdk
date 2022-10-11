import { Command } from 'commander';

import create from './subCommands/create';

/**
 * Workflow main Command
 *
 * @remarks Usage `anagolay help workflow`
 *
 * @public
 */
export default async function makeCommand(): Promise<Command> {
  const cmd = new Command('workflow');
  cmd.description('All Workflow related commands');

  // add subcommands
  cmd.addCommand(await create());

  return cmd;
}

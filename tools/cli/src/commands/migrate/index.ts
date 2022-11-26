import { Command } from 'commander';

import operations from './subCommands/operations';

/**
 * Workflow main Command
 *
 * @remarks Usage `anagolay help workflow`
 *
 * @public
 */
export default async function makeCommand(): Promise<Command> {
  const cmd = new Command('migrate');
  cmd.description('Migration commands, useful when you want to pull something from one chain to another');

  // add subcommands
  cmd.addCommand(await operations());

  return cmd;
}

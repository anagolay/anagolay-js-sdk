#!/usr/bin/env -S node --experimental-modules --experimental-specifier-resolution=node

/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

import { Command } from 'commander';

import makeOperationCommand from './commands/operation';
import makeWorkflowCommand from './commands/workflow';

/**
 * Main entrypoint for the CLI
 */
async function main(): Promise<void> {
  // const program = commander.createCommand();
  const cmd = new Command();

  cmd.version('0.7.0').description(`Welcome to Anagolay CLI.

Logs dir                ~/.logs/anagolay
Settings and cache dir  ~/.cache/anagolay
`);

  /// HERE we start with adding the 1st level commands
  cmd.addCommand(await makeOperationCommand());
  cmd.addCommand(await makeWorkflowCommand());

  await cmd.parseAsync();
  // program.commands.map((cmd1) => {
  //   cmd1.commands.map((cmd2) => {
  //     console.log(`anagolay ${cmd1.command.name} ${cmd2.command.name}`);
  //   });
  // });
}

main().catch(console.error);

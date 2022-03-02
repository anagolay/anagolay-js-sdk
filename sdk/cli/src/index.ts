#!/usr/bin/env -S node --experimental-modules --experimental-specifier-resolution=node

/**
 * Anagolay JS
 * Copyright (C) 2022  Anagolay  Network
 * For Full license read LICENSE file
 */

import { Command } from 'commander';

import makeOperationCommand from './commands/operation';

/**
 * Main entrypoint for the CLI
 */
async function main(): Promise<void> {
  // const program = commander.createCommand();
  const program = new Command('main');
  program.version('0.7.0').description('Welcome to Anagolay CLI');
  program.addCommand(await makeOperationCommand());

  await program.parseAsync();
  // program.commands.map((cmd1) => {
  //   cmd1.commands.map((cmd2) => {
  //     console.log(`anagolay ${cmd1.command.name} ${cmd2.command.name}`);
  //   });
  // });
}

main().catch(console.error);

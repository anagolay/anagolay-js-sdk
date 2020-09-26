#!/usr/bin/env node
import chalk from 'chalk'
import clear from 'clear'
import commander from 'commander'
import figlet from 'figlet'
import defaultOps from './fixtures/defaultOps'
import { regenerateDefaultOperations } from './generators'
import { installFixtures, operationsFromChain, saveOpsToChain } from './handlers'

clear()
console.log(chalk.red(figlet.textSync('Sensio CLI', { horizontalLayout: 'full' })))

const program = commander.createCommand()
program.version('0.1.0')

program
  .command('regen-default-ops')
  .description('re-generate operation implementations')
  .action(async () => {
    await regenerateDefaultOperations(defaultOps)
  })

program
  .command('save-ops-to-network')
  .description('Save all ops to the network')
  .action(async () => {
    await saveOpsToChain()
  })

program
  .command('list-all-ops')
  .description('List all operations')
  .action(async () => {
    await operationsFromChain()
  })

program
  .command('init-chain-fixtures')
  .description('Initialize the chain with the fixture')
  .action(async () => {
    await installFixtures()
  })

program.parseAsync().then().catch(console.error)

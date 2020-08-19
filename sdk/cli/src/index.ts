#!/usr/bin/env node
import chalk from 'chalk'
import clear from 'clear'
import commander from 'commander'
import figlet from 'figlet'
import { regenerateDefaultOperations } from './generators'
import defaultOps from './generators/fixtures/defaultOps'
import { operationsFromChain, saveOpsToChain } from './handlers'

clear()
console.log(
  chalk.red(figlet.textSync('Sensio CLI', { horizontalLayout: 'full' }))
)

const program = commander.createCommand()
program.version('0.1.0')

program
  .command('regen-default-ops')
  .description(
    'Connects to the chain and retrieves the operations without NODEJS implementation'
  )
  .action(async () => {
    await regenerateDefaultOperations(defaultOps)
  })
program
  .command('save-ops-to-network')
  .description(
    'Connects to the chain and retrieves the operations without NODEJS implementation'
  )
  .action(async () => {
    await saveOpsToChain()
  })
program
  .command('list-all-ops')
  .description(
    'Connects to the chain and retrieves the operations without NODEJS implementation'
  )
  .action(async () => {
    await operationsFromChain()
  })

program
  .parseAsync()
  .then()
  .catch(console.error)

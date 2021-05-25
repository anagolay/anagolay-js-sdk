#!/usr/bin/env node
import calculateRecordCid from '@anagolay/api/utils/calculateRecordCid'
import chalk from 'chalk'
import clear from 'clear'
import commander from 'commander'
import figlet from 'figlet'
import { buildPocloRule } from './buildPocloRule'
// import packageJson from '../package.json'
import defaultOps from './fixtures/defaultOps'
import { regenerateDefaultOperations } from './generators/operation'
import {
  installFixtures,
  operationsFromChain,
  proofsFromChain,
  revokeAllStatements,
  rulesFromChain,
  saveOpsToChain,
  statementsFromChain,
} from './handlers'

clear()
console.log(chalk.red(figlet.textSync('Anagolay CLI', { horizontalLayout: 'full' })))

const program = commander.createCommand()

// program.version(packageJson.version)

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
  .command('list-all-poe')
  .description('List all poe')
  .action(async () => {
    await proofsFromChain()
  })

program
  .command('list-all-rules')
  .description('List all rules')
  .action(async () => {
    await rulesFromChain()
  })

program
  .command('list-all-statements')
  .description('List all statements')
  .action(async () => {
    await statementsFromChain()
  })

program
  .command('revoke-all-statements')
  .description('Revoke all statements')
  .action(async () => {
    await revokeAllStatements()
  })

program
  .command('init-chain')
  .description('Initialize the chain with the fixture')
  .action(async () => {
    await installFixtures()
  })

program
  .command('build-poclo-rule')
  .description('Build the predefined PoCLO rule')
  .action(async (): Promise<void> => {
    const r = await buildPocloRule()

    console.log(
      JSON.stringify({
        id: await calculateRecordCid(r),
        data: r,
      }),
    )
  })

program.parseAsync().then().catch(console.error)

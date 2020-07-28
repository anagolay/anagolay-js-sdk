#!/usr/bin/env node
import chalk from 'chalk'
import clear from 'clear'
import commander from 'commander'
import figlet from 'figlet'
import defaultOps from './defaultOps'
import { regenerateOperations } from './generators'

clear()
console.log(
  chalk.red(figlet.textSync('Sensio CLI', { horizontalLayout: 'full' }))
)

const program = commander.createCommand()
program.version('0.1.0')

program
  .command('scaffold-operations')
  .description(
    'Connects to the chain and retrieves the operations without NODEJS implementation'
  )
  .action(async () => {
    await regenerateOperations(defaultOps)
  })

program.parseAsync().then().catch(console.error)

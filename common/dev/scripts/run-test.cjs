#!/usr/bin/env node

process.env.NODE_OPTIONS = `--experimental-vm-modules --trace-warnings${
  process.env.NODE_OPTIONS ? ` ${process.env.NODE_OPTIONS}` : ''
}`

console.log('$ run-test', process.env.NODE_OPTIONS, process.argv.slice(2).join(' '))

// eslint-disable-next-line
require('jest-cli/bin/jest')

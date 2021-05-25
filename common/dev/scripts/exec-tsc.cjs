#!/usr/bin/env node
console.log('$ tsc', process.argv.slice(2).join(' '))

require('typescript/lib/tsc')

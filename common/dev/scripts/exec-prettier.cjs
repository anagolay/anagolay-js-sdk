#!/usr/bin/env node

console.log('$ prettier', process.argv.slice(2).join(' '))

require('prettier/bin-prettier')

#!/usr/bin/env node

console.log('$ eslint', process.argv.slice(2).join(' '))

require('eslint/bin/eslint')

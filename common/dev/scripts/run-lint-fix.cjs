#!/usr/bin/env node

const execSync = require('./execSync.cjs')
const argv = require('yargs')
  .options({
    'skip-eslint': {
      description: 'Skips running eslint',
      type: 'boolean',
    },
    'skip-tsc': {
      description: 'Skips running tsc',
      type: 'boolean',
    },
  })
  .strict().argv

console.log('$ run-lint', process.argv.slice(2).join(' '))

if (!argv['skip-eslint']) {
  // We don't want to run with fix on CI
  // const extra = process.env.GITHUB_REPOSITORY ? '' : '--fix'
  const extra = ''

  execSync(
    `pnpx exec-prettier ${extra} --resolve-plugins-relative-to ${__dirname} --ext .js,.cjs,.mjs,.ts,.tsx ${process.cwd()}`,
  )
}

if (!argv['skip-tsc']) {
  execSync('pnpx exec-tsc --noEmit --pretty')
}

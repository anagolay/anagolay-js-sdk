const config = require('@polkadot/dev/config/jest.cjs')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...config,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  // modulePathIgnorePatterns: [],
  transformIgnorePatterns: ['/node_modules/(?!@polkadot|@babel/runtime/helpers/esm/)'],
}

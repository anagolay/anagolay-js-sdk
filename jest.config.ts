/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'

export default async (): Promise<Config.InitialOptions> => {
  return {
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
    modulePathIgnorePatterns: ['lib'],
    testEnvironment: 'node',
    preset: 'ts-jest/presets/default-esm', // or other ESM presets
    // preset: 'ts-jest', // or other ESM presets
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // resetModules: true,
    // automock: false, // default dtue
    // timers: 'fake',
    globals: {
      'ts-jest': {
        useESM: true,
        isolatedModules: true,
      },
    },
    verbose: true,
  }
}

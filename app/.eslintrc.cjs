require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier', '@rushstack/eslint-config/profile/node'],
  plugins: ['svelte3', 'unused-imports', 'simple-import-sort'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],

  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
  },
  settings: {
    'svelte3/typescript': function () {
      return require('typescript');
    }
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
    es6: true
  }
};

require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    // 'plugin:prettier/recommended',
    'prettier', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      },
    },
  ],
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    extraFileExtensions: ['.cjs', '.mjs'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    '@typescript-eslint',
    // 'header',
    'import',
    'react-hooks',
    'simple-import-sort',
    'sort-destructure-keys',
    'no-loops',
    'jest',
    'prettier',
  ],
  rules: {
    'no-multiple-empty-lines': 'error',
    // required as 'off' since typescript-eslint has own versions
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'no-use-before-define': 'off',
    semi: [2, 'never'],
    // 'no-extra-semi': 2,
    // specific overrides
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    'arrow-parens': ['error', 'always'],
    'default-param-last': [0], // conflicts with TS version (this one doesn't allow TS ?)
    // 'header/header': [
    //   2,
    //   'line',
    //   [
    //     { pattern: ' Copyright \\d{4} @anagolay/', template: ' Copyright 2021 @anagolay/' },
    //     ' SPDX-License-Identifier: Apache-2.0'
    //   ],
    //   2
    // ],
    '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
    'jsx-quotes': ['error', 'prefer-single'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'import' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
        when: 'always',
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': [
      2,
      {
        caseSensitive: true,
      },
    ],
    // 'simple-import-sort/imports': [
    //   2,
    //   {
    //     groups: [
    //       ['^\u0000'], // all side-effects (0 at start)
    //       ['\u0000$', '^@anagolay.*\u0000$', '^\\..*\u0000$'], // types (0 at end)
    //       ['^[^/\\.]'], // non-anagolay
    //       ['^@anagolay'], // anagolay
    //       ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // local (. last)
    //     ],
    //   },
    // ],
    'prettier/prettier': 'error',
    // 'sort-keys': 'error', // // this cannot be fixed automatically
    /**
     * CUSTOM BECAUSE THERE ARE LOT OF LINT ERRORS
     * ENABLE THEM WHEN DEVELOPING SO WE CAN FIX THEM
     */
    // Operations must always return the Promise but not always have the await in the body, figure this out if you see that there is an error
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off', // this fails a lot when there is an error.message
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': require.resolve('eslint-import-resolver-node'),
    react: {
      version: 'detect',
    },
  },
}

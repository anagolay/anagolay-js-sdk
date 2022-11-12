// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: [
    '@rushstack/eslint-config/profile/node',
    // '@rushstack/eslint-config/mixins/friendly-locals',
    '@rushstack/eslint-config/mixins/tsdoc'
  ],
  parserOptions: { tsconfigRootDir: __dirname, ecmaVersion: 'latest' },
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    '@typescript-eslint/no-floating-promises': 0,
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
  }
};

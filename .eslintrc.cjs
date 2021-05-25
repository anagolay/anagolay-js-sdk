const base = require('./common/dev/config/eslint.cjs')

module.exports = {
  ...base,
  ignorePatterns: [
    '.eslintrc.js',
    '.vscode/**',
    '**/build/*',
    '**/coverage/*',
    '**/node_modules/*',
  ],
  parserOptions: {
    ...base.parserOptions,
    createDefaultProgram: true,
    project: [
      './tsconfig.eslint.json',
      // "./sdk/**/tsconfig.json",
      // "./operations/**/tsconfig.json",
      // "./rules/**/tsconfig.json",
      // "./common/**/tsconfig.json"
    ],
  },
  rules: {
    ...base.rules,
    // add override for any (a metric ton of them, initial conversion)
    '@typescript-eslint/no-explicit-any': 'off',
    // this seems very broken atm, false positives
    '@typescript-eslint/unbound-method': 'off',
  },
}

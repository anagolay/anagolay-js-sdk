// Documentation for this file: https://prettier.io/docs/en/configuration.html
module.exports = {
  // We use a larger print width because Prettier's word-wrapping seems to be tuned
  // for plain JavaScript without type annotations
  printWidth: 110,

  // Use .gitattributes to manage newlines
  endOfLine: 'auto',

  // Use single quotes instead of double quotes
  singleQuote: true,

  // For ES5, trailing commas cannot be used in function parameters; it is counterintuitive
  // to use them for arrays only
  trailingComma: 'none',
  semi: true,
  bracketSpacing: true,
  bracketLint: false,
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  plugins: [
    './common/autoinstallers/rush-prettier/node_modules/prettier-plugin-svelte',
    './common/autoinstallers/rush-prettier/node_modules/prettier-plugin-packagejson'
    // // MUST come last, also this doesn't work yet
    // './common/autoinstallers/rush-prettier/node_modules/prettier-plugin-tailwindcss'
  ],
  pluginSearchDirs: false,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: true,
  svelteAllowShorthand: false,
  svelteIndentScriptAndStyle: false
};

# heft-esm-transform-plugin

1. This rush plugin will modify your esm build directory ( default `lib` ) by adding the `.js` files for local imports and exports.
2. it will add the simple and appropriate package.json file to output directories so you can include them and call scripts

Nowadays is normal to ship a single library with both ESM and CJS outputs. One way or another your root package.json will be either `module` or `commonjs` and if another library requests ESM it will fail if there is no `type:module` in the nearest package.json, opposite for the CJS.

## Options

- `addPackageJsonFiles`: add the correct package.json to the output folder. default `true`
- `esmDirectory`: ESM output folder. default `lib`
- `commonJsDirectory`: CommonJs output folder. default `lib-commonjs`

# How to add

in your package `rush add --dev -p @kelp_digital/heft-esm-transform-plugin`

update `heft.json` plugins section

```jsonc
{
  // ... your other stuff
  "heftPlugins": [
    // ... your other plugins
    {
      "plugin": "@kelp_digital/heft-esm-transform-plugin",
      "options": {
        "addPackageJsonFiles": true,
        "esmDirectory": "lib",
        "commonJsDirectory": "lib-commonjs"
      }
    }
  ]
}
```

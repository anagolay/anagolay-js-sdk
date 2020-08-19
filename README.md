[![pipeline status](https://gitlab.com/sensio_group/network-js/badges/master/pipeline.svg)](https://gitlab.com/sensio_group/network-js/-/commits/master) [![coverage report](https://gitlab.com/sensio_group/network-js/badges/master/coverage.svg)](https://gitlab.com/sensio_group/network-js/-/commits/master) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Dev friendly blockchain SDK for Sensio Network. 👩‍💻🚀👨‍💻

This is the monorepo for ALL Sensio packages. This includes following list:

1. Definitions of operations located under `<root>/operations`
2. Sensio Network API located under `<root>/sdk/api`
3. Sensio Network CLI located under `<root>/sdk/cli`
4. Sensio Network Types located under `<root>/sdk/types`
5. Sensio React hooks and components located under `<root>/react`

## Development

We are using VSCod as our main IDE and for that reason we are including the recommended extensions and settings that will help you get started. Feel free to change the theme (We all love the Noctis Minimus 😍 and we really hope you will too)

The structure is following:

```sh
❯ tree -I '.vscode|.git|node_modules|coverage' -d -L 2 .
.
├── examples
│   ├── demo
│   └── woss
├── misc
│   └── benchmark
├── operations
│   ├── snCid
│   ├── snFile
│   ├── snIdentity
│   ├── snJsonDec
│   ├── snJsonEnc
│   ├── snMatchAll
│   ├── snMatchNone
│   ├── snMultihash
│   └── snSplit
├── react
└── sdk
    ├── api
    ├── cli
    └── types

```

**examples**

The place where WIP, PoC and some examples are located. Good place to see very unstable code and maybe future implementations.

**misc**

Pretty much everything that has no special place, like benchmarking.

**operations**

HEre you can find Javascript implementation of Sensio Operation. To find out more about Sensio Operation please visit the [Operation wiki page](https://wiki.sensio.dev)

**rect**

React specific hooks and components.

**sdk/api**

Main entry point for communicating with Sensio Network. For more info please read the [API README.md](./sdk/api/README.md)

**sdk/cli**

Generic CLI for Sensio Network. Current use is limited only to creation default operations.

**sdk/types**

Sensio Network has decent amount of custom types, both on the chain and mapped types for Typescript. All these types, interfaces and api augmentations can be found here. This is the repo which should be the first to install when making new implementation of the operation.

### Linting

We are using standard JS for formatting and each package contains it and it is in charge of formatting its own code. We are using Husky to make sure that code is formatted properly before we commit anything. In real life you don't have to run this command at all, but it's good to know that it exists.

```sh
# this will fix the sdk and operations source files
yarn std
```

### Building && Publishing

This repo is a monorepo for all our packages that are related to the Sensio Network SDK. Each package is in charge of its own build process, which we are tying to standardize.

Sometimes is good to see will the packages build BEFORE the publishing, to do so, run the command below and if it passes then all builds are successful and you should be ready for publishing.

This will build ALL the packages, operations and sdk.
Under the hood lerna will run the `build` task in every possible package in this repo.

```sh
# this will fix the sdk and operations source files
yarn build
```

Lerna is awesome when it comes to the publishing BUT it really doesn't like the fact that you are not logged in to the npm. Follow these steps to publish the package:

1. run `yarn build` to build ALL packages, even if they are not changed
2. log in to npm using `npm login`
3. check that you are logged in using `npm whoami`. you should see your username if not, repeat step 1
4. run `yarn lerna publish`, this will run the lerna publish which will determine changed packages
5. select the package versions, if it's a small change in the code, use `minor` version, if it is the added functionality use `patch` version
6. repeat 5
7. publish

## Creating the operation

At the moment we are using the CLI to generate scaffold operation folder under `operations/` with decent defaults. One thing that needs manual input is making sure that `operations/tsconfig.json` and `./tsconfig.json` are correctly set up.

```
#Delete local tags.
git tag -l | xargs git tag -d
#Fetch remote tags.
git fetch
#Delete remote tags.
git tag -l | xargs -n 1 git push --delete origin
#Delete local tasg.
git tag -l | xargs git tag -d
```

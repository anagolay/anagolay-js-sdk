[![pipeline status](https://gitlab.com/anagolay/network-js-sdk/badges/master/pipeline.svg)](https://gitlab.com/anagolay/network-js-sdk/-/commits/master) [![coverage report](https://gitlab.com/anagolay/network-js-sdk/badges/master/coverage.svg)](https://gitlab.com/anagolay/network-js-sdk/-/commits/master) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Dev friendly blockchain SDK for Anagolay Network. 👩‍💻🚀👨‍💻

This is the monorepo for ALL Anagolay packages. This includes following list:

1. Definitions of operations located under `<root>/operations`
2. Anagolay Network API located under `<root>/sdk/api`
3. Anagolay Network Core located under `<root>/sdk/core`
4. Anagolay Network CLI located under `<root>/sdk/cli`
5. Anagolay Network Types located under `<root>/sdk/types`

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
│   ├── cid
│   ├── file
│   ├── identity
│   ├── jsonDec
│   ├── jsonEnc
│   ├── matchAll
│   ├── matchNone
│   ├── multihash
│   └── split
└── sdk
    ├── api
    ├── core
    ├── cli
    └── types

```

**examples**

The place where WIP, PoC and some examples are located. Good place to see very unstable code and maybe future implementations.

**misc**

Pretty much everything that has no special place, like benchmarking.

**operations**

HEre you can find Javascript implementation of Anagolay Operation. To find out more about Anagolay Operation please visit the [Operation wiki page](https://anagolay.dev)

**rect**

React specific hooks and components.

**sdk/api**

Main entry point for communicating with Anagolay Network. For more info please read the [API README.md](./sdk/api/README.md)

**sdk/cli**

Generic CLI for Anagolay Network. Current use is limited only to creation default operations.

**sdk/types**

Anagolay Network has decent amount of custom types, both on the chain and mapped types for Typescript. All these types, interfaces and api augmentations can be found here. This is the repo which should be the first to install when making new implementation of the operation.

### Linting

We are using standard JS for formatting and each package contains it and it is in charge of formatting its own code. We are using Husky to make sure that code is formatted properly before we commit anything. In real life you don't have to run this command at all, but it's good to know that it exists.

```sh
# this will fix the sdk and operations source files
yarn std
```

### Building && Publishing

This repo is a monorepo for all our packages that are related to the Anagolay Network SDK. Each package is in charge of its own build process, which we are tying to standardize.

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

```sh
#Delete local tags.
git tag -l | xargs git tag -d
#Fetch remote tags.
git fetch
#Delete remote tags.
git tag -l | xargs -n 1 git push --no-verify --delete origin
#Delete local tags.
git tag -l | xargs git tag -d
```

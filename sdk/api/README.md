# @sensio/api

## Type generation and augmentation

Please check this post on [Polkadot-js/api documentation](https://polkadot.js.org/api/examples/promise/90_typegen/).

In order to generate the types and augmentations please run `yarn build:types` from root of this package or from the root of this repo.

Maintaining the types is done in the corresponding folder under `interfaces/palletName/definitions.ts`, then it must be imported in the `interfaces/definitions.ts` file. After that run the gen script.

**NOTE** - Chain must be available on the local address, http://localhost:9933

## Introduction

Along with [methods supported by Polkadot](https://polkadot.js.org/api/start/basics.html#metadata) this module internally uses custom pallets in the following format `api.pallets.<pallet_name>` and exposes functions for **creating proofs, rules and operations** . Note that any library specific code will not be included in order to retain the possibility to develop library specific packages eg . `@sensio/react`.

## Usage

Install the module:

`yarn add @sensio/api`

> This module is built using Typescript so there is no need to install additional types. :fire:

```ts
import { api } from '@sensio/api'
;(async () => {
  // Connect to Sensio Network API
  const connection = await api()
})()
```

#### Available pallets:

- `api.pallets.operations`
- `api.pallets.rules`
- `api.pallets.poe`

#### Adding child operations :warning:

Current api design challenge that we are facing is **adding child operations**. Suppose you created a _rule_ and you added two operations as direct children:

```
Rule ->
    Operation 1
    Operation 2
```

How would API need to be designed in order to allow adding child operation to the `Operation 1` to achieve this structure:

```
Rule ->
    Operation 1 ->
        Operation 1a
    Operation 2
```

**Proposal #1: Chainig**

```ts
api.pallets.rules
  .create()
  .addOperation({ ...operation })
  .addChildOperation({ ...operation })
```

**Proposal #2: Functional**

```ts
const { create, addOperation, addChildOperation } = api.pallets.rule
const rule = {} // actuall rule object
addOperation(rule, op)
```

## Roadmap :pushpin:

### Rules

- [ ] create rule
- [ ] add operation
- [ ] add child operation
- [ ] save rule to the network

### Operations

- [ ] create operation

### Proofs

- [ ] create proof

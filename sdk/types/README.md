# All Sensio Network custom types and interfaces

This module cantinas ALL custom types for interaction with the Sensio Network and the Sensio Network API.

## Generation

This module is built on excellent `polkadot-types-from-defs` and `polkadot-types-from-chain` plus some of our magic for mapping the Generic Types into the Javascript friendly interfaces.

Full list of `Sensio*` Generic Types to -> Javascript native types can be found in `sensio-type-mappings.ts` file.

To generate new types and api augmentations you must have Sensio Network chain running. Check how to do that HERE.

```sh
yarn gen:types
```

This will connect to the chain and generate:

- create interfaces and augmentations for the standard substrate chain
- create constants, types and augmentations for the Sensio [Pallets](https://gitlab.com/sensio_group/network-js/-/tree/6-create-operations-package-and-move-existing-ops-from-the-explorer/sdk/api/src/pallets)
- create `NetworkCustomTypes.json` which can be pasted into the PolkadotJs app
- save the chain metadata in the `sensio-network.json` file

**At the moment you have to go to all pallets `types.ts` file and change the `./` into `../`. There is a unresolved issue with the path. **

## Structure

All pallet definitions are located in the `interfaces/PALLET_NAME/` directory.

The interface structure looks like this:

```sh
#./src/interfaces

├── 123-pallet
│   ├── definitions.ts
│   └── interfaces.ts
├── augment-api-consts.ts
├── augment-api-query.ts
├── augment-api.ts
├── augment-api-tx.ts
├── augment-types.ts
├── definitions.ts
├── index.ts
├── operations
│   ├── definitions.ts
│   ├── index.ts
│   ├── interfaces.ts
│   └── types.ts
├── poe
│   ├── definitions.ts
│   ├── index.ts
│   ├── interfaces.ts
│   └── types.ts
├── rules
│   ├── definitions.ts
│   ├── index.ts
│   ├── interfaces.ts
│   └── types.ts
├── sensio
│   ├── definitions.ts
│   ├── index.ts
│   ├── interfaces.ts
│   └── types.ts
├── sensio-type-mappings.ts
├── statements
│   ├── definitions.ts
│   ├── index.ts
│   ├── interfaces.ts
│   └── types.ts
├── types.ts
└── utils
    ├── buffersEqual.ts
    └── slug.ts

```

We need to maintain 2 files for each pallet, `definitions.ts` and `interfaces.ts`, both of which are in the pallets directory. `definitions.ts` are the custom types that are used for communication with the chain and the `interfaces.ts` for building and creating instances of objects and processing.

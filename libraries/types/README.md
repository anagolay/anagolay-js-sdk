
# Anagolay Network custom types and interfaces

![Anagolay SDK banner](https://macula.kelp.digital/ipfs/bafybeih6hpvgetxd5uer6jv3ys3xtoyfrlk2x7okqmm6d4ci7dthigyvzm)

This module cantinas ALL custom types for interaction with the Anagolay Network and the Anagolay Network API.

## Generation

This module is built on excellent `polkadot-types-from-defs` and `polkadot-types-from-chain` plus some of our magic for mapping the Generic Types into Typescript-friendly interfaces.
A full list of `Anagolay*` Generic Types to -> Javascript native types can be found in `anagolay-type-mappings.ts` file.

To generate new types and API augmentations you must have the Anagolay Network chain running. Check how to do that HERE.

```sh
pnpm generate
```

This will connect to the chain and generate:

- create interfaces and augmentations for the standard substrate chain
- create constants, types and augmentations for the Anagolay [Pallets](https://gitlab.com/anagolay/network-js/-/tree/6-create-operations-package-and-move-existing-ops-from-the-explorer/sdk/api/src/pallets)
- create `NetworkCustomTypes.json` which can be pasted into the PolkadotJs app
- save the chain metadata in the `anagolay-network.json` file

**At the moment you have to go to all pallets `types.ts` file and change the `./` into `../`. There is an unresolved issue with the path.**

## Structure

All pallet definitions are located in the `interfaces/PALLET_NAME/` directory.


We need to maintain 2 files for each pallet, `definitions.ts` and `interfaces.ts`, both of which are in the pallets directory. `definitions.ts` are the custom types that are used for communication with the chain and the `interfaces.ts` for building and creating instances of objects and processing.

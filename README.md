[![pipeline status](https://gitlab.com/anagolay/anagolay-js/badges/main/pipeline.svg)](https://gitlab.com/anagolay/anagolay-js/-/commits/main)
[![coverage report](https://gitlab.com/anagolay/anagolay-js/badges/main/coverage.svg?job=test-and-build)](https://gitlab.com/anagolay/anagolay-js/-/commits/main)

![Anagolay SDK banner](https://macula.kelp.digital/ipfs/bafybeih6hpvgetxd5uer6jv3ys3xtoyfrlk2x7okqmm6d4ci7dthigyvzm)

## Anagolay Network JS/TS SDK for lazy devs 👩‍💻🚀👨‍💻

This is the monorepo for ALL Anagolay packages. This includes following list:

1. Anagolay Network CLI located under `<root>/sdk/cli`
2. Anagolay Network Types located under `<root>/sdk/types`
3. All utils are located under `<root>/sdk/utils`
4. Anagolay Application is located in `<root>/apps/app`

## Development

We are using VSCode as our main IDE and for that reason we are including the recommended extensions and settings that will help you get started. 

The structure is following:

**sdk/cli**

Generic CLI for Anagolay Network. Current use is limited only to creation default operations.

**sdk/types**

### Building 

```sh
# first you want to install all the deps
rush update
# this will fix the sdk and operations source files
rush build
```

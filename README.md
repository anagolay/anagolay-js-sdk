[![pipeline status](https://gitlab.com/anagolay/network-js-sdk/badges/main/pipeline.svg)](https://gitlab.com/anagolay/network-js-sdk/-/commits/main) [![coverage report](https://gitlab.com/anagolay/network-js-sdk/badges/main/coverage.svg)](https://gitlab.com/anagolay/network-js-sdk/-/commits/main)

## Dev friendly blockchain SDK for Anagolay Network. 👩‍💻🚀👨‍💻

This is the monorepo for ALL Anagolay packages. This includes following list:

1. Anagolay Network CLI located under `<root>/sdk/cli`
2. Anagolay Network Types located under `<root>/sdk/types`

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

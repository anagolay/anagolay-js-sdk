# @anagolay/op-image-metadata-hash

Blockchain Version **bafy2bzaceczzm4kzeqfqnk4onhpnipiskfqcxtssm7t54dmrzso5un6eaukya**

## Description

Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-image-metadata-hash
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/imageMetadataHash)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-image-metadata-hash

# or specific version
yarn add @anagolay/op-image-metadata-hash@0.1.0
```

## Usage

```ts
import imageMetadataHash from '@anagolay/op-image-metadata-hash'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await imageMetadataHash([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

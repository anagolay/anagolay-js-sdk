# @sensio/op-sn-image-metadata-hash

Blockchain Version **bafy2bzaceczzm4kzeqfqnk4onhpnipiskfqcxtssm7t54dmrzso5un6eaukya**

## Description

Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-image-metadata-hash
- repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snImageMetadataHash)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-image-metadata-hash

# or specific version
yarn add @sensio/op-sn-image-metadata-hash@0.1.0
```

## Usage

```ts
import snImageMetadataHash from '@sensio/op-sn-image-metadata-hash'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await snImageMetadataHash([
  { data: dataAsUintArray, decode: () => dataAsBuffer }
])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

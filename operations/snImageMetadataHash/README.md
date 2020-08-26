# @sensio/op-sn-image-metadata-hash

Blockchain Version **bafy2bzaceaglcxavkrh4ucymmbpaaex7l6zxp5renumgxo4obw2pqbgdbekhe**

## Description

Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-image-metadata-hash
- repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snImageMetadataHash)
- support: [Discord server #dev channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-image-metadata-hash

# or specific version
yarn add @sensio/op-sn-image-metadata-hash@0.3.1
```

## Usage

```ts
import snImageMetadataHash from '@sensio/op-sn-image-metadata-hash'

const data = new U8intArray(7)
await snImageMetadataHash(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

# @sensio/op-sn-image-raw-pixels-hash

Blockchain Version **bafy2bzacecgmp4enyoywse6enuoqgfpffojhrn7kovryv775xa7mhv6f34qju**

## Description

Calculate content id of the raw pixels

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-image-raw-pixels-hash
- repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snImageRawPixelsHash)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-image-raw-pixels-hash

# or specific version
yarn add @sensio/op-sn-image-raw-pixels-hash@0.1.0
```

## Usage

```ts
import snImageRawPixelsHash from '@sensio/op-sn-image-raw-pixels-hash'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await snImageRawPixelsHash([
  { data: dataAsUintArray, decode: () => dataAsBuffer }
])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

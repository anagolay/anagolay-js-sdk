# @anagolay/op-image-raw-pixels

Blockchain Version **bafy2bzacecjrerw6cnuyj3ta7ntsvleq43vxgt4otgdvf2wjjpdg5almrzd4y**

## Description

Extract Only Raw pixels from the image

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-image-raw-pixels
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/imageRawPixels)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-image-raw-pixels

# or specific version
yarn add @anagolay/op-image-raw-pixels@0.1.0
```

## Usage

```ts
import imageRawPixels from '@anagolay/op-image-raw-pixels'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await imageRawPixels([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

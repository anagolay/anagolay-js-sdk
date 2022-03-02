# @anagolay/op-image-metadata

Blockchain Version **bafy2bzacedk46pihe5gr44l6liofvga6umxyhy27hwp4treiq32y6cdywsxzm**

## Description

Extract All Image Metadata

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-image-metadata
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/imageMetadata)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-image-metadata

# or specific version
yarn add @anagolay/op-image-metadata@0.1.0
```

## Usage

```ts
import imageMetadata from '@anagolay/op-image-metadata'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await imageMetadata([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

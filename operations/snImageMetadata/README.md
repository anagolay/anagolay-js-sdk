# @sensio/op-sn-image-metadata

Blockchain Version **bafy2bzacedk46pihe5gr44l6liofvga6umxyhy27hwp4treiq32y6cdywsxzm**

## Description

Extract All Image Metadata

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-image-metadata
- repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snImageMetadata)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-image-metadata

# or specific version
yarn add @sensio/op-sn-image-metadata@0.1.0
```

## Usage

```ts
import snImageMetadata from '@sensio/op-sn-image-metadata'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await snImageMetadata([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

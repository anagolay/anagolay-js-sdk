# @sensio/op-sn-image-phash

Blockchain Version **bafy2bzaceafhfdbh4r6fmmnudwqehqedhf632dbafl7fnmbkbpjnv2miacdza**

## Description

Perceptual hash calculation, currently implementing http://blockhash.io/

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-image-phash
- repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snImagePhash)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-image-phash

# or specific version
yarn add @sensio/op-sn-image-phash@0.1.0
```

## Usage

```ts
import snImagePhash from '@sensio/op-sn-image-phash'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await snImagePhash([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

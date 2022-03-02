# @anagolay/op-image-phash

Blockchain Version **bafy2bzaceafhfdbh4r6fmmnudwqehqedhf632dbafl7fnmbkbpjnv2miacdza**

## Description

Perceptual hash calculation, currently implementing http://blockhash.io/

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-image-phash
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/imagePhash)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-image-phash

# or specific version
yarn add @anagolay/op-image-phash@0.1.0
```

## Usage

```ts
import imagePhash from '@anagolay/op-image-phash'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await imagePhash([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

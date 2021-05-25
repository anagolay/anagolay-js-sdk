# @anagolay/op-split

Blockchain Version **bafy2bzacealjmcwnfurdmn2tndsv35d5cdbaempopwdq5pr5zr56yrfhuc2zk**

## Description

Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-split
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/split)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-split

# or specific version
yarn add @anagolay/op-split@0.3.1
```

## Usage

```ts
import split from '@anagolay/op-split'

const data = new U8intArray(7)
await split(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

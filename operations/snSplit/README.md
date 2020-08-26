# @sensio/op-sn-split

Blockchain Version **bafy2bzacealjmcwnfurdmn2tndsv35d5cdbaempopwdq5pr5zr56yrfhuc2zk**

## Description

Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-split
- repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snSplit)
- support: [Discord server #dev channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-split

# or specific version
yarn add @sensio/op-sn-split@0.3.1
```

## Usage

```ts
import snSplit from '@sensio/op-sn-split'

const data = new U8intArray(7)
await snSplit(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

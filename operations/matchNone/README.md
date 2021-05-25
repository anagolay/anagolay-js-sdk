# @anagolay/op-match-none

Blockchain Version **bafy2bzaceav6aryxb4qisakn64r4irptupvljhiv5l3xxiamlxiglrh2wyq2e**

## Description

This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-match-none
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/matchNone)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-match-none

# or specific version
yarn add @anagolay/op-match-none@0.3.1
```

## Usage

```ts
import matchNone from '@anagolay/op-match-none'

const data = new U8intArray(7)
await matchNone(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

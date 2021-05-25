# @anagolay/op-match-all

Blockchain Version **bafy2bzacecxvve6bdbjvokspk2ocvk6m2yvrykcguzluf6q2criwnwzz4hnnw**

## Description

This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-match-all
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/matchAll)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-match-all

# or specific version
yarn add @anagolay/op-match-all@0.3.1
```

## Usage

```ts
import matchAll from '@anagolay/op-match-all'

const data = new U8intArray(7)
await matchAll(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

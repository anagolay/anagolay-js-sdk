# @anagolay/op-multihash

Blockchain Version **bafy2bzacea24txwqzwanzte5laqhsy3umk4wq43h3llvlvkebp7gv73kzuzsi**

## Description

Generic blake2b-256 multihash operation.

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-multihash
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/multihash)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-multihash

# or specific version
yarn add @anagolay/op-multihash@0.3.1
```

## Usage

```ts
import multihash from '@anagolay/op-multihash'

const data = new U8intArray(7)
await multihash(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

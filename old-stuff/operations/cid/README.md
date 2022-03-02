# @anagolay/op-cid

Blockchain Version **bafy2bzacebvd3b7upai2av3w33dwrwqkh7w7qvbon6obi6q4evw6pqe744npu**

## Description

Generic CID, defaults to base32 and dag-cbor for Any kind of data.

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-cid
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/cid)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-cid

# or specific version
yarn add @anagolay/op-cid@0.3.1
```

## Usage

```ts
import { stringToU8a } from '@anagolay/util'
import cid from '@anagolay/op-cid'

await cid([
  {
    data: stringToU8a('demo'),
    decode: () => Buffer.from('demo'),
  },
])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

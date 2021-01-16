# @sensio/op-sn-cid

Blockchain Version **bafy2bzacebvd3b7upai2av3w33dwrwqkh7w7qvbon6obi6q4evw6pqe744npu**

## Description

Generic CID, defaults to base32 and dag-cbor for Any kind of data.

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-cid
- repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snCid)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-cid

# or specific version
yarn add @sensio/op-sn-cid@0.3.1
```

## Usage

```ts
import { stringToU8a } from '@polkadot/util'
import snCid from '@sensio/op-sn-cid'

await snCid([
  {
    data: stringToU8a('demo'),
    decode: () => Buffer.from('demo')
  }
])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

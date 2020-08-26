# @sensio/op-sn-enc-hex

Blockchain Version **bafy2bzaceanqw2xwjawh4zdrn6lct7pi63fndib5jhcx7hfe5y7g6iwwrwqka**

## Description

Encode arbitrary data to HEX with 0x prefix

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-enc-hex
- repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snEncHex)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-enc-hex

# or specific version
yarn add @sensio/op-sn-enc-hex@0.3.1
```

## Usage

```ts
import snEncHex from '@sensio/op-sn-enc-hex'

const data = new U8intArray(7)
await snEncHex(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

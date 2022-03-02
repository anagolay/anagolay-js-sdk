# @anagolay/op-enc-hex

Blockchain Version **bafy2bzaceanqw2xwjawh4zdrn6lct7pi63fndib5jhcx7hfe5y7g6iwwrwqka**

## Description

Encode arbitrary data to HEX with 0x prefix

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-enc-hex
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/encHex)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-enc-hex

# or specific version
yarn add @anagolay/op-enc-hex@0.3.1
```

## Usage

```ts
import encHex from '@anagolay/op-enc-hex'

const data = new U8intArray(7)
await encHex(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

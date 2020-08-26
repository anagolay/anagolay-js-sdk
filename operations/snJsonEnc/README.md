# @sensio/op-sn-json-enc

Blockchain Version **bafy2bzacebc64bhgsj24ad53pkgxb7xi3zdedshiozl33nqplv7t5y27tii2u**

## Description

Wrapper of JSON.stringify().

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-json-enc
- repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snJsonEnc)
- support: [Discord server #dev channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-json-enc

# or specific version
yarn add @sensio/op-sn-json-enc@0.3.1
```

## Usage

```ts
import snJsonEnc from '@sensio/op-sn-json-enc'

const data = new U8intArray(7)
await snJsonEnc(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

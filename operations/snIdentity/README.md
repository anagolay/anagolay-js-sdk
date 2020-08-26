# @sensio/op-sn-identity

Blockchain Version **bafy2bzacecc2mmjx3nltb7pkdbtvjf64pjoswimxrcowguwi5jxn34blzb44s**

## Description

What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-identity
- repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snIdentity)
- support: [Discord server #dev channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-identity

# or specific version
yarn add @sensio/op-sn-identity@0.3.1
```

## Usage

```ts
import snIdentity from '@sensio/op-sn-identity'

const data = new U8intArray(7)
await snIdentity(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

# @anagolay/op-identity

Blockchain Version **bafy2bzacecc2mmjx3nltb7pkdbtvjf64pjoswimxrcowguwi5jxn34blzb44s**

## Description

What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-identity
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/identity)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-identity

# or specific version
yarn add @anagolay/op-identity@0.3.1
```

## Usage

```ts
import identity from '@anagolay/op-identity'

const data = new U8intArray(7)
await identity(data)
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

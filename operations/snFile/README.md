# @sensio/op-sn-file

Blockchain Version **bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m**

## Description

Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-file
- repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snFile)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-file

# or specific version
yarn add @sensio/op-sn-file@0.1.0
```

## Usage

```ts
import snFile from '@sensio/op-sn-file'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await snFile([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

# @anagolay/op-file

Blockchain Version **bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m**

## Description

Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.

## Links and Repo

- npm: https://www.npmjs.com/package/@anagolay/op-file
- repo: [repo folder](https://gitlab.com/anagolay/network-js-sdk/-/tree/master/operations/file)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @anagolay/op-file

# or specific version
yarn add @anagolay/op-file@0.1.0
```

## Usage

```ts
import file from '@anagolay/op-file'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = Buffer.from(7)
await file([{ data: dataAsUintArray, decode: () => dataAsBuffer }])
```

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

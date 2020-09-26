# @sensio/op-sn-create-qrcode

Blockchain Version **bafy2bzacecnosczzvuuibkajhvporgd4e5rrye4wcorvm7zmloinm6ofngdeq**

## Description

Create QR Code

For more info on the QrCodes check the [QrCode npm package](https://www.npmjs.com/package/qrcode)

## Links and Repo

- npm: https://www.npmjs.com/package/@sensio/op-sn-create-qrcode
- repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snCreateQrcode)
- support: [Discord server #public-support channel](https://discord.gg/RQ9g29y)

## Install

```sh
# install latest version
yarn add @sensio/op-sn-create-qrcode

# or specific version
yarn add @sensio/op-sn-create-qrcode@0.1.0
```

## Usage

```ts
import snCreateQrcode from '@sensio/op-sn-create-qrcode'

const dataAsUintArray = new U8intArray(7)
const dataAsBuffer = '7'
const myQrCode = await snCreateQrcode([
  { data: dataAsUintArray, decode: () => dataAsBuffer }
])
```

This above will create following QRCode

![7 as QRCode](./7-as-qrcode.png)

## Contributing

PRs accepted.

## License

Longer version is in LICENSE file

Apache-2.0 © [Sensio Group](https://sensio.group)

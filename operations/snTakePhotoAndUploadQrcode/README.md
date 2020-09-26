
  # @sensio/op-sn-take-photo-and-upload-qrcode

  Blockchain Version **bafy2bzacedtcdvuykc4jencdnm5zymadzutm7yzvpughbgjotxmgpyglzhqpc**
  

  ## Description 
  
  Take the photo of the QRCode and do the verification of equality. If the verification is a successes the coperation will continue, if not user will be asked to resubmit the image. The photo taken MUST NOT BE MODIFIED, RESIZED AND MUST BE IN JPG OR JPEG. Medium or low size is better than large 10MB files. You can choose that in the camera settings
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/@sensio/op-sn-take-photo-and-upload-qrcode
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snTakePhotoAndUploadQrcode)
  * support: [Discord server #public-support channel](https://discord.gg/RQ9g29y) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-take-photo-and-upload-qrcode

  # or specific version
  yarn add @sensio/op-sn-take-photo-and-upload-qrcode@0.1.0
  ```
  
  ## Usage
  
  ```ts
  import snTakePhotoAndUploadQrcode from '@sensio/op-sn-take-photo-and-upload-qrcode'

  const dataAsUintArray = new U8intArray(7)
  const dataAsBuffer = Buffer.from(7)
  await snTakePhotoAndUploadQrcode([{data: dataAsUintArray, decode: ()=> dataAsBuffer}])
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  
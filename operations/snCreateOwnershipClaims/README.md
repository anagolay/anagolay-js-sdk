
  # @sensio/op-sn-create-ownership-claims

  Blockchain Version **bafy2bzacebr4fj6rnexne25v6zcuomsfnbfxrv22cwzrrqexeo3ggotd3u3zu**
  

  ## Description 
  
  Create the Ownership Claims from the existing PoE from the Sensio Network.
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/@sensio/op-sn-create-ownership-claims
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snCreateOwnershipClaims)
  * support: [Discord server #public-support channel](https://discord.gg/RQ9g29y) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-create-ownership-claims

  # or specific version
  yarn add @sensio/op-sn-create-ownership-claims@0.1.0
  ```
  
  ## Usage
  
  ```ts
  import snCreateOwnershipClaims from '@sensio/op-sn-create-ownership-claims'

  const dataAsUintArray = new U8intArray(7)
  const dataAsBuffer = Buffer.from(7)
  await snCreateOwnershipClaims([{data: dataAsUintArray, decode: ()=> dataAsBuffer}])
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  
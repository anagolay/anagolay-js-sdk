
  # @sensio/op-sn-enc-hex

  Blockchain Version **bafy2bzacec257yn2vfyex55dyw646bka2hfimf7owipofd74237dpicebcxfi**
  

  ## Description 
  
  Encode arbitrary data to HEX with 0x prefix 
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/@sensio/op-sn-enc-hex
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snEncHex)
  * support: [Discord server #dev channel](https://discord.gg/JsdKZ5K) 

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
  
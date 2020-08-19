
  # @sensio/op-sn-image-phash

  Blockchain Version **bafy2bzacedkhosdvceus24i27lsec4hdtmkwrjidy4flknb3fstxzun5cdcnk**
  

  ## Description 
  
  Perceptual hash calculation, currently implementing http://blockhash.io/
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/@sensio/op-sn-image-phash
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snImagePhash)
  * support: [Discord server #dev channel](https://discord.gg/JsdKZ5K) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-image-phash

  # or specific version
  yarn add @sensio/op-sn-image-phash@0.3.1
  ```
  
  ## Usage
  
  ```ts
  import snImagePhash from '@sensio/op-sn-image-phash'


  const data = new U8intArray(7)
  await snImagePhash(data)
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  
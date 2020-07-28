
  # @sensio/op-sn-input

  Blockchain Version **bafy2bzacecfub3blh425abcu5xrnkndnywuetrhaogk3ospaxjempsxy5qqty**
  

  ## Description 
  
  What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.
  
  ##  Links and Repo

  npm: https://www.npmjs.com/package/@sensio/op-sn-input
  repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snInput)
  support: [Discord server #dev channel](https://discord.gg/JsdKZ5K) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-input

  # or specific version
  yarn add @sensio/op-sn-input@0.3.0
  ```
  
  ## Usage
  
  ```ts
  import snInput from '@sensio/op-sn-input'


  const data = new U8intArray(7)
  await snInput(data)
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  
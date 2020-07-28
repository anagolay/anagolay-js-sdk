
  # @sensio/op-sn-match-all

  Blockchain Version **bafy2bzaceaywejj6dhdphszfagz33zau5zzhce7uqebixn7ldzjodhcumiqqm**
  

  ## Description 
  
  This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.
  
  ##  Links and Repo

  npm: https://www.npmjs.com/package/@sensio/op-sn-match-all
  repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snMatchAll)
  support: [Discord server #dev channel](https://discord.gg/JsdKZ5K) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-match-all

  # or specific version
  yarn add @sensio/op-sn-match-all@0.3.0
  ```
  
  ## Usage
  
  ```ts
  import snMatchAll from '@sensio/op-sn-match-all'


  const data = new U8intArray(7)
  await snMatchAll(data)
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  
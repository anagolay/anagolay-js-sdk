
  # @sensio/op-sn-file

  Blockchain Version **bafy2bzacea76v6e7qjc2r2p3csvjxi2j7h4o7jaentuyspaxva6wcl6o2bxac**
  

  ## Description 
  
  Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/@sensio/op-sn-file
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snFile)
  * support: [Discord server #dev channel](https://discord.gg/JsdKZ5K) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-file

  # or specific version
  yarn add @sensio/op-sn-file@0.3.1
  ```
  
  ## Usage
  
  ```ts
  import snFile from '@sensio/op-sn-file'


  const data = new U8intArray(7)
  await snFile(data)
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  

  # @sensio/op-sn-cid

  Blockchain Version **bafy2bzacebax2jywifp3h3enzj5o7vpj3yh6pmz3ez5hpfuji7h6ztpcg6gua**
  

  ## Description 
  
  Generic CID, defaults to base32 and dag-cbor for Any kind of data.
  
  ##  Links and Repo

  npm: https://www.npmjs.com/package/@sensio/op-sn-cid
  repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/snCid)
  support: [Discord server #dev channel](https://discord.gg/JsdKZ5K) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-cid

  # or specific version
  yarn add @sensio/op-sn-cid@0.3.0
  ```
  
  ## Usage
  
  ```ts
  import snCid from '@sensio/op-sn-cid'


  const data = new U8intArray(7)
  await snCid(data)
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  
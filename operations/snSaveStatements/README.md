
  # @sensio/op-sn-save-statements

  Blockchain Version **bafy2bzacecmqyut2oozadzigqsggrhkqxd2fxovubcy4djibfyci6iq6t4s4u**
  

  ## Description 
  
  Save the given statements to the Sensio Network. This operation waits until the records are in finalized state. Accepts the list of claims with the list of signatures for each claim. Mapping is done with the index of the list so `param1[0]` and `param2[0]`. If there are mismatches in the either of the params this operation will fail. Meaning that `param1.length === param2.length`
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/@sensio/op-sn-save-statements
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/snSaveStatements)
  * support: [Discord server #public-support channel](https://discord.gg/RQ9g29y) 

  ## Install
  
  ```sh
  # install latest version
  yarn add @sensio/op-sn-save-statements

  # or specific version
  yarn add @sensio/op-sn-save-statements@0.1.0
  ```
  
  ## Usage
  
  ```ts
  import snSaveStatements from '@sensio/op-sn-save-statements'

  const dataAsUintArray = new U8intArray(7)
  const dataAsBuffer = Buffer.from(7)
  await snSaveStatements([{data: dataAsUintArray, decode: ()=> dataAsBuffer}])
  ```
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  
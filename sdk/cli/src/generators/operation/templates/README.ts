/*  eslint-disable @typescript-eslint/restrict-template-expressions */
import generateNpmName from '@sensio/core/util/generateNpmName'
import stringToCamelCase from '@sensio/core/util/stringToCamelCase'
import { SnOperation } from '@sensio/types'

export default function generate(op: SnOperation): string {
  const npmName = generateNpmName(op.data.name)
  const opName: string = stringToCamelCase(op.data.name)
  const version = '0.1.0'
  return `
  # ${npmName}

  Blockchain Version **${op.id}**
  

  ## Description 
  
  ${op.data.desc}
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/${npmName}
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js-sdk/-/tree/master/operations/${opName})
  * support: [Discord server #public-support channel](https://discord.gg/RQ9g29y) 

  ## Install
  
  \`\`\`sh
  # install latest version
  yarn add ${npmName}

  # or specific version
  yarn add ${npmName}@${version}
  \`\`\`
  
  ## Usage
  
  \`\`\`ts
  import ${opName} from '${npmName}'

  const dataAsUintArray = new U8intArray(7)
  const dataAsBuffer = Buffer.from(7)
  await ${opName}([{data: dataAsUintArray, decode: ()=> dataAsBuffer}])
  \`\`\`
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  `
}

/*  eslint-disable @typescript-eslint/restrict-template-expressions */
import { stringCamelCase } from '@polkadot/util'
import { SnOperation } from '@sensio/types'
import { generateNpmName } from '../index'

export default function generate (op: SnOperation): string {
  const npmName = generateNpmName(op.data.name)
  const opName: string = stringCamelCase(op.data.name)
  const version = '0.3.1'
  return `
  # ${npmName}

  Blockchain Version **${op.id}**
  

  ## Description 
  
  ${op.data.desc}
  
  ##  Links and Repo

  * npm: https://www.npmjs.com/package/${npmName}
  * repo: [repo folder](https://gitlab.com/sensio_group/network-js/-/tree/master/operations/${opName})
  * support: [Discord server #dev channel](https://discord.gg/JsdKZ5K) 

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


  const data = new U8intArray(7)
  await ${opName}(data)
  \`\`\`
  
  ## Contributing
  
  PRs accepted.
  
  ## License
  
  Longer version is in LICENSE file
  
  Apache-2.0 © [Sensio Group](https://sensio.group) 
  `
}

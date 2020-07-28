/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { stringCamelCase } from '@polkadot/util'
import { SnOperation } from '@sensio/types'

export const mainFuncBodyTpl = (op: SnOperation): string => {
  const { data } = op

  // collect the input output types
  let types: string[] = []

  types = data.input.map((i) => `${i.whatType}`)
  types.push(data.output.output)
  if (data.output.decoded) {
    types.push(data.output.decoded)
  }
  const dedupe = [...new Set(types)]

  return `import { SnReturnParams, ${dedupe
    .map((t) => (t.includes('[]') ? t.split('[]')[0] : t))
    .join(', ')} } from "@sensio/types"
     import config from './config'
     import * as util from '@polkadot/util'

interface InputParams {
  childrenOutputs?: SnReturnParams[] 
  ${op.data.input.map((i) => `${i.name}: ${i.whatType}`).join(';\n')}
}

interface ReturnParams extends SnReturnParams extends SnReturnParams {
  output: ${op.data.output.output}
  decode: () => ${op.data.output.decoded}
}

/**
* @function ${stringCamelCase(data.name)}
* @description ${data.desc}
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (${data.output.desc}) and decoder function
*/
export default async function ${stringCamelCase(data.name)}(params: InputParams):  Promise<ReturnParams> {
  ${formatOps(data.ops)}
  console.error('IMPLEMENT ME', params, config)
  return {
    output: new Uint8Array(7),
    decode: () => 'CHANGE_ME'
  }
  
}`
}

function formatOps (ops: SnOperation[]): string {
  return ops.length > 0 ? `console.log('we have ${ops.length} child ops')` : ''
}

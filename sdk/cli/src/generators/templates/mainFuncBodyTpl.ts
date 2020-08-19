/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { stringCamelCase } from '@polkadot/util'
import { SnOperation } from '@sensio/types'

export const mainFuncBodyTpl = (op: SnOperation): string => {
  const { data } = op

  // let types: string[] = []

  // types = data.input.map(i => `${i.decoded}`)
  // types = types.concat(data.input.map(i => `${i.data}`))
  // types.push(data.output.output)
  // types.push(data.output.decoded)

  // const dedupe = [...new Set(types)]

  // collect the input output types

  return `
  import { SnForWhat } from '@sensio/types'
  import { InputParams, ReturnParams } from './interfaces'
  import config from './config'
 
/**
* @function ${stringCamelCase(data.name)}
* @description ${data.desc}
* @param {InputParams} params InputParams
* @return {Promise<ReturnParams>} output (${
    data.output.desc
  }) and decoder function
*/
export async function ${stringCamelCase(
    data.name
  )}( params: InputParams): Promise<ReturnParams> {
  ${formatOps(data.ops)}
  const inputLength = config.data.input.length
  const fcOpType = config.data.groups.includes(SnForWhat.FLOWCONTROL)

  if (!fcOpType && params.length !== inputLength) {
    throw new Error('Got wrong amount of inputs.')
  }
  if (inputLength === 1) {
    // start implementation here
    console.log('${stringCamelCase(data.name)}', params)
    const data = params[inputLength - 1]
    return {
      data: data.data,
      decode: () => 'CHANGE_ME'
    }
  } else {
    throw new Error("This operation doesn't support more than one input param ")
  }
}

export default ${stringCamelCase(data.name)}
`
}

function formatOps (ops: SnOperation[]): string {
  return ops.length > 0 ? `console.log('we have ${ops.length} child ops')` : ''
}

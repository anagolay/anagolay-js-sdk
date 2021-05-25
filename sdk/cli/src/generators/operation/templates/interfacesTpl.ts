/*  eslint-disable @typescript-eslint/restrict-template-expressions */
import { isEmpty, prop } from 'ramda'

import { AnInputParamsDefinition, AnOperation, AnOperationData } from '@anagolay/types'

/**
 * Generate main interface file
 * @param op [AnOperation]
 * @return string
 */
export default function interfacesTpl(op: AnOperation): string {
  const { data } = op
  let types: string[] = []

  types = data.input.map((i) => `${i.decoded}`)
  types = types.concat(data.input.map((i) => `${i.data}`))

  // @FUCK bug here with the output declaration of `[AnAnagolayClaim[],AnAnagolaySignatures[]]`
  // https://gitlab.com/anagolay/network-js-sdk/-/issues/65
  types.push(data.output.output)
  types.push(data.output.decoded)
  const dedupe = [...new Set(types)]

  return `
  import { AnInputParamsImplementation, ${dedupe
    .map((t) => (t.includes('[]') ? t.split('[]')[0] : t))
    .join(', ')} } from "@anagolay/types"
  
  export interface ReturnParams extends AnInputParamsImplementation {
    data: ${data.output.output} // value of \`data.output.output\`
    decode: () => ${data.output.decoded} // value of \`data.output.decoded\`
  }

  ${generateInputParamList(data.input)}
  ${generateInputParams(data)}
  `
}

/**
 * Generate  input param list with the keys part of the name
 * @param inputs [SnInputParamsDefinition]
 * @return string
 */
export function generateInputParamList(inputs: AnInputParamsDefinition[]): string {
  return inputs
    .map((i, k) => {
      return `export interface InputParam${k} extends AnInputParamsImplementation {
      data: ${i.data}
      decode: () => ${i.decoded}
    }`
    })
    .join('\n')
}

/**
 * Generate Input params type
 * @param inputs [SnInputParamsDefinition]
 * @return string
 */
export function generateInputParams(data: AnOperationData): string {
  const inputs = prop('input', data)

  const res: string[] = ['export type InputParams', '=']

  const parts = inputs.map((_i, k) => `InputParam${k}`).join(',')

  if (isEmpty(parts)) {
    res.push('AnInputParamsImplementation')
    res.push('[')
  } else {
    res.push('[')
    res.push(parts)
  }

  res.push(']')

  return res.join(' ')
}

/*  eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  SnInputParamsDefinition,
  SnOperation,
  SnOperationData
} from '@sensio/types'
import { isEmpty, prop } from 'ramda'
/**
 * Generate main interface file
 * @param op [SnOperation]
 * @return string
 */
export default function interfacesTpl (op: SnOperation): string {
  const { data } = op
  let types: string[] = []

  types = data.input.map(i => `${i.decoded}`)
  types = types.concat(data.input.map(i => `${i.data}`))
  types.push(data.output.output)
  types.push(data.output.decoded)
  const dedupe = [...new Set(types)]

  return `
  import { SnInputParamsImplementation, ${dedupe
    .map(t => (t.includes('[]') ? t.split('[]')[0] : t))
    .join(', ')} } from "@sensio/types"
  
  export interface ReturnParams extends SnInputParamsImplementation {
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
export function generateInputParamList (
  inputs: SnInputParamsDefinition[]
): string {
  return inputs
    .map((i, k) => {
      return `export interface InputParam${k} extends SnInputParamsImplementation {
      data: ${i.data}
      decode: () => ${i.decoded}
    }`
    })
    .join('/n')
}

/**
 * Generate Input params type
 * @param inputs [SnInputParamsDefinition]
 * @return string
 */
export function generateInputParams (data: SnOperationData): string {
  const inputs = prop('input', data)

  const res: string[] = ['export type InputParams', '=']

  const parts = inputs.map((_i, k) => `InputParam${k}`).join(',')

  if (isEmpty(parts)) {
    res.push('SnInputParamsImplementation')
    res.push('[')
  } else {
    res.push('[')
    res.push(parts)
  }
  res.push(']')
  return res.join(' ')
}

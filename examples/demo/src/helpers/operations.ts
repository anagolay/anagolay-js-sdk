/* eslint-disable no-eval */

import { u8aToString } from '@polkadot/util'
import { InputData, Operation, OperationExecutionGroup } from '../interfaces'
// function capitalizeFirstLetter (str: string): string {
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }

const defaultOperation: Operation['data'] = {
  name: '',
  desc: '',
  input: [],
  output: 'Uint8Array',
  hashing: {
    algo: 'blake2b',
    bits: 256
  },
  encoding: {
    algo: 'hex',
    prefix: true
  },
  ops: [],
  group: [OperationExecutionGroup.SYS],
  priority: 0
}

export const opSnCid: Operation = {
  id: 'ss',
  data: {
    ...defaultOperation,
    name: 'sn_cid',
    desc: '',
    input: [InputData],
    output: 'Uint8Array',
    ops: []
  }
}

export async function snCid (data: Uint8Array): Promise<string> {
  return u8aToString(data)
}

// export const opSnInput: Operation = {
//   id: 'ss',
//   data: {
//     ...defaultOperation,
//     name: 'sn_input',
//     desc: '',
//     input: [
//       {
//         name: 'data',
//         type: 'Uint8Array',
//         desc: 'Any data'
//       }
//     ],
//     output: {
//       name: 'data',
//       type: 'Uint8Array',
//       desc: 'Any data'
//     },
//     ops: []
//   }
// }

// export async function snInput (data: any): Promise<Uint8Array> {
//   return data
// }

// export const opSnMatchAll: Operation = {
//   id: 'ss',
//   data: {
//     ...defaultOperation,
//     name: 'sn_input',
//     desc: '',
//     ops: [opSnCid, opSnInput]
//   }
// }

// export async function snMatchAll (): Promise<boolean> {
//   const opsResult = await Promise.all(
//     opSnMatchAll.data.ops.map(async o => {
//       const method = stringCamelCase(o.data.name)
//       switch (method) {
//         case 'snGenericCid':
//           return await snGenericCid(u8aToU8a('hi'))
//         case 'snInput':
//           return await snInput('hi')
//         default:
//           throw new Error('no default')
//       }
//     })
//   )

//   // check how many unique records we have, must be only one
//   const uniqueResults = uniq(opsResult)

//   if (uniqueResults.length !== 1) {
//     return false
//   } else {
//     return true
//   }
// }

// export const opSnPrepareStatements: Operation = {
//   id: 'ss',
//   data: {
//     ...defaultOperation,
//     name: 'sn_prepare_statements',
//     desc: '',
//     ops: [opSnCid, opSnInput]
//   }
// }

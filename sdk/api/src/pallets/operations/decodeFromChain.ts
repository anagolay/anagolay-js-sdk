/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { map } from 'ramda'

import decodeHexToString from '@anagolay/api/utils/decodeHexToString'
import { AnInputParamsDefinition, AnOperation, AnOperationOutput, Operation } from '@anagolay/types'

/**
 * Decodes the Operation from the chain to readable object
 * @param op Operation from the Network
 */
export function decodeFromChain(op: Operation): AnOperation {
  const decoded: AnOperation = {
    id: decodeHexToString(op.id),
    data: {
      name: decodeHexToString(op.data.name),
      desc: decodeHexToString(op.data.desc),
      input: op.data.input.map((input) => ({
        data: decodeHexToString(input.data),
        decoded: decodeHexToString(input.decoded),
      })) as AnInputParamsDefinition[],
      groups: op.data.groups.map((m) => m.toNumber()),
      priority: op.data.priority.toNumber(),
      output: {
        desc: decodeHexToString(op.data.output.desc),
        output: decodeHexToString(op.data.output.output),
        decoded: decodeHexToString(op.data.output.decoded),
      } as AnOperationOutput,
      hashingOp: decodeHexToString(op.data.hashingOp),
      encOp: decodeHexToString(op.data.encOp),
      ops: map(decodeFromChain, op.data.ops),
    },
  }

  return decoded
}

export default decodeFromChain

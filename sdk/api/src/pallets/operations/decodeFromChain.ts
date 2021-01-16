/* eslint-disable @typescript-eslint/consistent-type-assertions */
import decodeHexToString from '@sensio/api/utils/decodeHexToString'
import { Operation, SnInputParamsDefinition, SnOperation, SnOperationOutput } from '@sensio/types'
import { map } from 'ramda'

/**
 * Decodes the Operation from the chain to readable object
 * @param op Operation from the Network
 */
export function decodeFromChain(op: Operation): SnOperation {
  const decoded: SnOperation = {
    id: decodeHexToString(op.id),
    data: {
      name: decodeHexToString(op.data.name),
      desc: decodeHexToString(op.data.desc),
      input: op.data.input.map((input) => ({
        data: decodeHexToString(input.data),
        decoded: decodeHexToString(input.decoded),
      })) as SnInputParamsDefinition[],
      groups: op.data.groups.map((m) => m.toNumber()),
      priority: op.data.priority.toNumber(),
      output: {
        desc: decodeHexToString(op.data.output.desc),
        output: decodeHexToString(op.data.output.output),
        decoded: decodeHexToString(op.data.output.decoded),
      } as SnOperationOutput,
      hashingOp: decodeHexToString(op.data.hashingOp),
      encOp: decodeHexToString(op.data.encOp),
      ops: map(decodeFromChain, op.data.ops),
    },
  }
  return decoded
}

export default decodeFromChain

import { Bytes } from '@polkadot/types'
import { hexToString } from '@polkadot/util'
import { Operation } from '@sensio/types'

function decodeHex (s: Bytes): string {
  return hexToString(s.toString())
}

export function decodeOperationFromChain (op: Operation): any {
  const decoded = {
    id: decodeHex(op.id),
    data: {
      name: decodeHex(op.data.name),
      desc: decodeHex(op.data.desc),
      input: op.data.input.map(input => ({
        data: decodeHex(input.data),
        decoded: decodeHex(input.decoded)
      })),
      groups: op.data.groups.map(m => m.toNumber()),
      priority: op.data.priority.toNumber(),
      output: {
        desc: decodeHex(op.data.output.desc),
        output: decodeHex(op.data.output.output),
        decoded: decodeHex(op.data.output.decoded)
      },
      hashingOp: decodeHex(op.data.hashingOp),
      encOp: decodeHex(op.data.encOp),
      ops: op.data.ops.map(o => decodeOperationFromChain(o))
    }
  }
  return decoded
}

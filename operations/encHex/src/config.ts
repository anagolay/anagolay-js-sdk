/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzacichnplphoeurdvhk6l2krdptbpjvqcxs6l4jceydr5flninemi7nnkdso477l3clfjuftx7itf3h666m4kftpm7mm2ndpch2uycg6zw4',
  data: {
    name: 'enc_hex',
    desc: 'Encode arbitrary data to HEX with 0x prefix ',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAny',
      },
    ],
    groups: [6],
    priority: 0,
    output: {
      desc: 'Returns prefixed hex encoded string. Example 0x11211221',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    hashingOp: '',
    encOp: '',
    ops: [],
  },
}

export default op

/**
 * Operation specification
 */
import { AnOperation } from '@anagolay/types'

export const op: AnOperation = {
  id: 'bafymbzaciblqfohl5zvrptml7qgoihozctdaw3sj5sp37hjj4kzgnhusretoetgquhgdloomtcz4kac7f722ajjlbdcr2tvbbkvk4dwmpdi5ykdo',
  data: {
    name: 'multihash',
    desc: 'Generic blake2b-256 multihash operation.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAny',
      },
    ],
    groups: [6],
    priority: 0,
    output: {
      desc: 'Returns the Multihash buffer as AnByteArray.',
      output: 'AnByteArray',
      decoded: 'AnBuffer',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
  },
}

export default op

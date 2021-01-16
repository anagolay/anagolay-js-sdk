/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacealjmcwnfurdmn2tndsv35d5cdbaempopwdq5pr5zr56yrfhuc2zk',
  data: {
    name: 'sn_split',
    desc:
      'Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnSplitParams',
      },
    ],
    groups: [6],
    priority: 0,
    output: {
      desc:
        'Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.',
      output: 'SnByteArray',
      decoded: 'SnProofParams[]',
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
  },
}

export default op

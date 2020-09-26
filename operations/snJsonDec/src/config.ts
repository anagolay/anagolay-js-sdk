/**
 * Operation specification
 */

import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzaced7rpfi7k4atlkdaz5x6dmztvzm2jwz7on6lcykdswuf5s2jn4yo4',
  data: {
    name: 'sn_json_dec',
    desc: 'Wrapper of JSON.parse()',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnAny',
      },
    ],
    groups: [6],
    priority: 0,
    output: {
      desc: '',
      output: 'SnByteArray',
      decoded: 'SnAny',
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
  },
}

export default op

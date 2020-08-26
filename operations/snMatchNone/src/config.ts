/**
 * Operation specification
 */

import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzaceav6aryxb4qisakn64r4irptupvljhiv5l3xxiamlxiglrh2wyq2e',
  data: {
    name: 'sn_match_none',
    desc: 'This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [
      6,
      7
    ],
    priority: 0,
    output: {
      desc: 'Returns true, if none match or throws an error if some match.',
      output: 'SnBoolean',
      decoded: 'SnBoolean'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: []
  }
}

export default op

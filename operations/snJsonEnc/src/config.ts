/**
 * Operation specification
 */

import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacebc64bhgsj24ad53pkgxb7xi3zdedshiozl33nqplv7t5y27tii2u',
  data: {
    name: 'sn_json_enc',
    desc: 'Wrapper of JSON.stringify().',
    input: [
      {
        data: 'SnAny',
        decoded: 'SnAny'
      }
    ],
    groups: [
      6
    ],
    priority: 0,
    output: {
      desc: 'Returns SnByteArray of json string.',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: []
  }
}

export default op

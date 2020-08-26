/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzaceanqw2xwjawh4zdrn6lct7pi63fndib5jhcx7hfe5y7g6iwwrwqka',
  data: {
    name: 'sn_enc_hex',
    desc: 'Encode arbitrary data to HEX with 0x prefix ',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnAny'
      }
    ],
    groups: [
      6
    ],
    priority: 0,
    output: {
      desc: 'Returns prefixed hex encoded string. Example 0x11211221',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    hashingOp: '',
    encOp: '',
    ops: []
  }
}

export default op

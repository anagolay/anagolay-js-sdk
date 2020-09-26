/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacecnosczzvuuibkajhvporgd4e5rrye4wcorvm7zmloinm6ofngdeq',
  data: {
    desc: 'Create QR Code',
    name: 'sn_create_qrcode',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnAny',
      },
    ],
    output: {
      desc: 'Return QRCode image',
      output: 'SnByteArray',
      decoded: 'SnString',
    },
    groups: [6],
    priority: 0,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
  },
}

export default op

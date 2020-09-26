/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacedtcdvuykc4jencdnm5zymadzutm7yzvpughbgjotxmgpyglzhqpc',
  data: {
    desc:
      'Take the photo of the QRCode and do the verification of equality. If the verification is a successes the coperation will continue, if not user will be asked to resubmit the image. The photo taken MUST NOT BE MODIFIED, RESIZED AND MUST BE IN JPG OR JPEG. Medium or low size is better than large 10MB files. You can choose that in the camera settings',
    name: 'sn_take_photo_and_upload_qrcode',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnString',
      },
    ],
    output: {
      desc: 'Return the QRCode data if it passes the decoding and verification.',
      output: 'SnByteArray',
      decoded: 'SnString',
    },
    groups: [5],
    priority: 0,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
  },
}

export default op

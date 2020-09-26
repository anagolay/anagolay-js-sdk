/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacecjrerw6cnuyj3ta7ntsvleq43vxgt4otgdvf2wjjpdg5almrzd4y',
  data: {
    desc: 'Extract Only Raw pixels from the image',
    name: 'sn_image_raw_pixels',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnFileBuffer',
      },
    ],
    output: {
      desc: 'Returns the raw pixel bytes without metadata',
      output: 'SnByteArray',
      decoded: 'SnImageData',
    },
    groups: [6],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [
      {
        id: 'bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m',
        data: {
          name: 'sn_file',
          desc:
            'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
          input: [
            {
              data: 'StringOrBuffer',
              decoded: 'StringOrBuffer',
            },
          ],
          groups: [6, 1],
          priority: 0,
          output: {
            desc: 'Returns the File Buffer.',
            output: 'SnByteArray',
            decoded: 'SnFileBuffer',
          },
          hashingOp: 'sn_cid',
          encOp: 'sn_enc_hex',
          ops: [],
        },
      },
    ],
  },
}

export default op

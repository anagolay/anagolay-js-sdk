/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
  id: 'bafy2bzacedk46pihe5gr44l6liofvga6umxyhy27hwp4treiq32y6cdywsxzm',
  data: {
    desc: 'Extract All Image Metadata',
    name: 'sn_image_metadata',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnFileBuffer',
      },
    ],
    output: {
      desc:
        'Returns the metadata as SnByteArray and decoded as SnImageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`',
      output: 'SnByteArray',
      decoded: 'SnImageMetadata',
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

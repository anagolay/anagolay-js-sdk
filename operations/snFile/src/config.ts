/**
 * Operation specification
 */
import { SnOperation } from '@sensio/types'

export const op: SnOperation = {
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
}

export default op

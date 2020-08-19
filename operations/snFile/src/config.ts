/**
 * Operation specification
 */

export default {
  id: 'bafy2bzacea76v6e7qjc2r2p3csvjxi2j7h4o7jaentuyspaxva6wcl6o2bxac',
  data: {
    name: 'sn_file',
    desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [
      {
        data: 'SnString',
        decoded: 'SnString'
      }
    ],
    groups: [
      6,
      1
    ],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray',
      decoded: 'SnFileBuffer'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: []
  }
}

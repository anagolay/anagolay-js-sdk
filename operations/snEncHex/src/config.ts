/**
 * Operation specification
 */

export default {
  id: 'bafy2bzacec257yn2vfyex55dyw646bka2hfimf7owipofd74237dpicebcxfi',
  data: {
    name: 'sn_enc_hex',
    desc: 'Encode arbitrary data to HEX with 0x prefix ',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnString'
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

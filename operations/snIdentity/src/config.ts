/**
 * Operation specification
 */

export default {
  id: 'bafy2bzacecc2mmjx3nltb7pkdbtvjf64pjoswimxrcowguwi5jxn34blzb44s',
  data: {
    name: 'sn_identity',
    desc: 'What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.',
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
      desc: '',
      output: 'SnByteArray',
      decoded: 'SnAny'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: []
  }
}
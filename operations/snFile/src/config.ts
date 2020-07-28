/**
 * Operation specification
 */

export const config = {
  id: 'bafy2bzacedhpqt4cwketlhqrni6zih556dwaqfxojyqavnmkmwu3nnguxjmwc',
  data: {
    name: 'sn_file',
    desc: 'RAW file buffer for other ops to use.',
    input: [
      {
        name: 'file',
        desc: 'File buffer',
        whatType: 'SnByteArray',
        value: ''
      }
    ],
    childrenOutputs: [],
    groups: [
      6,
      1
    ],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_file',
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray',
      decoded: 'SnFileBuffer'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  }
}
export default config

/**
 * Operation specification
 */

export const config = {
  id: 'bafy2bzacedsbv2ekwamc7345h2tr6a46zvhvcpoaj76edrytgm4jrdhbptjzg',
  data: {
    name: 'sn_json_enc',
    desc: 'Wrapper of JSON.stringify().',
    input: [
      {
        name: 'data',
        desc: 'Any kind of data',
        whatType: 'SnAny',
        value: ''
      }
    ],
    childrenOutputs: [],
    groups: [
      6
    ],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_json_enc',
      desc: 'Returns SnByteArray of json string.',
      output: 'SnByteArray',
      decoded: 'SnString'
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

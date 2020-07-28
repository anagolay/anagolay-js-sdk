import { SnOperationData } from '@sensio/types'

const ops: SnOperationData[] = [
  {
    name: 'sn_split',
    desc:
      'Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.',
    input: [
      {
        name: 'sn_split',
        desc: 'Operation name',
        whatType: 'SnByteArray',
        value: ''
      }
    ],
    childrenOutputs: [],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      opName: 'op_name',
      desc:
        'Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.',
      output: 'ProofParams[]',
      decoded: 'ProofParams[]'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  },
  {
    name: 'sn_cid',
    desc: 'Generic CID, defaults to base32 and dag-cbor for Any kind of data.',
    input: [
      {
        name: 'data',
        desc: 'Any kind of data',
        whatType: 'SnByteArray',
        value: ''
      }
    ],
    childrenOutputs: [],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_cid',
      desc: 'CID string converted into SnByteArray',
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
  },
  {
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
    groups: [6],
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
  },
  {
    name: 'sn_json_dec',
    desc: 'Wrapper of JSON.parse()',
    input: [
      {
        name: 'data',
        desc: 'Any kind of data.',
        whatType: 'SnByteArray',
        value: ''
      }
    ],
    childrenOutputs: [],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_json_dec',
      desc: '',
      output: 'SnAny',
      decoded: 'SnAny'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  },
  {
    name: 'sn_input',
    desc:
      'What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.',
    input: [],
    childrenOutputs: [],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_input',
      desc: '',
      output: 'SnByteArray',
      decoded: 'SnAny'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  },
  {
    name: 'sn_match_all',
    desc:
      'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
    input: [],
    childrenOutputs: [],
    groups: [6, 7],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_match_all',
      desc: 'Returns true, if all match or throws an error if some match.',
      output: 'SnBoolean',
      decoded: 'SnBoolean'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  },
  {
    name: 'sn_match_none',
    desc:
      'This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.',
    input: [],
    childrenOutputs: [],
    groups: [6, 7],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_match_all',
      desc: 'Returns true, if none match or throws an error if some match.',
      output: 'SnBoolean',
      decoded: 'SnBoolean'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  },
  {
    name: 'sn_multihash',
    desc: 'Generic blake2b-256 multihash operation.',
    input: [
      {
        name: 'data',
        desc: 'Any kind of data',
        whatType: 'SnByteArray',
        value: ''
      }
    ],
    childrenOutputs: [],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_multihash',
      desc: 'Returns the Multihash buffer as SnByteArray.',
      output: 'SnByteArray',
      decoded: 'SnBuffer'
    },
    hashing: {
      bits: 256,
      algo: 'blake2b'
    },
    encoding: {
      prefix: true,
      algo: 'hex'
    }
  },
  {
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
    groups: [6, 1],
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
]

export default ops

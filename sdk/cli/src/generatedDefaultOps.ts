export const snSplit = {
  id: 'bafy2bzaceddfhv62qtcxf7bj3arhejk37cb2pnoel5kol67odyvdynseibjte',
  data: {
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
      opName: 'sn_split',
      desc:
        'Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.',
      output: 'SnByteArray',
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
  }
}

export const snCid = {
  id: 'bafy2bzaceblexvfwzrm35vxe626repr4iyy3m6pvhl3or66qbuoz42oom4aii',
  data: {
    name: 'sn_cid',
    desc: 'Generic CID, defaults to base32 and JSON for Any kind of data.',
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
  }
}

export const snJsonEnc = {
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
  }
}

export const snJsonDec = {
  id: 'bafy2bzacedgzp2icg45mvfkjbzfdejwqnzq2kjpelkti2hpq2dwkuuuysxqec',
  data: {
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
      output: 'SnAny'
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

export const snInput = {
  id: 'bafy2bzacecfub3blh425abcu5xrnkndnywuetrhaogk3ospaxjempsxy5qqty',
  data: {
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
  }
}

export const snMatchAll = {
  id: 'bafy2bzacecwm5nymvsx2wh6zqisgtnf7idro75vw527qglxrwdxzxgxbtftcm',
  data: {
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
      output: 'SnBoolean'
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

export const snMatchNone = {
  id: 'bafy2bzaceb7hyrpg5cavg4ffvfbdyhv3utxujl7exk7jvyqek46ivktbfruqg',
  data: {
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
      output: 'SnBoolean'
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

export const snMultihash = {
  id: 'bafy2bzacec6ftwiwlvh3unwhyfxq3dqkjely2jdpqzhh2vs33vu5zhgi5x5jc',
  data: {
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

export const snFile = {
  id: 'bafy2bzacebuimsmwxv6amuhhmd2nwaunqlap2djojgf4dvvly3mv25byasfwc',
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
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      opName: 'sn_file',
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray'
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

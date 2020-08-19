import { SnOperationDataForCreating } from '@sensio/types'

// create all classes
export const multipleOnSameLevelOps: SnOperationDataForCreating[] = [
  {
    desc:
      'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'sn_image_phash',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [],
    opNames: ['sn_file']
  },
  {
    name: 'sn_file',
    desc:
      'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray',
      decoded: 'SnFileBuffer'
    },
    hashingOp: '',
    encOp: '',
    opNames: []
  },
  {
    name: 'sn_file_copy',
    desc:
      'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray',
      decoded: 'SnFileBuffer'
    },
    hashingOp: '',
    encOp: '',
    opNames: []
  },
  {
    name: 'sn_image_metadata_hash',
    desc:
      'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid',
    input: [{ data: 'SnByteArray', decoded: 'SnImageMetadata' }],
    output: {
      desc:
        'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'SnByteArray',
      decoded: 'SnGenericId'
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [],
    opNames: ['sn_image_metadata']
  },
  {
    desc: 'Extract All Image Metadata',
    name: 'sn_image_metadata',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnFileBuffer'
      }
    ],
    output: {
      desc:
        'Returns the metadata as SnByteArray. Accessible as `output.TAG_NAME`',
      output: 'SnByteArray',
      decoded: 'SnImageMetadata'
    },
    groups: [6],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
    opNames: ['sn_file', 'sn_file_copy']
  }
]
// create all classes
export const ops: SnOperationDataForCreating[] = [
  {
    desc:
      'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'sn_image_phash',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [],
    opNames: ['sn_file']
  },
  {
    name: 'sn_file',
    desc:
      'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray',
      decoded: 'SnFileBuffer'
    },
    hashingOp: '',
    encOp: '',
    opNames: []
  },
  {
    name: 'sn_image_metadata_hash',
    desc:
      'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid',
    input: [{ data: 'SnByteArray', decoded: 'SnImageMetadata' }],
    output: {
      desc:
        'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'SnByteArray',
      decoded: 'SnGenericId'
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [],
    opNames: ['sn_image_metadata']
  },
  {
    desc: 'Extract All Image Metadata',
    name: 'sn_image_metadata',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnFileBuffer'
      }
    ],
    output: {
      desc:
        'Returns the metadata as SnByteArray. Accessible as `output.TAG_NAME`',
      output: 'SnByteArray',
      decoded: 'SnImageMetadata'
    },
    groups: [6],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
    opNames: ['sn_file']
  }
]

export const resolvedOpDeps: SnOperationDataForCreating[] = [
  {
    name: 'sn_file',
    desc:
      'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray',
      decoded: 'SnFileBuffer'
    },
    hashingOp: '',
    encOp: '',
    opNames: []
  },
  {
    desc:
      'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'sn_image_phash',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [
      {
        name: 'sn_file',
        desc:
          'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'SnByteArray',
          decoded: 'SnFileBuffer'
        },
        hashingOp: '',
        encOp: '',
        opNames: []
      }
    ],
    opNames: ['sn_file']
  },
  {
    name: 'sn_image_metadata_hash',
    desc:
      'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid',
    input: [{ data: 'SnByteArray', decoded: 'SnImageMetadata' }],
    output: {
      desc:
        'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'SnByteArray',
      decoded: 'SnGenericId'
    },
    groups: [6],
    priority: 2,
    hashingOp: '',
    encOp: '',
    ops: [
      {
        desc: 'Extract All Image Metadata',
        name: 'sn_image_metadata',
        input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
        output: {
          desc:
            'Returns the metadata as SnByteArray. Accessible as `output.TAG_NAME`',
          output: 'SnByteArray',
          decoded: 'SnImageMetadata'
        },
        groups: [6],
        priority: 1,
        hashingOp: 'sn_cid',
        encOp: 'sn_enc_hex',
        ops: [
          {
            name: 'sn_file',
            desc:
              'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
            groups: [6, 1],
            ops: [],
            priority: 0,
            output: {
              desc: 'Returns the File Buffer.',
              output: 'SnByteArray',
              decoded: 'SnFileBuffer'
            },
            hashingOp: '',
            encOp: '',
            opNames: []
          }
        ],
        opNames: ['sn_file']
      }
    ],
    opNames: ['sn_image_metadata']
  },
  {
    desc: 'Extract All Image Metadata',
    name: 'sn_image_metadata',
    input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
    output: {
      desc:
        'Returns the metadata as SnByteArray. Accessible as `output.TAG_NAME`',
      output: 'SnByteArray',
      decoded: 'SnImageMetadata'
    },
    groups: [6],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [
      {
        name: 'sn_file',
        desc:
          'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'SnByteArray',
          decoded: 'SnFileBuffer'
        },
        hashingOp: '',
        encOp: '',
        opNames: []
      }
    ],
    opNames: ['sn_file']
  }
]

export const specialFcCases: SnOperationDataForCreating[] = [
  {
    name: 'sn_match_all',
    desc:
      'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [6, 7],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns true, if all match or throws an error if some match.',
      output: 'SnBoolean',
      decoded: 'SnBoolean'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  }
]

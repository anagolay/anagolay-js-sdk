import { SnForWhat, SnOperationDataForCreating } from '@sensio/types'

const ops: SnOperationDataForCreating[] = [
  {
    name: 'sn_enc_hex',
    desc: 'Encode arbitrary data to HEX with 0x prefix ',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnAny'
      }
    ],
    groups: [SnForWhat.SYS],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns prefixed hex encoded string. Example 0x11211221',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    hashingOp: '',
    encOp: '',
    opNames: []
  },
  {
    name: 'sn_split',
    desc:
      'Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnSplitParams'
      }
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc:
        'Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.',
      output: 'SnByteArray',
      decoded: 'SnProofParams[]'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  },
  {
    name: 'sn_cid',
    desc: 'Generic CID, defaults to base32 and dag-cbor for Any kind of data.',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnBuffer'
      }
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: 'CID string converted into SnByteArray',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    hashingOp: '',
    encOp: '',
    opNames: ['sn_multihash']
  },
  {
    name: 'sn_json_enc',
    desc: 'Wrapper of JSON.stringify().',
    input: [
      {
        data: 'SnAny',
        decoded: 'SnAny'
      }
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns SnByteArray of json string.',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  },
  {
    name: 'sn_json_dec',
    desc: 'Wrapper of JSON.parse()',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnAny'
      }
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: '',
      output: 'SnByteArray',
      decoded: 'SnAny'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  },
  {
    name: 'sn_identity',
    desc:
      'What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnAny'
      }
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: '',
      output: 'SnByteArray',
      decoded: 'SnAny'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  },
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
  },
  {
    name: 'sn_match_none',
    desc:
      'This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [6, 7],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns true, if none match or throws an error if some match.',
      output: 'SnBoolean',
      decoded: 'SnBoolean'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  },
  {
    name: 'sn_multihash',
    desc: 'Generic blake2b-256 multihash operation.',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnAny'
      }
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the Multihash buffer as SnByteArray.',
      output: 'SnByteArray',
      decoded: 'SnBuffer'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  },
  {
    name: 'sn_file',
    desc:
      'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [
      {
        data: 'SnString',
        decoded: 'SnString'
      }
    ],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'SnByteArray',
      decoded: 'SnFileBuffer'
    },
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    opNames: []
  },
  {
    name: 'sn_image_metadata_hash',
    desc:
      'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnImageMetadata'
      }
    ],
    output: {
      desc:
        'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'SnByteArray',
      decoded: 'SnGenericId'
    },
    groups: [SnForWhat.SYS],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
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
        'Returns the metadata as SnByteArray and decoded as SnImageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`',
      output: 'SnByteArray',
      decoded: 'SnImageMetadata'
    },
    groups: [SnForWhat.SYS],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
    opNames: ['sn_file']
  },
  {
    desc:
      'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'sn_image_phash',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnFileBuffer'
      }
    ],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    groups: [SnForWhat.SYS],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
    opNames: ['sn_file']
  },
  {
    desc: 'Calculate content id of the raw pixels',
    name: 'sn_image_raw_pixels_hash',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnImageData'
      }
    ],
    output: {
      desc: 'Return content id of the raw pixels',
      output: 'SnByteArray',
      decoded: 'SnString'
    },
    groups: [SnForWhat.SYS],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
    opNames: ['sn_image_raw_pixels']
  },
  {
    desc: 'Extract Only Raw pixels from the image',
    name: 'sn_image_raw_pixels',
    input: [
      {
        data: 'SnByteArray',
        decoded: 'SnFileBuffer'
      }
    ],
    output: {
      desc: 'Returns the raw pixel bytes without metadata',
      output: 'SnByteArray',
      decoded: 'SnImageData'
    },
    groups: [SnForWhat.SYS],
    priority: 1,
    hashingOp: 'sn_cid',
    encOp: 'sn_enc_hex',
    ops: [],
    opNames: ['sn_file']
  }
]

export default ops

import { SnForWhat, SnOperationDataForCreating } from '@sensio/types'

export const ops: SnOperationDataForCreating[] = [
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
    name: 'sn_file',
    desc:
      'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [
      {
        data: 'SnByteArray',
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
  }
]

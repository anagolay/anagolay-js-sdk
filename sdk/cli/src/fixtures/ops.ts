import { SnOperation } from '@sensio/types'

const ops: SnOperation[] = [
  {
    id: 'bafy2bzacec257yn2vfyex55dyw646bka2hfimf7owipofd74237dpicebcxfi',
    data: {
      name: 'sn_enc_hex',
      desc: 'Encode arbitrary data to HEX with 0x prefix ',
      input: [{ data: 'SnByteArray', decoded: 'SnString' }],
      groups: [6],
      priority: 0,
      output: {
        desc: 'Returns prefixed hex encoded string. Example 0x11211221',
        output: 'SnByteArray',
        decoded: 'SnString',
      },
      hashingOp: '',
      encOp: '',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacebhlwiz7bowujcinafxyhyobdsyvzvsxqcnrofcdcmd2kctfd4qb2',
    data: {
      name: 'sn_split',
      desc:
        'Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.',
      input: [{ data: 'SnByteArray', decoded: 'SnSplitParams' }],
      groups: [6],
      priority: 0,
      output: {
        desc:
          'Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.',
        output: 'SnProofParams[]',
        decoded: 'SnProofParams[]',
      },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacea2qtgwlyai6ekxie7pzdiquetxhopytzwxqxpixlteu2uidt55pa',
    data: {
      name: 'sn_json_enc',
      desc: 'Wrapper of JSON.stringify().',
      input: [{ data: 'SnByteArray', decoded: 'SnAny' }],
      groups: [6],
      priority: 0,
      output: {
        desc: 'Returns SnByteArray of json string.',
        output: 'SnByteArray',
        decoded: 'SnString',
      },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzaced7rpfi7k4atlkdaz5x6dmztvzm2jwz7on6lcykdswuf5s2jn4yo4',
    data: {
      name: 'sn_json_dec',
      desc: 'Wrapper of JSON.parse()',
      input: [{ data: 'SnByteArray', decoded: 'SnAny' }],
      groups: [6],
      priority: 0,
      output: { desc: '', output: 'SnByteArray', decoded: 'SnAny' },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacecc2mmjx3nltb7pkdbtvjf64pjoswimxrcowguwi5jxn34blzb44s',
    data: {
      name: 'sn_identity',
      desc:
        'What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.',
      input: [{ data: 'SnByteArray', decoded: 'SnAny' }],
      groups: [6],
      priority: 0,
      output: { desc: '', output: 'SnByteArray', decoded: 'SnAny' },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacecxvve6bdbjvokspk2ocvk6m2yvrykcguzluf6q2criwnwzz4hnnw',
    data: {
      name: 'sn_match_all',
      desc:
        'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
      input: [],
      groups: [6, 7],
      priority: 0,
      output: {
        desc: 'Returns true, if all match or throws an error if some match.',
        output: 'SnBoolean',
        decoded: 'SnBoolean',
      },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzaceav6aryxb4qisakn64r4irptupvljhiv5l3xxiamlxiglrh2wyq2e',
    data: {
      name: 'sn_match_none',
      desc:
        'This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.',
      input: [],
      groups: [6, 7],
      priority: 0,
      output: {
        desc: 'Returns true, if none match or throws an error if some match.',
        output: 'SnBoolean',
        decoded: 'SnBoolean',
      },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacea24txwqzwanzte5laqhsy3umk4wq43h3llvlvkebp7gv73kzuzsi',
    data: {
      name: 'sn_multihash',
      desc: 'Generic blake2b-256 multihash operation.',
      input: [{ data: 'SnByteArray', decoded: 'SnAny' }],
      groups: [6],
      priority: 0,
      output: {
        desc: 'Returns the Multihash buffer as SnByteArray.',
        output: 'SnByteArray',
        decoded: 'SnBuffer',
      },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacebpraruqj3z7cbydbl4bfbvwvcedsnbitmvv65m65gadcn3bj3diq',
    data: {
      name: 'sn_file',
      desc:
        'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
      input: [{ data: 'SnString', decoded: 'SnNull' }],
      groups: [6, 1],
      priority: 0,
      output: {
        desc: 'Returns the File Buffer.',
        output: 'SnByteArray',
        decoded: 'SnFileBuffer',
      },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacebvd3b7upai2av3w33dwrwqkh7w7qvbon6obi6q4evw6pqe744npu',
    data: {
      name: 'sn_cid',
      desc: 'Generic CID, defaults to base32 and dag-cbor for Any kind of data.',
      input: [{ data: 'SnByteArray', decoded: 'SnBuffer' }],
      groups: [6],
      priority: 1,
      output: {
        desc: 'CID string converted into SnByteArray',
        output: 'SnByteArray',
        decoded: 'SnString',
      },
      hashingOp: '',
      encOp: '',
      ops: [
        {
          id: 'bafy2bzacea24txwqzwanzte5laqhsy3umk4wq43h3llvlvkebp7gv73kzuzsi',
          data: {
            name: 'sn_multihash',
            desc: 'Generic blake2b-256 multihash operation.',
            input: [{ data: 'SnByteArray', decoded: 'SnAny' }],
            groups: [6],
            priority: 0,
            output: {
              desc: 'Returns the Multihash buffer as SnByteArray.',
              output: 'SnByteArray',
              decoded: 'SnBuffer',
            },
            hashingOp: 'sn_cid',
            encOp: 'sn_enc_hex',
            ops: [],
          },
        },
      ],
    },
  },
  {
    id: 'bafy2bzacedxduw7x2hkjtoqsp7vlzclkirt6kujsgiwktflgvzxhve4543sqq',
    data: {
      name: 'sn_image_metadata_hash',
      desc:
        'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use snCid',
      input: [{ data: 'SnByteArray', decoded: 'SnImageMetadata' }],
      output: {
        desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
        output: 'SnByteArray',
        decoded: 'SnGenericId',
      },
      groups: [6],
      priority: 2,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [
        {
          id: 'bafy2bzacedvpg7j3k5n5wsyubvcjpfmuyagf2z4uoskr2bq72a7erb7iwwqyi',
          data: {
            desc: 'Extract All Image Metadata',
            name: 'sn_image_metadata',
            input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
            output: {
              desc:
                'Returns the metadata as SnByteArray and decoded as SnImageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`',
              output: 'SnByteArray',
              decoded: 'SnImageMetadata',
            },
            groups: [6],
            priority: 1,
            hashingOp: 'sn_cid',
            encOp: 'sn_enc_hex',
            ops: [
              {
                id: 'bafy2bzacebpraruqj3z7cbydbl4bfbvwvcedsnbitmvv65m65gadcn3bj3diq',
                data: {
                  name: 'sn_file',
                  desc:
                    'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
                  input: [{ data: 'SnString', decoded: 'SnNull' }],
                  groups: [6, 1],
                  priority: 0,
                  output: {
                    desc: 'Returns the File Buffer.',
                    output: 'SnByteArray',
                    decoded: 'SnFileBuffer',
                  },
                  hashingOp: 'sn_cid',
                  encOp: 'sn_enc_hex',
                  ops: [],
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: 'bafy2bzacebe5rnliqvwswrx7vl2ziibe6prqginxf7lhotdlzw365qe3xkv2a',
    data: {
      desc: 'RAW PIXELS of the photo',
      name: 'sn_raw_pixels_hash',
      input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
      output: {
        desc: 'RAW PIXELS of the photo',
        output: 'SnByteArray',
        decoded: 'SnFileBuffer',
      },
      groups: [6],
      priority: 1,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [
        {
          id: 'bafy2bzacebpraruqj3z7cbydbl4bfbvwvcedsnbitmvv65m65gadcn3bj3diq',
          data: {
            name: 'sn_file',
            desc:
              'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'SnString', decoded: 'SnNull' }],
            groups: [6, 1],
            priority: 0,
            output: {
              desc: 'Returns the File Buffer.',
              output: 'SnByteArray',
              decoded: 'SnFileBuffer',
            },
            hashingOp: 'sn_cid',
            encOp: 'sn_enc_hex',
            ops: [],
          },
        },
      ],
    },
  },
  {
    id: 'bafy2bzacedvpg7j3k5n5wsyubvcjpfmuyagf2z4uoskr2bq72a7erb7iwwqyi',
    data: {
      desc: 'Extract All Image Metadata',
      name: 'sn_image_metadata',
      input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
      output: {
        desc:
          'Returns the metadata as SnByteArray and decoded as SnImageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`',
        output: 'SnByteArray',
        decoded: 'SnImageMetadata',
      },
      groups: [6],
      priority: 1,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [
        {
          id: 'bafy2bzacebpraruqj3z7cbydbl4bfbvwvcedsnbitmvv65m65gadcn3bj3diq',
          data: {
            name: 'sn_file',
            desc:
              'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'SnString', decoded: 'SnNull' }],
            groups: [6, 1],
            priority: 0,
            output: {
              desc: 'Returns the File Buffer.',
              output: 'SnByteArray',
              decoded: 'SnFileBuffer',
            },
            hashingOp: 'sn_cid',
            encOp: 'sn_enc_hex',
            ops: [],
          },
        },
      ],
    },
  },
  {
    id: 'bafy2bzacedztluv2fb44h5zeh5b24inkdlvpgulyevfp42uqlelj6fwnxri2a',
    data: {
      desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
      name: 'sn_image_phash',
      input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
      output: {
        desc: 'Return binary representation of phash 0011101011',
        output: 'SnByteArray',
        decoded: 'SnString',
      },
      groups: [6],
      priority: 1,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [
        {
          id: 'bafy2bzacebpraruqj3z7cbydbl4bfbvwvcedsnbitmvv65m65gadcn3bj3diq',
          data: {
            name: 'sn_file',
            desc:
              'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'SnString', decoded: 'SnNull' }],
            groups: [6, 1],
            priority: 0,
            output: {
              desc: 'Returns the File Buffer.',
              output: 'SnByteArray',
              decoded: 'SnFileBuffer',
            },
            hashingOp: 'sn_cid',
            encOp: 'sn_enc_hex',
            ops: [],
          },
        },
      ],
    },
  },
]

export default ops

import { SnOperation } from '@sensio/types'

const ops: SnOperation[] = [
  {
    id: 'bafy2bzaceanqw2xwjawh4zdrn6lct7pi63fndib5jhcx7hfe5y7g6iwwrwqka',
    data: {
      name: 'sn_enc_hex',
      desc: 'Encode arbitrary data to HEX with 0x prefix ',
      input: [{ data: 'SnByteArray', decoded: 'SnAny' }],
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
    id: 'bafy2bzacealjmcwnfurdmn2tndsv35d5cdbaempopwdq5pr5zr56yrfhuc2zk',
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
        output: 'SnByteArray',
        decoded: 'SnProofParams[]',
      },
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacebc64bhgsj24ad53pkgxb7xi3zdedshiozl33nqplv7t5y27tii2u',
    data: {
      name: 'sn_json_enc',
      desc: 'Wrapper of JSON.stringify().',
      input: [{ data: 'SnAny', decoded: 'SnAny' }],
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
    id: 'bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m',
    data: {
      name: 'sn_file',
      desc:
        'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
      input: [{ data: 'StringOrBuffer', decoded: 'StringOrBuffer' }],
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
    id: 'bafy2bzacecnosczzvuuibkajhvporgd4e5rrye4wcorvm7zmloinm6ofngdeq',
    data: {
      desc: 'Create QR Code',
      name: 'sn_create_qrcode',
      input: [{ data: 'SnByteArray', decoded: 'SnAny' }],
      output: { desc: 'Return QRCode image', output: 'SnByteArray', decoded: 'SnString' },
      groups: [6],
      priority: 0,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacebr4fj6rnexne25v6zcuomsfnbfxrv22cwzrrqexeo3ggotd3u3zu',
    data: {
      desc: 'Create the Ownership Claims from the existing PoE from the Sensio Network.',
      name: 'sn_create_ownership_claims',
      input: [{ data: 'SnByteArray', decoded: 'SnGenericIds' }],
      output: {
        desc: 'Return the list of the Ownership Claims',
        output: 'SnByteArray',
        decoded: 'SnOwnershipClaims',
      },
      groups: [6],
      priority: 0,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacecmqyut2oozadzigqsggrhkqxd2fxovubcy4djibfyci6iq6t4s4u',
    data: {
      desc:
        'Save the given statements to the Sensio Network. This operation waits until the records are in finalized state. Accepts the list of claims with the list of signatures for each claim. Mapping is done with the index of the list so `param1[0]` and `param2[0]`. If there are mismatches in the either of the params this operation will fail. Meaning that `param1.length === param2.length`',
      name: 'sn_save_statements',
      input: [
        { data: 'SnByteArray', decoded: 'SnSensioClaim[]' },
        { data: 'SnByteArray', decoded: 'SnSensioSignatures[]' },
      ],
      output: {
        desc: 'Return the List of signed statement IDs',
        output: 'SnByteArray',
        decoded: 'SaveStatementReturn[]',
      },
      groups: [6],
      priority: 0,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacebtqlbme62wogt4a7447lxsebvu5fncnht3eedmyvjle7t32ue46c',
    data: {
      desc: 'Sign the claims and return the tuple of claims and their signatures',
      name: 'sn_user_sign_claims',
      input: [
        { data: 'SnByteArray', decoded: 'SnSensioClaim[]' },
        { data: 'SnByteArray', decoded: 'SnSigner' },
      ],
      output: {
        desc: 'Return the tuple of claims and their signatures',
        output: 'SnByteArray',
        decoded: '[SnSensioClaim[],SnSensioSignatures[]]',
      },
      groups: [5],
      priority: 0,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [],
    },
  },
  {
    id: 'bafy2bzacedtcdvuykc4jencdnm5zymadzutm7yzvpughbgjotxmgpyglzhqpc',
    data: {
      desc:
        'Take the photo of the QRCode and do the verification of equality. If the verification is a successes the coperation will continue, if not user will be asked to resubmit the image. The photo taken MUST NOT BE MODIFIED, RESIZED AND MUST BE IN JPG OR JPEG. Medium or low size is better than large 10MB files. You can choose that in the camera settings',
      name: 'sn_take_photo_and_upload_qrcode',
      input: [{ data: 'SnByteArray', decoded: 'SnString' }],
      output: {
        desc: 'Return the QRCode data if it passes the decoding and verification.',
        output: 'SnByteArray',
        decoded: 'SnString',
      },
      groups: [5],
      priority: 0,
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
    id: 'bafy2bzaceczzm4kzeqfqnk4onhpnipiskfqcxtssm7t54dmrzso5un6eaukya',
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
          id: 'bafy2bzacedk46pihe5gr44l6liofvga6umxyhy27hwp4treiq32y6cdywsxzm',
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
                id: 'bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m',
                data: {
                  name: 'sn_file',
                  desc:
                    'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
                  input: [{ data: 'StringOrBuffer', decoded: 'StringOrBuffer' }],
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
    id: 'bafy2bzacedk46pihe5gr44l6liofvga6umxyhy27hwp4treiq32y6cdywsxzm',
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
          id: 'bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m',
          data: {
            name: 'sn_file',
            desc:
              'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'StringOrBuffer', decoded: 'StringOrBuffer' }],
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
    id: 'bafy2bzaceafhfdbh4r6fmmnudwqehqedhf632dbafl7fnmbkbpjnv2miacdza',
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
          id: 'bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m',
          data: {
            name: 'sn_file',
            desc:
              'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'StringOrBuffer', decoded: 'StringOrBuffer' }],
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
    id: 'bafy2bzacecgmp4enyoywse6enuoqgfpffojhrn7kovryv775xa7mhv6f34qju',
    data: {
      desc: 'Calculate content id of the raw pixels',
      name: 'sn_image_raw_pixels_hash',
      input: [{ data: 'SnByteArray', decoded: 'SnImageData' }],
      output: {
        desc: 'Return content id of the raw pixels',
        output: 'SnByteArray',
        decoded: 'SnString',
      },
      groups: [6],
      priority: 2,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [
        {
          id: 'bafy2bzacecjrerw6cnuyj3ta7ntsvleq43vxgt4otgdvf2wjjpdg5almrzd4y',
          data: {
            desc: 'Extract Only Raw pixels from the image',
            name: 'sn_image_raw_pixels',
            input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
            output: {
              desc: 'Returns the raw pixel bytes without metadata',
              output: 'SnByteArray',
              decoded: 'SnImageData',
            },
            groups: [6],
            priority: 1,
            hashingOp: 'sn_cid',
            encOp: 'sn_enc_hex',
            ops: [
              {
                id: 'bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m',
                data: {
                  name: 'sn_file',
                  desc:
                    'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
                  input: [{ data: 'StringOrBuffer', decoded: 'StringOrBuffer' }],
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
    id: 'bafy2bzacecjrerw6cnuyj3ta7ntsvleq43vxgt4otgdvf2wjjpdg5almrzd4y',
    data: {
      desc: 'Extract Only Raw pixels from the image',
      name: 'sn_image_raw_pixels',
      input: [{ data: 'SnByteArray', decoded: 'SnFileBuffer' }],
      output: {
        desc: 'Returns the raw pixel bytes without metadata',
        output: 'SnByteArray',
        decoded: 'SnImageData',
      },
      groups: [6],
      priority: 1,
      hashingOp: 'sn_cid',
      encOp: 'sn_enc_hex',
      ops: [
        {
          id: 'bafy2bzaced67meyosnnt6dmvsp4sjro5mo5ufu3ntoqamouttsa4tlqo6ta2m',
          data: {
            name: 'sn_file',
            desc:
              'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'StringOrBuffer', decoded: 'StringOrBuffer' }],
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
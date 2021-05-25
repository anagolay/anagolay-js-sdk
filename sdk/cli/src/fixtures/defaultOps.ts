import { AnForWhat, AnOperationDataForCreating } from '@anagolay/types'

const ops: AnOperationDataForCreating[] = [
  {
    name: 'enc_hex',
    desc: 'Encode arbitrary data to HEX with 0x prefix ',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAny',
      },
    ],
    groups: [AnForWhat.SYS],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns prefixed hex encoded string. Example 0x11211221',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    hashingOp: '',
    encOp: '',
    opNames: [],
  },
  {
    name: 'split',
    desc: 'Takes in the operation name and its outputs, then splits in to N copies of the same operation with output values.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnSplitParams',
      },
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the object with *k* and *v* keys, where *k* is op name and *v* the output value.',
      output: 'AnByteArray',
      decoded: 'AnProofParams[]',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'cid',
    desc: 'Generic CID, defaults to base32 and dag-cbor for Any kind of data.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnByteArray',
      },
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: 'CID string converted into AnByteArray',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    hashingOp: '',
    encOp: '',
    opNames: ['multihash'],
  },
  {
    name: 'json_enc',
    desc: 'Wrapper of JSON.stringify().',
    input: [
      {
        data: 'AnAny',
        decoded: 'AnAny',
      },
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns AnByteArray of json string.',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'json_dec',
    desc: 'Wrapper of JSON.parse()',
    input: [
      {
        data: 'AnAny',
        decoded: 'AnAny',
      },
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: '',
      output: 'AnByteArray',
      decoded: 'AnAny',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'identity',
    desc: 'What comes in that comes out, identity function, must be a parent of the USER operation. Only one child is accepted.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAny',
      },
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: '',
      output: 'AnByteArray',
      decoded: 'AnAny',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'match_all',
    desc: 'This operation must have children ops. **ALL** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [6, 7],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns true, if all match or throws an error if some match.',
      output: 'AnBoolean',
      decoded: 'AnBoolean',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'match_none',
    desc: 'This operation must have children ops. **NONE** the outputs of children ops must be the same in order to proceed.',
    input: [],
    groups: [6, 7],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns true, if none match or throws an error if some match.',
      output: 'AnBoolean',
      decoded: 'AnBoolean',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'multihash',
    desc: 'Generic blake2b-256 multihash operation.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnByteArray',
      },
    ],
    groups: [6],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the Multihash buffer as AnByteArray.',
      output: 'AnByteArray',
      decoded: 'AnByteArray',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'file',
    desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [
      {
        data: 'StringOrBuffer',
        decoded: 'StringOrBuffer',
      },
    ],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'AnByteArray',
      decoded: 'AnFileBuffer',
    },
    hashingOp: 'cid',
    encOp: 'enc_hex',
    opNames: [],
  },
  {
    name: 'image_metadata_hash',
    desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnImageMetadata',
      },
    ],
    output: {
      desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'AnByteArray',
      decoded: 'AnGenericId',
    },
    groups: [AnForWhat.SYS],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: ['image_metadata'],
  },

  {
    desc: 'Extract All Image Metadata',
    name: 'image_metadata',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnFileBuffer',
      },
    ],
    output: {
      desc: 'Returns the metadata as AnByteArray and decoded as AnImageMetadata. Accessible as `[exif|iptc|xmp|icc].TAG_NAME`',
      output: 'AnByteArray',
      decoded: 'AnImageMetadata',
    },
    groups: [AnForWhat.SYS],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: ['file'],
  },
  {
    desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'image_phash',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnFileBuffer',
      },
    ],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [AnForWhat.SYS],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: ['file'],
  },
  {
    desc: 'Calculate content id of the raw pixels',
    name: 'image_raw_pixels_hash',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnImageData',
      },
    ],
    output: {
      desc: 'Return content id of the raw pixels',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [AnForWhat.SYS],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: ['image_raw_pixels'],
  },
  {
    desc: 'Extract Only Raw pixels from the image',
    name: 'image_raw_pixels',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnFileBuffer',
      },
    ],
    output: {
      desc: 'Returns the raw pixel bytes without metadata',
      output: 'AnByteArray',
      decoded: 'AnImageData',
    },
    groups: [AnForWhat.SYS],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: ['file'],
  },
  {
    desc: 'Create QR Code',
    name: 'create_qrcode',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAny',
      },
    ],
    output: {
      desc: 'Return QRCode image',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [AnForWhat.SYS],
    priority: 0,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: [],
  },
  {
    desc: 'Create the Ownership Claims from the existing PoE from the Anagolay Network.',
    name: 'create_ownership_claims',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnGenericIds',
      },
    ],
    output: {
      desc: 'Return the list of the Ownership Claims',
      output: 'AnByteArray',
      decoded: 'AnOwnershipClaims',
    },
    groups: [AnForWhat.SYS],
    priority: 0,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: [],
  },
  {
    desc: 'Save the given statements to the Anagolay Network. This operation waits until the records are in finalized state. Accepts the list of claims with the list of signatures for each claim. Mapping is done with the index of the list so `param1[0]` and `param2[0]`. If there are mismatches in the either of the params this operation will fail. Meaning that `param1.length === param2.length`',
    name: 'save_statements',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAnagolayClaim[]',
      },
      {
        data: 'AnByteArray',
        decoded: 'AnAnagolaySignatures[]',
      },
    ],
    output: {
      desc: 'Return the List of signed statement IDs',
      output: 'AnByteArray',
      decoded: 'SaveStatementReturn[]',
    },
    groups: [AnForWhat.SYS],
    priority: 0,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: [],
  },
  {
    desc: 'Sign the claims and return the tuple of claims and their signatures',
    name: 'user_sign_claims',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnAnagolayClaim[]',
      },
      {
        data: 'AnByteArray',
        decoded: 'AnSigner',
      },
    ],
    output: {
      desc: 'Return the tuple of claims and their signatures',
      output: 'AnByteArray',
      decoded: '[AnAnagolayClaim[],AnAnagolaySignatures[]]',
    },
    groups: [AnForWhat.USER],
    priority: 0,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: [],
  },
  {
    desc: 'Take the photo of the QRCode and do the verification of equality. If the verification is a successes the coperation will continue, if not user will be asked to resubmit the image. The photo taken MUST NOT BE MODIFIED, RESIZED AND MUST BE IN JPG OR JPEG. Medium or low size is better than large 10MB files. You can choose that in the camera settings',
    name: 'take_photo_and_upload_qrcode',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnString',
      },
    ],
    output: {
      desc: 'Return the QRCode data if it passes the decoding and verification.',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [AnForWhat.USER],
    priority: 0,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: [],
  },
]

export default ops

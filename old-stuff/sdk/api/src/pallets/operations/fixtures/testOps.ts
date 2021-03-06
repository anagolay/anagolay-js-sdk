import { AnOperationDataForCreating } from '@anagolay/types';

// create all classes
export const multipleOnSameLevelOps: AnOperationDataForCreating[] = [
  {
    desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'image_phash',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [],
    opNames: ['file'],
  },
  {
    name: 'file',
    desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'AnByteArray',
      decoded: 'AnFileBuffer',
    },
    hashingOp: '',
    encOp: '',
    opNames: [],
  },
  {
    name: 'file_copy',
    desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'AnByteArray',
      decoded: 'AnFileBuffer',
    },
    hashingOp: '',
    encOp: '',
    opNames: [],
  },
  {
    name: 'image_metadata_hash',
    desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid',
    input: [{ data: 'AnByteArray', decoded: 'AnImageMetadata' }],
    output: {
      desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'AnByteArray',
      decoded: 'AnGenericId',
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
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
      desc: 'Returns the metadata as AnByteArray. Accessible as `output.TAG_NAME`',
      output: 'AnByteArray',
      decoded: 'AnImageMetadata',
    },
    groups: [6],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: ['file', 'file_copy'],
  },
];
// create all classes
export const ops: AnOperationDataForCreating[] = [
  {
    desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'image_phash',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [],
    opNames: ['file'],
  },
  {
    name: 'file',
    desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'AnByteArray',
      decoded: 'AnFileBuffer',
    },
    hashingOp: '',
    encOp: '',
    opNames: [],
  },
  {
    name: 'image_metadata_hash',
    desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid',
    input: [{ data: 'AnByteArray', decoded: 'AnImageMetadata' }],
    output: {
      desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'AnByteArray',
      decoded: 'AnGenericId',
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
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
      desc: 'Returns the metadata as AnByteArray. Accessible as `output.TAG_NAME`',
      output: 'AnByteArray',
      decoded: 'AnImageMetadata',
    },
    groups: [6],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [],
    opNames: ['file'],
  },
];

export const resolvedOpDeps: AnOperationDataForCreating[] = [
  {
    name: 'file',
    desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    groups: [6, 1],
    ops: [],
    priority: 0,
    output: {
      desc: 'Returns the File Buffer.',
      output: 'AnByteArray',
      decoded: 'AnFileBuffer',
    },
    hashingOp: '',
    encOp: '',
    opNames: [],
  },
  {
    desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
    name: 'image_phash',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    output: {
      desc: 'Return binary representation of phash 0011101011',
      output: 'AnByteArray',
      decoded: 'AnString',
    },
    groups: [6],
    priority: 1,
    hashingOp: '',
    encOp: '',
    ops: [
      {
        name: 'file',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: [],
      },
    ],
    opNames: ['file'],
  },
  {
    name: 'image_metadata_hash',
    desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels. The hashing is done via multihash using the hashing key to create a hash. Figure out how to do it with the ops that are not children, like use cid',
    input: [{ data: 'AnByteArray', decoded: 'AnImageMetadata' }],
    output: {
      desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      output: 'AnByteArray',
      decoded: 'AnGenericId',
    },
    groups: [6],
    priority: 2,
    hashingOp: '',
    encOp: '',
    ops: [
      {
        desc: 'Extract All Image Metadata',
        name: 'image_metadata',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        output: {
          desc: 'Returns the metadata as AnByteArray. Accessible as `output.TAG_NAME`',
          output: 'AnByteArray',
          decoded: 'AnImageMetadata',
        },
        groups: [6],
        priority: 1,
        hashingOp: 'cid',
        encOp: 'enc_hex',
        ops: [
          {
            name: 'file',
            desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
            input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
            groups: [6, 1],
            ops: [],
            priority: 0,
            output: {
              desc: 'Returns the File Buffer.',
              output: 'AnByteArray',
              decoded: 'AnFileBuffer',
            },
            hashingOp: '',
            encOp: '',
            opNames: [],
          },
        ],
        opNames: ['file'],
      },
    ],
    opNames: ['image_metadata'],
  },
  {
    desc: 'Extract All Image Metadata',
    name: 'image_metadata',
    input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
    output: {
      desc: 'Returns the metadata as AnByteArray. Accessible as `output.TAG_NAME`',
      output: 'AnByteArray',
      decoded: 'AnImageMetadata',
    },
    groups: [6],
    priority: 1,
    hashingOp: 'cid',
    encOp: 'enc_hex',
    ops: [
      {
        name: 'file',
        desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
        input: [{ data: 'AnByteArray', decoded: 'AnFileBuffer' }],
        groups: [6, 1],
        ops: [],
        priority: 0,
        output: {
          desc: 'Returns the File Buffer.',
          output: 'AnByteArray',
          decoded: 'AnFileBuffer',
        },
        hashingOp: '',
        encOp: '',
        opNames: [],
      },
    ],
    opNames: ['file'],
  },
];

export const specialFcCases: AnOperationDataForCreating[] = [
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
];

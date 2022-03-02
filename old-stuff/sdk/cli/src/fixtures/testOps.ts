import { AnForWhat, AnOperationDataForCreating } from '@anagolay/types';

export const ops: AnOperationDataForCreating[] = [
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
    name: 'file',
    desc: 'Reads the file from given path (data) and returns the buffer. RAW file buffer for other ops to use.',
    input: [
      {
        data: 'AnByteArray',
        decoded: 'AnString',
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
];

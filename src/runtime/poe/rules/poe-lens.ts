import { defaultCreator } from '../../../constants';

export const rule = {
  version: 1,
  description: 'Operations for Lens verification',
  creator: defaultCreator,
  forWhat: 3,
  ops: [
    {
      desc: 'Extract LensSerialNumber from Metadata',
      op: 'lens_serial_number', // this is the name of the param
      hashAlgo: 'blake2b',
      hashBits: 256,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc: 'Extract LensInfo from Metadata',
      op: 'lens_info',
      hashAlgo: 'blake2b',
      hashBits: 256,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc: 'Extract LensModel from Metadata',
      op: 'lens_model',
      hashAlgo: 'blake2b',
      hashBits: 256,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
  ],
  buildParams: {
    desc: 'Build the payload in a way we need for this rule. Take all the values from each of the `ops',
    op: 'create_payload',
    hashAlgo: '',
    hashBits: 0,
    encodeAlgo: 'hex',
    prefix: '0x',
    ops: [],
  },
  createProof: {
    desc: 'The operation for creation of the proof for this rule',
    op: 'create_proof',
    hashAlgo: 'blake2b',
    hashBits: 256,
    encodeAlgo: 'hex',
    prefix: '0x',
    ops: [],
  },
};

export default rule;

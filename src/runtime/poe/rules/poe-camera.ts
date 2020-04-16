import { defaultCreator } from '../../../constants';
export const rule = {
  version: 1,
  description: 'Operations for Camera verification',
  creator: defaultCreator,
  forWhat: 2,
  ops: [
    {
      desc: 'Extract SerialNumber from Metadata',
      op: 'serial_number', // this is the name of the param
      hashAlgo: 'blake2b',
      hashBits: 256,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc: 'Extract Make from Metadata',
      op: 'make',
      hashAlgo: 'blake2b',
      hashBits: 256,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc: 'Extract Model from Metadata',
      op: 'model',
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

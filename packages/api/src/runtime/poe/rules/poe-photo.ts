import { defaultCreator } from '../../../constants';

export const rule = {
  version: 1,
  description: 'Rule for creating hashes and PoE for any Photo',
  creator: defaultCreator,
  forWhat: 1,
  ops: [
    {
      desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      op: 'metadata_hash',
      hashAlgo: 'blake2b',
      hashBits: 256,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc: 'Metadata must be removed and has must be created off of the RAW PIXELS',
      op: 'raw_pixels_hash',
      hashAlgo: 'blake2b',
      hashBits: 256,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
      op: 'perceptual_hash',
      hashAlgo: '',
      hashBits: 0,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc:
        'Document ID. The common identifier for all versions and renditions of a resource. Found under xmp.did:GUID and parsed only the GUID part without the namespace xmp.did:',
      op: 'document_id',
      hashAlgo: '',
      hashBits: 0,
      encodeAlgo: 'hex',
      prefix: '0x',
      ops: [],
    },
    {
      desc:
        'Original Document ID. The common identifier for the original resource from which the current resource is derived. For example, if you save a resource to a different format, then save that one to another format, each save operation should generate a new xmpMM:DocumentID that uniquely identifies the resource in that format, but should retain the ID of the source file here.',
      op: 'original_document_id',
      hashAlgo: '',
      hashBits: 0,
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

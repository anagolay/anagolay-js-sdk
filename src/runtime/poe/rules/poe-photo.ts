import { Rule, ForWhat } from '../../../interfaces/poe/definitions';

export const rule: Rule = {
  version: 1,
  description: 'Rules for creating hashes and PoE for any Photo',
  createdAt: 'human readable time, always UTC',
  forWhat: ForWhat.Photo,
  ops: [
    {
      desc: 'Hash of full unchanged metadata buffer (or similar). Without raw pixels',
      op: 'metadata_hash', // this is the name of the param
      hashAlgo: 'blake2b-256',
      encodeAlgo: 'hex',
      prefix: '0x',
    },
    {
      desc: 'Metadata must be removed and has must be created off of the RAW PIXELS',
      op: 'raw_pixels_hash',
      hashAlgo: 'blake2-256',
      encodeAlgo: 'hex',
    },
    {
      desc: 'Perceptual hash calculation, currently implementing http://blockhash.io/',
      op: 'perceptual_hash',
      hashAlgo: null,
      encodeAlgo: 'hex',
      prefix: '0x',
    },
    {
      desc:
        'Document ID. The common identifier for all versions and renditions of a resource. Found under xmp.did:GUID and parsed only the GUID part without the namespace xmp.did:',
      op: 'documentId',
      encodeAlgo: 'hex',
      prefix: '0x',
    },
    {
      desc:
        'Original Document ID. The common identifier for the original resource from which the current resource is derived. For example, if you save a resource to a different format, then save that one to another format, each save operation should generate a new xmpMM:DocumentID that uniquely identifies the resource in that format, but should retain the ID of the source file here.',
      op: 'original_document_id',
      encodeAlgo: 'hex',
      prefix: '0x',
    },
  ],
  buildParams: {
    desc: 'Build the payload in a way we need for this rule. Take all the values from each of the `ops',
    op: 'create_payload',
    encodeAlgo: 'hex',
    prefix: '0x',
  },
};

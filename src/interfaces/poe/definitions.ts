/// Generic Rule Interface / Struct
export interface Rule {
  version: number;
  description: string;
  createdAt: string;
  forWhat: ForWhat;
  ops: Operation[];
  buildParams: FormatPayload;
  parent?: string | null; // link to the parent rule. atm only direct parents are allowed, which means only modified rules of the same type can be added as a parent.
}

/// Single generic operation
export interface Operation {
  op: string; // @IDEA maybe we could have other rules and their versions called from the op???
  desc?: string;
  hashAlgo?: string;
  encodeAlgo?: string;
  prefix?: string;
  ops?: Operation[]; // you can  use the ops to build more complex operations
}

/// Special operation
export interface FormatPayload extends Operation {
  op: 'create_payload';
  encodeAlgo: 'hex';
  prefix: '0x';
}

/// List of equipment that needs rules generated
export enum ForWhat {
  /// Generic rule, content hashing using CID and multi-formats
  Generic = 0,
  /// Any photo
  Photo = 1,
  /// Any camera, not a smartphone
  Camera = 2,
  /// Any Lens
  Lens = 3,
  /// Any Smartphone
  SmartPhone = 4,
}

/// Generic PoePayload that must be encoded and sent
export interface PoePayload {
  body: { [k: string]: string | number };
  forWhat: ForWhat; // The ForWhat type, the equipment or any Item that has rules created
  ruleId: string; // rule id that is used for this proof.
  prev: string | null; // this is the idea to revoke the poe when new PoE is proved
}

/// Payload that is passed into the createPoe method
export interface PoePhotoPayload extends PoePayload {
  // Body will be different for every ForWhat type, be that Camera, Lens, ...
  body: {
    metadataHash: string; // hex encoded blake2b-256 hash prefixed with 0x or multihash
    rawPixelsHash: string; // hex encoded blake2b-256 prefixed with 0x hash or multihash
    perceptualHash: string; // hex encoded binary 01110111
    documentId: string; // hex encoded xmpMM:DocumentID field
    originalDocumentId: string; // hex encoded xmpMM:OriginalDocumentID field
  };
  forWhat: ForWhat.Photo;
}

/* eslint-disable @typescript-eslint/camelcase */
export const PoECustomTypes = {
  Operation: {
    op: 'Vec<u8>',
    desc: 'Vec<u8>',
    hashAlgo: 'Vec<u8>',
    encodeAlgo: 'Vec<u8>',
    prefix: 'Vec<u8>',
    ops: 'Vec<Operation>',
  },
  Rule: {
    description: 'Vec<u8>',
    createdAt: 'Vec<u8>',
    creator: 'Vec<u8>',
    version: 'u32',
    forWhat: 'Vec<u8>',
    parent: 'Vec<u8>',
    buildParams: 'Operation',
    ops: 'Vec<Operation>',
  },
};

export default {
  rps: {},
  types: {
    ...PoECustomTypes,
  },
};

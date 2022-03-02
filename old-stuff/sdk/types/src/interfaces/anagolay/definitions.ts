export const AnagolayCustomTypes = {
  GenericId: 'Vec<u8>',
  CreatorId: 'Vec<u8>',
  Characters: 'Vec<u8>',
  DefaultsHashing: {
    algo: 'Vec<u8>',
    bits: 'u32',
  },
  DefaultsEncoding: {
    algo: 'Vec<u8>',
    prefix: 'bool',
  },
  DefaultsCid: {
    version: 'u8',
    base: 'Vec<u8>',
    codec: 'Vec<u8>',
  },
  DefaultValues: {
    hashing: 'DefaultsHashing',
    encoding: 'DefaultsEncoding',
    cid: 'DefaultsCid',
  },
  ForWhat: {
    _enum: ['GENERIC', 'PHOTO', 'CAMERA', 'LENS', 'SMARTPHONE', 'USER', 'SYS', 'FLOWCONTROL'],
  },
};

export default {
  types: {
    ...AnagolayCustomTypes,
  },
};

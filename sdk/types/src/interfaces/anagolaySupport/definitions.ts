import { Definitions, DefinitionsTypes } from '@polkadot/types/types';

export const AnagolayCustomTypes: DefinitionsTypes = {
  Characters: 'BoundedVec<u8, Get<u32>>',
  CreatorId: 'Characters',
  ArtifactId: 'BoundedVec<u8, Get<u32>>',
  TypeName: 'Characters',
  ForWhat: {
    _enum: ['GENERIC', 'PHOTO', 'CAMERA', 'LENS', 'SMARTPHONE', 'USER', 'SYS', 'FLOWCONTROL'],
  },
  WasmArtifactSubType: {
    _enum: ['Cjs', 'Esm', 'Wasm', 'Web'],
  },
  AnagolayVersionExtra: {
    createdAt: 'u64',
  },
};

export default {
  types: AnagolayCustomTypes,
} as Definitions;

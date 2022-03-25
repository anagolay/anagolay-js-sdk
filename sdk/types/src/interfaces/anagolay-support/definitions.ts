import { RegistryTypes } from '@polkadot/types/types';
export const AnagolayCustomTypes: RegistryTypes = {
  GenericId: 'Vec<u8>',
  CreatorId: 'Vec<u8>',
  Characters: 'Vec<u8>',
  AnagolayStructure: {
    id: 'GenericId',
    data: 'T',
    extra: 'Option<U>',
  },
  AnagolayArtifactStructure: {
    artifact_type: 'T',
    ipfs_cid: 'GenericId',
  },
  AnagolayVersionExtra: {
    created_at: 'u64',
  },
  AnagolayVersionData: {
    entity_id: 'GenericId',
    parent_id: 'Option<VersionId>',
    artifacts: 'Vec<AnagolayArtifactStructure<T>>',
  },
  WasmArtifactSubType: {
    _enum: ['CJS', 'ESM', 'WEB', 'WASM'],
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

import { RegistryTypes } from '@polkadot/types/types';
export const AnagolayCustomTypes: RegistryTypes = {
  GenericId: 'Vec<u8>',
  Characters: 'Vec<u8>',
  CreatorId: 'GenericId',
  ArtifactId: 'GenericId',
  OperationId: 'GenericId',
  WorkflowId: 'GenericId',
  VersionId: 'GenericId',
  ForWhat: {
    _enum: ['GENERIC', 'PHOTO', 'CAMERA', 'LENS', 'SMARTPHONE', 'USER', 'SYS', 'FLOWCONTROL'],
  },
  WasmArtifactSubType: {
    _enum: ['CJS', 'WASM', 'ESM', 'WEB'],
  },
  DocsArtifactSubType: {
    _enum: ['RUSTDOC'],
  },
  AnagolayVersionExtra: {
    createdAt: 'u64',
  },
};

export default {
  types: {
    ...AnagolayCustomTypes,
  },
};

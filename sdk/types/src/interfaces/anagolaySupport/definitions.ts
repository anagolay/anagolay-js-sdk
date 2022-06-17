import { RegistryTypes } from '@polkadot/types/types';
export const AnagolayCustomTypes: RegistryTypes = {
  GenericId: 'Vec<u8>',
  Characters: 'Vec<u8>',
  CreatorId: 'Characters',
  ArtifactId: 'GenericId',
  OperationId: 'GenericId',
  WorkflowId: 'GenericId',
  StatementId: 'GenericId',
  ProofId: 'GenericId',
  SignatureId: 'GenericId',
  VersionId: 'GenericId',
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
  types: {
    ...AnagolayCustomTypes,
  },
};

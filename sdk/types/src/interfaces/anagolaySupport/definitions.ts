import { Definitions, DefinitionsTypes } from '@polkadot/types/types';

export const AnagolayCustomTypes: DefinitionsTypes = {
  GenericId: 'BoundedVec<u8, Get<u32>>',
  Characters: 'BoundedVec<u8, Get<u32>>',
  CreatorId: 'Characters',
  ArtifactId: 'GenericId',
  OperationId: 'GenericId',
  WorkflowId: 'GenericId',
  StatementId: 'GenericId',
  ProofId: 'GenericId',
  SignatureId: 'GenericId',
  VersionId: 'GenericId',
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

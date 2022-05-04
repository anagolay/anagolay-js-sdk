import { RegistryTypes } from '@polkadot/types/types';
export const WorkflowsCustomTypes: RegistryTypes = {
  OperationVersionReference: {
    versionId: 'VersionId',
    config: 'BTreeMap<Characters, Characters>',
  },
  WorkflowSegment: {
    inputs: 'Vec<u8>',
    sequence: 'Vec<OperationVersionReference>',
  },
  WorkflowData: {
    name: 'Characters',
    creators: 'Vec<CreatorId>',
    description: 'Characters',
    groups: 'Vec<ForWhat>',
    segments: 'Vec<WorkflowSegment>',
    version: 'Characters',
  },
  WorkflowExtra: {},
  Workflow: {
    id: 'WorkflowId',
    data: 'WorkflowData',
    extra: 'Option<WorkflowExtra>',
  },
  WorkflowRecord: {
    record: 'Workflow',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
  WorkflowVersionRecord: {
    record: 'WorkflowVersion',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
  WorkflowArtifactType: {
    _enum: {
      Docs: null,
      Git: null,
      Wasm: 'WasmArtifactSubType',
    },
  },
  WorkflowArtifactStructure: {
    artifactType: 'WorkflowArtifactType',
    fileExtension: 'Characters',
    ipfsCid: 'GenericId',
  },
  WorkflowVersionData: {
    entityId: 'Option<WorkflowId>',
    parentId: 'Option<VersionId>',
    artifacts: 'Vec<WorkflowArtifactStructure>',
  },
  WorkflowVersion: {
    id: 'VersionId',
    data: 'WorkflowVersionData',
    extra: 'Option<AnagolayVersionExtra>',
  },
};

export default {
  types: {
    ...WorkflowsCustomTypes,
  },
};

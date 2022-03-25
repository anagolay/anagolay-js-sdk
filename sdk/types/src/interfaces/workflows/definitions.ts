import { RegistryTypes } from '@polkadot/types/types';
export const WorkflowsCustomTypes: RegistryTypes = {
  OperationVersionReference: {
    operation_version_id: 'VersionId',
    config: 'BTreeMap<Characters, Vec<Characters>>',
  },
  WorkflowSegment: {
    input: 'Vec<u8>',
    sequence: 'Vec<OperationVersionReference>',
  },
  WorkflowData: {
    name: 'Characters',
    creator: 'CreatorId',
    description: 'Characters',
    groups: 'Vec<ForWhat>',
    segments: 'Vec<WorkflowSegment>',
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
      CRATE: null,
      WASM: 'WasmArtifactSubType',
      DOCS: 'DocsArtifactSubType',
      GIT: null,
    },
  },
  WorkflowArtifactStructure: {
    artifactType: 'WorkflowArtifactType',
    ipfsCid: 'GenericId',
  },
  WorkflowVersionData: {
    entityId: 'WorkflowId',
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

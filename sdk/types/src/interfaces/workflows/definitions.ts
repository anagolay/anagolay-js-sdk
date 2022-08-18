import { Definitions, DefinitionsTypes } from '@polkadot/types/types';

export const WorkflowsCustomTypes: DefinitionsTypes = {
  OperationVersionReference: {
    versionId: 'VersionId',
    config: 'BoundedBTreeMap<Characters, Characters, Get<u32>>',
  },
  WorkflowSegment: {
    inputs: 'BoundedVec<i8, Get<u32>>',
    sequence: 'BoundedVec<OperationVersionReference, Get<u32>>',
  },
  WorkflowData: {
    name: 'Characters',
    creators: 'BoundedVec<CreatorId, Get<u32>>',
    description: 'Characters',
    groups: 'BoundedVec<ForWhat, Get<u32>>',
    segments: 'BoundedVec<WorkflowSegment, Get<u32>>',
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
    artifacts: 'BoundedVec<WorkflowArtifactStructure, Get<u32>>',
  },
  WorkflowVersion: {
    id: 'VersionId',
    data: 'WorkflowVersionData',
    extra: 'Option<AnagolayVersionExtra>',
  },
};

export default {
  types: WorkflowsCustomTypes,
} as Definitions;

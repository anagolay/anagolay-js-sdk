import {
  DefinitionRpc,
  DefinitionRpcSub,
  Definitions,
  DefinitionsCall,
  DefinitionsTypes
} from '@polkadot/types/types';

export const WorkflowsCustomTypes: DefinitionsTypes = {
  OperationVersionReference: {
    versionId: 'OperationVersionId',
    config: 'BoundedBTreeMap<Characters, Characters, Get<u32>>'
  },
  WorkflowSegment: {
    inputs: 'BoundedVec<i8, Get<u32>>',
    sequence: 'BoundedVec<OperationVersionReference, Get<u32>>'
  },
  WorkflowId: {},
  WorkflowData: {
    name: 'Characters',
    creators: 'BoundedVec<CreatorId, Get<u32>>',
    description: 'Characters',
    groups: 'BoundedVec<ForWhat, Get<u32>>',
    segments: 'BoundedVec<WorkflowSegment, Get<u32>>'
  },
  WorkflowExtra: {},
  Workflow: {
    id: 'WorkflowId',
    data: 'WorkflowData',
    extra: 'Option<WorkflowExtra>'
  },
  WorkflowRecord: {
    record: 'Workflow',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  },
  WorkflowVersionId: {},
  WorkflowVersionRecord: {
    record: 'WorkflowVersion',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  },
  WorkflowArtifactType: {
    _enum: {
      Docs: null,
      Git: null,
      Wasm: 'WasmArtifactSubType'
    }
  },
  WorkflowArtifactStructure: {
    artifactType: 'WorkflowArtifactType',
    fileExtension: 'Characters',
    ipfsCid: 'ArtifactId'
  },
  WorkflowVersionData: {
    entityId: 'Option<WorkflowId>',
    parentId: 'Option<WorkflowVersionId>',
    artifacts: 'BoundedVec<WorkflowArtifactStructure, Get<u32>>'
  },
  WorkflowVersion: {
    id: 'WorkflowVersionId',
    data: 'WorkflowVersionData',
    extra: 'Option<AnagolayVersionExtra>'
  }
};

const rpc: Record<string, DefinitionRpc | DefinitionRpcSub> = {
  getWorkflowsByIds: {
    description:
      'Get a subset of Workflows representing a page, given the full set of the ids to paginate and the pagination information',
    params: [
      {
        name: 'workflow_ids',
        type: 'Vec<WorkflowId>'
      },
      {
        name: 'offset',
        type: 'u64'
      },
      {
        name: 'limit',
        type: 'u16'
      },
      {
        name: 'at',
        type: 'Hash',
        isOptional: true
      }
    ],
    type: 'Vec<Workflow>'
  },
  getWorkflowVersionsByIds: {
    description:
      'Get a subset of WorkflowVersions representing a page, given the full set of the ids to paginate and the pagination information',
    params: [
      {
        name: 'workflow_version_ids',
        type: 'Vec<WorkflowVersionId>'
      },
      {
        name: 'offset',
        type: 'u64'
      },
      {
        name: 'limit',
        type: 'u16'
      },
      {
        name: 'at',
        type: 'Hash',
        isOptional: true
      }
    ],
    type: 'Vec<WorkflowVersion>'
  }
};

const runtime: DefinitionsCall = {
  WorkflowsApi: [
    {
      methods: rpc,
      version: 1
    }
  ]
};
export default {
  types: WorkflowsCustomTypes,
  runtime,
  rpc
} as Definitions;

import {
  DefinitionRpc,
  DefinitionRpcSub,
  Definitions,
  DefinitionsCall,
  RegistryTypes
} from '@polkadot/types/types';

const OperationsCustomTypes: RegistryTypes = {
  OperationId: {},
  OperationVersionId: {},
  OperationData: {
    /// max 128(0.12kb) characters, slugify to use _
    name: 'Characters',
    /// max 512(0.5kb) or 1024(1kb) chars, can be markdown but not html
    description: 'Characters',
    /// What operation accepts in the implementation. these are the params of the function with the types
    inputs: 'BoundedVec<TypeName, Get<u32>>',
    /// A map where keys are names of configuration parameters and values are collections of strings representing allowed values
    config: 'BoundedBTreeMap<Characters, BoundedVec<Characters, Get<u32>>, Get<u32>>',
    /// A switch used to generate the Workflow segments
    groups: 'BoundedVec<ForWhat, Get<u32>>',
    /// Data type name defining the operation output
    output: 'TypeName',
    /// The fully qualified URL for the repository, this can be any public repo URL
    repository: 'Characters',
    /// Short name of the license, like "Apache-2.0"
    license: 'Characters',
    /// Indicator of the features of the binary. Typically the following
    /// - `config_<key>` with _key_ coming from the config map allows conditional compilation of the
    ///   feature `config_<key>_<value>` where _value_ is the configuration selected at the moment the
    ///   operation is instantiated
    /// - `std` declares support for nostd as default and possibility to work with std. If this
    ///   feature is missing, the operation is intended to be working **only** in std
    features: 'BoundedVec<Characters, Get<u32>>'
  },
  OperationExtra: {},
  Operation: {
    id: 'OperationId',
    data: 'OperationData',
    extra: 'Option<OperationExtra>'
  },
  OperationRecord: {
    record: 'Operation',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  },
  OperationArtifactType: {
    _enum: {
      Docs: null,
      Git: null,
      Wasm: 'WasmArtifactSubType'
    }
  },
  OperationVersion: {
    id: 'OperationVersionId',
    data: 'OperationVersionData',
    extra: 'Option<AnagolayVersionExtra>'
  },
  OperationArtifactStructure: {
    artifactType: 'OperationArtifactType',
    fileExtension: 'Characters',
    ipfsCid: 'ArtifactId'
  },
  OperationVersionData: {
    entityId: 'Option<OperationId>',
    parentId: 'Option<OperationVersionId>',
    artifacts: 'BoundedVec<OperationArtifactStructure, Get<u32>>'
  },
  OperationVersionRecord: {
    record: 'OperationVersion',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  }
};

const rpc: Record<string, DefinitionRpc | DefinitionRpcSub> = {
  getOperationsByIds: {
    description:
      'Get a subset of Operations representing a page, given the full set of the ids to paginate and the pagination information',
    params: [
      {
        name: 'operation_ids',
        type: 'Vec<OperationId>'
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
    type: 'Vec<Operation>'
  },
  getOperationVersionsByIds: {
    description:
      'Get a subset of OperationVersions representing a page, given the full set of the ids to paginate and the pagination information',
    params: [
      {
        name: 'operation_version_ids',
        type: 'Vec<OperationVersionId>'
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
    type: 'Vec<OperationVersion>'
  }
};

const runtime: DefinitionsCall = {
  OperationsApi: [
    {
      methods: rpc,
      version: 1
    }
  ]
};

export default {
  types: OperationsCustomTypes,
  runtime,
  rpc
} as Definitions;

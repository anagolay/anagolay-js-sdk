import { Definitions, DefinitionsTypes } from '@polkadot/types/types';

export const OperationsCustomTypes: DefinitionsTypes = {
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
    features: 'BoundedVec<Characters, Get<u32>>',
  },
  OperationExtra: {},
  OperationId: {},
  Operation: {
    id: 'OperationId',
    data: 'OperationData',
    extra: 'Option<OperationExtra>',
  },
  OperationRecord: {
    record: 'Operation',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
  OperationArtifactType: {
    _enum: {
      Docs: null,
      Git: null,
      Wasm: 'WasmArtifactSubType',
    },
  },
  OperationArtifactStructure: {
    artifactType: 'OperationArtifactType',
    fileExtension: 'Characters',
    ipfsCid: 'ArtifactId',
  },
  OperationVersionData: {
    entityId: 'Option<OperationId>',
    parentId: 'Option<OperationVersionId>',
    artifacts: 'BoundedVec<OperationArtifactStructure, Get<u32>>',
  },
  OperationVersionId: {},
  OperationVersion: {
    id: 'OperationVersionId',
    data: 'OperationVersionData',
    extra: 'Option<AnagolayVersionExtra>',
  },
  OperationVersionRecord: {
    record: 'OperationVersion',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
};

// For the Network
export default {
  types: OperationsCustomTypes,
} as Definitions;

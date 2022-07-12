import { RegistryTypes } from '@polkadot/types/types';

export const OperationsCustomTypes: RegistryTypes = {
  TypeName: 'Vec<u8>',
  OperationData: {
    /// max 128(0.12kb) characters, slugify to use _
    name: 'Characters',
    /// max 512(0.5kb) or 1024(1kb) chars, can be markdown but not html
    description: 'Characters',
    /// What operation accepts in the implementation. these are the params of the function with the types
    inputs: 'Vec<TypeName>',
    /// A map where keys are names of configuration parameters and values are collections of strings representing allowed values
    config: 'BTreeMap<Characters, Vec<Characters>>',
    /// A switch used to generate the Workflow segments
    groups: 'Vec<ForWhat>',
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
    features: 'Vec<Characters>',
  },
  OperationExtra: {},
  Operation: {
    id: 'GenericId',
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
    ipfsCid: 'GenericId',
  },
  OperationVersionData: {
    entityId: 'Option<OperationId>',
    parentId: 'Option<VersionId>',
    artifacts: 'Vec<OperationArtifactStructure>',
  },
  OperationVersion: {
    id: 'VersionId',
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
  types: {
    ...OperationsCustomTypes,
  },
};

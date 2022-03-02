import { RegistryTypes } from '@polkadot/types/types';

export const OperationsCustomTypes: RegistryTypes = {
  OperationId: 'GenericId',
  VersionId: 'GenericId',
  PackageId: 'GenericId',
  TypeName: 'Vec<u8>',
  OperationRecord: {
    record: 'Operation',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
  Operation: {
    id: 'GenericId',
    data: 'OperationData',
    extra: 'Option<OperationExtra>',
  },
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
    /// Indicator of the capability of the Operation to work in no-std environment
    nostd: 'bool',
  },
  OperationExtra: {},
  OperationVersionRecord: {
    record: 'OperationVersion',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber',
  },
  OperationVersion: {
    id: 'GenericId',
    data: 'OperationVersionData',
    extra: 'Option<OperationVersionExtra>',
  },
  PackageType: {
    _enum: ['CRATE', 'CJS', 'WASM', 'ESM', 'WEB'],
  },
  OperationVersionPackage: {
    packageType: 'PackageType',
    fileUrl: 'Characters',
    ipfsCid: 'GenericId',
  },
  OperationVersionData: {
    operationId: 'GenericId',
    parentId: 'Option<GenericId>',
    documentationId: 'GenericId',
    rehostedRepoId: 'GenericId',
    packages: 'Vec<OperationVersionPackage>',
  },
  OperationVersionExtra: {
    createdAt: 'u64',
  },
};

// For the Network
export default {
  types: {
    ...OperationsCustomTypes,
  },
};

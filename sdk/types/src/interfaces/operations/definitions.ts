export const OperationsCustomTypes = {
  CustomInputParam: {
    /// Input param name, slug with  _, max 32 chars, utf8
    name: 'Vec<u8>',
    /// Description, max 64 chars, utf8
    desc: 'Vec<u8>',
    /// Output type
    whatType: 'Vec<u8>',
    value: 'Vec<u8>'
  },
  OperationOutput: {
    opName: 'Vec<u8>',
    desc: 'Vec<u8>',
    output: 'Vec<u8>'
  },
  OperationInfo: {
    operation: 'Operation',
    accountId: 'AccountId',
    blockNumber: 'BlockNumber'
  },
  Operation: {
    id: 'GenericId',
    data: 'OperationData'
  },
  OperationData: {
    /// max 128(0.12kb) characters, slugify to use _
    name: 'Vec<u8>',
    /// max 512(0.5kb) or 1024(1kb) chars, can be markdown but not html
    desc: 'Vec<u8>',
    /// List of children outputs as an input to the parent method
    childrenOutputs: 'Vec<ChildOutput>',
    input: 'Vec<CustomInputParam>',
    // what operation returns. ATM is SnByteArray === Uint8Array or Vec<u8>
    output: 'OperationOutput',
    hashing: 'DefaultsHashing',
    encoding: 'DefaultsEncoding',
    groups: 'Vec<ForWhat>',
    /// this is the sum of all ops and the ops of the ops. tells how many operations this operation has. Based on this number we will decide which op is going to be executed first. This also tells which op has the longest chain or the deepest child op
    priority: 'u32',
    ops: 'Vec<Operation>'
  },
  ChildOutput: 'Vec<u8>'
}

// For the Network
export default {
  types: {
    ...OperationsCustomTypes
  }
}

export const OperationsCustomTypes = {
  CustomInputParam: {
    /// 'SnByteArray' | 'ProofParams[]' | 'SnBoolean'
    data: 'Vec<u8>',
    /// The real data type check the outputDecoded in sensio SDK, for more info check the https://gitlab.com/sensio_group/network-node/-/issues/27
    decoded: 'Vec<u8>'
  },
  OperationOutput: {
    desc: 'Vec<u8>',
    output: 'Vec<u8>',
    decoded: 'Vec<u8>'
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
    input: 'Vec<CustomInputParam>',
    // what operation returns. ATM is SnByteArray === Uint8Array or Vec<u8>
    output: 'OperationOutput',
    hashingOp: 'Vec<u8>',
    encOp: 'Vec<u8>',
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

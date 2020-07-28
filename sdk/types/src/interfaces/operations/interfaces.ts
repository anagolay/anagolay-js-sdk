/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import { SnReturnParams } from '../../sensio-type-mappings'
import {
  SnAccountId,
  SnBlockNumber,
  SnDefaultHashing,
  SnDefaultsEncoding,
  SnForWhat,
  SnGenericId
} from '../sensio/interfaces'

export interface SnCustomInputParam {
  /// Input param name, slug with  _, max 32 chars, utf8
  name: string
  /// Description, max 64 chars, utf8
  desc: string
  /// Output type
  whatType: string
  value: string
}

export interface SnOperationOutput {
  opName: string
  desc: string
  output: string
  decoded: string
}

export interface SnOperationInfo {
  operation: SnOperation
  accountId: SnAccountId
  blockNumber: SnBlockNumber
}

export interface SnOperation {
  id: SnGenericId
  data: SnOperationData
}

export interface SnOperationData {
  name: string
  desc: string
  childrenOutputs: SnReturnParams[]
  input: SnCustomInputParam[]
  output: SnOperationOutput
  hashing: SnDefaultHashing
  encoding: SnDefaultsEncoding
  groups: SnForWhat[]
  priority: number
  ops: SnOperation[]
}

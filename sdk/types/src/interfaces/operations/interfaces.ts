/**
 * MAINTAIN THIS FILE FOR THE TYPESCRIPT NATIVE TYPE CHECKING
 * THE POLKADOT API TYPES ARE IN THE definitions.ts file
 */

import {
  output,
  outputDecoded,
  SnInputParamsDefinition,
  SnString,
} from '../../sensio-type-mappings'
import { SnAccountId, SnBlockNumber, SnForWhat, SnGenericId } from '../sensio/interfaces'

export interface SnOperationOutput {
  desc: string
  output: output
  decoded: outputDecoded
}

export interface SnOperationInfo {
  operation: SnOperation
  accountId: SnAccountId
  blockNumber: SnBlockNumber
}

export interface SnOperationWithStorage {
  storageKey: string
  operationInfo: SnOperationInfo
}

export interface SnOperation {
  id: SnGenericId
  data: SnOperationData
}

export interface SnOperationData {
  name: string
  desc: string
  input: SnInputParamsDefinition[]
  output: SnOperationOutput
  hashingOp: SnString
  encOp: SnString
  groups: SnForWhat[]
  priority: number
  ops: SnOperation[]
}

export interface SnOperationDataForCreating {
  opNames: string[]
  name: string
  desc: string
  input: SnInputParamsDefinition[]
  output: SnOperationOutput
  hashingOp: SnString
  encOp: SnString
  groups: SnForWhat[]
  priority: number
  ops: SnOperationDataForCreating[]
}

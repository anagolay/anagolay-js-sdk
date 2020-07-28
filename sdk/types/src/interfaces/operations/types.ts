// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct, Vec } from '@polkadot/types/codec'
import { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime'
import { Bytes, u32 } from '@polkadot/types/primitive'
import {
  DefaultsEncoding,
  DefaultsHashing,
  ForWhat,
  GenericId
} from '../sensio'

/** @name ChildOutput */
export interface ChildOutput extends Bytes {}

/** @name CustomInputParam */
export interface CustomInputParam extends Struct {
  readonly name: Bytes
  readonly desc: Bytes
  readonly whatType: Bytes
  readonly value: Bytes
}

/** @name Operation */
export interface Operation extends Struct {
  readonly id: GenericId
  readonly data: OperationData
}

/** @name OperationData */
export interface OperationData extends Struct {
  readonly name: Bytes
  readonly desc: Bytes
  readonly childrenOutputs: Vec<ChildOutput>
  readonly input: Vec<CustomInputParam>
  readonly output: OperationOutput
  readonly hashing: DefaultsHashing
  readonly encoding: DefaultsEncoding
  readonly groups: Vec<ForWhat>
  readonly priority: u32
  readonly ops: Vec<Operation>
}

/** @name OperationInfo */
export interface OperationInfo extends Struct {
  readonly operation: Operation
  readonly accountId: AccountId
  readonly blockNumber: BlockNumber
}

/** @name OperationOutput */
export interface OperationOutput extends Struct {
  readonly opName: Bytes
  readonly desc: Bytes
  readonly output: Bytes
  readonly decoded: Bytes
}

export type PHANTOM_OPERATIONS = 'operations'

// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Struct, Vec, u32 } from '@polkadot/types';
import type { ForWhat, GenericId } from '@anagolay/types/interfaces/anagolay';
import type { AccountId, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name ChildOutput */
export interface ChildOutput extends Bytes {}

/** @name CustomInputParam */
export interface CustomInputParam extends Struct {
  readonly data: Bytes;
  readonly decoded: Bytes;
}

/** @name Operation */
export interface Operation extends Struct {
  readonly id: GenericId;
  readonly data: OperationData;
}

/** @name OperationData */
export interface OperationData extends Struct {
  readonly name: Bytes;
  readonly desc: Bytes;
  readonly input: Vec<CustomInputParam>;
  readonly output: OperationOutput;
  readonly hashingOp: Bytes;
  readonly encOp: Bytes;
  readonly groups: Vec<ForWhat>;
  readonly priority: u32;
  readonly ops: Vec<Operation>;
}

/** @name OperationInfo */
export interface OperationInfo extends Struct {
  readonly operation: Operation;
  readonly accountId: AccountId;
  readonly blockNumber: BlockNumber;
}

/** @name OperationOutput */
export interface OperationOutput extends Struct {
  readonly desc: Bytes;
  readonly output: Bytes;
  readonly decoded: Bytes;
}

export type PHANTOM_OPERATIONS = 'operations';

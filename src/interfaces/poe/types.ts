// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct, Vec } from '@polkadot/types/codec';
import { Bytes, u32 } from '@polkadot/types/primitive';

/** @name Operation */
export interface Operation extends Struct {
  readonly op: Bytes;
  readonly desc: Bytes;
  readonly hashAlgo: Bytes;
  readonly encodeAlgo: Bytes;
  readonly prefix: Bytes;
  readonly ops: Vec<Operation>;
}

/** @name Rule */
export interface Rule extends Struct {
  readonly description: Bytes;
  readonly createdAt: Bytes;
  readonly creator: Bytes;
  readonly version: u32;
  readonly forWhat: Bytes;
  readonly parent: Bytes;
  readonly buildParams: Operation;
  readonly ops: Vec<Operation>;
}

export type PHANTOM_POE = 'poe';

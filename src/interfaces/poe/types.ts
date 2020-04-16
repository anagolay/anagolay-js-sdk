// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Enum, Struct, Vec } from '@polkadot/types/codec';
import { Bytes, u32 } from '@polkadot/types/primitive';

/** @name DefaultValues */
export interface DefaultValues extends Struct {
  readonly hashAlgo: Bytes;
  readonly hashBits: u32;
  readonly encodingAlgo: Bytes;
  readonly encodingPrefix: Bytes;
}

/** @name ForWhat */
export interface ForWhat extends Enum {
  readonly isGeneric: boolean;
  readonly isPhoto: boolean;
  readonly isCamera: boolean;
  readonly isLens: boolean;
  readonly isSmartPhone: boolean;
}

/** @name Operation */
export interface Operation extends Struct {
  readonly op: Bytes;
  readonly desc: Bytes;
  readonly hashAlgo: Bytes;
  readonly hashBits: u32;
  readonly encodeAlgo: Bytes;
  readonly prefix: Bytes;
  readonly ops: Vec<Operation>;
}

/** @name Proof */
export interface Proof extends Struct {
  readonly ruleId: Bytes;
  readonly proof: Bytes;
  readonly creator: Bytes;
  readonly forWhat: ForWhat;
  readonly body: Bytes;
  readonly parent: Bytes;
}

/** @name Rule */
export interface Rule extends Struct {
  readonly version: u32;
  readonly description: Bytes;
  readonly creator: Bytes;
  readonly forWhat: ForWhat;
  readonly parent: Bytes;
  readonly ops: Vec<Operation>;
  readonly buildParams: Operation;
}

export type PHANTOM_POE = 'poe';

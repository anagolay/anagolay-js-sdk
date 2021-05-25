// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Struct, bool, u32, u8 } from '@polkadot/types';

/** @name CreatorId */
export interface CreatorId extends Bytes {}

/** @name DefaultsCid */
export interface DefaultsCid extends Struct {
  readonly version: u8;
  readonly base: Bytes;
  readonly codec: Bytes;
}

/** @name DefaultsEncoding */
export interface DefaultsEncoding extends Struct {
  readonly algo: Bytes;
  readonly prefix: bool;
}

/** @name DefaultsHashing */
export interface DefaultsHashing extends Struct {
  readonly algo: Bytes;
  readonly bits: u32;
}

/** @name DefaultValues */
export interface DefaultValues extends Struct {
  readonly hashing: DefaultsHashing;
  readonly encoding: DefaultsEncoding;
  readonly cid: DefaultsCid;
}

/** @name ForWhat */
export interface ForWhat extends Enum {
  readonly isGeneric: boolean;
  readonly isPhoto: boolean;
  readonly isCamera: boolean;
  readonly isLens: boolean;
  readonly isSmartphone: boolean;
  readonly isUser: boolean;
  readonly isSys: boolean;
  readonly isFlowcontrol: boolean;
}

/** @name GenericId */
export interface GenericId extends Bytes {}

export type PHANTOM_ANAGOLAY = 'anagolay';

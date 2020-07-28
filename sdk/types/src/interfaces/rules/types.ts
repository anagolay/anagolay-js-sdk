// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct, Vec } from '@polkadot/types/codec'
import { Bytes, u32 } from '@polkadot/types/primitive'
import { Operation } from '../operations'
import { CreatorId, ForWhat, GenericId } from '../sensio'

/** @name Rule */
export interface Rule extends Struct {
  readonly id: GenericId
  readonly data: RuleData
}

/** @name RuleData */
export interface RuleData extends Struct {
  readonly version: u32
  readonly name: Bytes
  readonly desc: Bytes
  readonly creator: CreatorId
  readonly groups: Vec<ForWhat>
  readonly parentId: GenericId
  readonly ops: Vec<Operation>
}

export type PHANTOM_RULES = 'rules'

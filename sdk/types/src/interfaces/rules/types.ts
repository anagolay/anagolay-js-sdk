// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Struct, Vec, u32 } from '@polkadot/types'
import type { CreatorId, ForWhat, GenericId } from '@sensio/types/interfaces/sensio'

/** @name OperationReference */
export interface OperationReference extends Struct {
  readonly id: GenericId
  readonly children: Vec<OperationReference>
}

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
  readonly ops: Vec<OperationReference>
}

export type PHANTOM_RULES = 'rules'
